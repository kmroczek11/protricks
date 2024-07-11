import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainee } from './entities/trainee.entity';
import { UsersService } from 'src/users/users.service';
import { CreateTraineeInput } from './dto/create-trainee.input';
import { User } from 'src/users/entities/user.entity';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/groups/entities/group.entity';
import { Role } from 'src/users/entities/role.enum';
import { DeleteTraineeInput } from './dto/delete-trainee.input';
import { MailService } from 'src/mail/mail.service';
import { Status } from './entities/status.enum';
import { JoinGroupInput } from './dto/join-group.input';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { AcceptToGroupInput } from './dto/accept-to-group.input';
import { LostTraineesService } from 'src/lost_trainees/lost_trainees.service';
import { DeleteTraineeWithMessageInput } from './dto/delete-trainee-with-message.input';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmContractReceiptInput } from './dto/confirm-contract-receipt.input';
import { ChangeGroupInput } from './dto/change-group.input';

@Injectable()
export class TraineesService {
  constructor(
    @InjectRepository(Trainee)
    private readonly traineesRepository: Repository<Trainee>,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly mailService: MailService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly lostTraineesService: LostTraineesService
  ) { }

  async createTrainee(createTraineeInput: CreateTraineeInput) {
    const group = await this.groupsService.findOne(createTraineeInput.groupId);

    const total = group.trainees.length;

    if (total + 1 > group.limit) {
      throw new HttpException('Limit reached', HttpStatus.BAD_REQUEST);
    }

    const newTrainee = await this.traineesRepository.create(createTraineeInput);

    await this.usersService.addRole(createTraineeInput.userId, Role.TRAINEE);

    await this.traineesRepository.save(newTrainee);

    const user = await this.usersService.findOneById(createTraineeInput.userId);

    // await this.mailService.sendFirstTimeMessage(user.email);

    return {
      user: user,
    };
  }

  findAll() {
    return this.traineesRepository.find();
  }

  findOne(id: string) {
    return this.traineesRepository.findOne({ where: { id } });
  }

  findOneByUserId(userId: string) {
    return this.traineesRepository.findOne({ where: { userId } });
  }

  getUser(userId: string): Promise<User> {
    return this.usersService.findOneById(userId);
  }

  getGroup(groupId: string): Promise<Group> {
    return this.groupsService.findOne(groupId);
  }

  getTrainee(userId: string) {
    return this.traineesRepository.findOne({ where: { userId } });
  }

  async deleteTrainee(deleteTraineeInput: DeleteTraineeInput) {
    const { userId } = deleteTraineeInput;

    await this.traineesRepository.delete({ userId });

    await this.usersService.deleteRole(userId, Role.TRAINEE);

    const user = await this.usersService.findOneById(userId);

    return {
      user,
    };
  }

  async deleteTraineeWithMessage(
    deleteTraineeWithMessageInput: DeleteTraineeWithMessageInput,
  ) {
    const { userId, email } = deleteTraineeWithMessageInput;

    await this.traineesRepository.delete({ userId });

    await this.usersService.deleteRole(userId, Role.TRAINEE);

    const user = await this.usersService.findOneById(userId);

    // await this.mailService.sendLeaveMessage(email);

    return {
      user,
    };
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  async changeStatus(traineeId: string, status: Status) {
    await this.traineesRepository.update(traineeId, { status });

    return {
      msg: 'Success',
    };
  }

  async acceptToGroup(acceptToGroupInput: AcceptToGroupInput) {
    const { email, userId, traineeId } = acceptToGroupInput;

    this.mailService.sendDecisionMessage(email);

    const job = new CronJob(new Date(this.addDays(Date.now(), 3)), async () => {
      const trainee = await this.traineesRepository.findOne({
        where: { id: traineeId },
      });

      // if trainee hasn't send a contract,delete him after 72h
      if (trainee.status === Status.EXPECTATION) {
        await this.traineesRepository.delete({ id: traineeId });
        await this.usersService.deleteRole(userId, Role.TRAINEE);
        await this.lostTraineesService.createLostTrainee({ traineeId });
        this.mailService.sendLeaveMessage(email);
      }
    });

    this.schedulerRegistry.addCronJob(
      `${Date.now()}-sendAfter72hLeaveMessage`,
      job,
    );

    job.start();

    return this.changeStatus(acceptToGroupInput.traineeId, Status.EXPECTATION);
  }

  async joinGroup(joinGroupInput: JoinGroupInput) {
    const { email, userId, traineeId } = joinGroupInput;

    // await this.mailService.sendLastStepMessage(email);

    const job1 = new CronJob(
      new Date(this.addDays(Date.now(), 3)),
      async () => {
        const trainee = await this.traineesRepository.findOne({
          where: { id: traineeId },
        });

        if (trainee.status === Status.ACCEPTED_WITHOUT_CONTRACT) {
          this.mailService.sendDecisionMessage(email);
        }
      },
    );

    const job2 = new CronJob(
      new Date(this.addDays(Date.now(), 4)),
      async () => {
        const trainee = await this.traineesRepository.findOne({
          where: { id: traineeId },
        });

        if (trainee.status === Status.ACCEPTED_WITHOUT_CONTRACT) {
          await this.traineesRepository.delete({ id: traineeId });
          await this.usersService.deleteRole(userId, Role.TRAINEE);
          await this.lostTraineesService.createLostTrainee({ traineeId });
          this.mailService.sendLeaveMessage(email);
        }
      },
    );

    this.schedulerRegistry.addCronJob(
      `${Date.now()}-sendAfter72hDecisionMessage`,
      job1,
    );
    this.schedulerRegistry.addCronJob(
      `${Date.now()}-sendAfter96hLeaveMessage`,
      job2,
    );

    job1.start();
    job2.start();

    return this.changeStatus(
      joinGroupInput.traineeId,
      Status.ACCEPTED_WITHOUT_CONTRACT,
    );
  }

  async confirmContractReceipt(confirmContractReceiptInput: ConfirmContractReceiptInput) {
    const { email, traineeId } = confirmContractReceiptInput;

    // await this.mailService.sendAllDoneMessage(email);

    return this.changeStatus(
      traineeId,
      Status.ACCEPTED,
    );
  }

  async changeGroup(changeGroupInput: ChangeGroupInput) {
    const { traineeId, groupId } = changeGroupInput;

    await this.traineesRepository.update({ id: traineeId }, { groupId })

    return {
      msg: 'Success',
    };
  }
}
