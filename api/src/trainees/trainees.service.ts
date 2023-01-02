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

@Injectable()
export class TraineesService {
  constructor(
    @InjectRepository(Trainee)
    private readonly traineesRepository: Repository<Trainee>,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly mailService: MailService,
  ) {}

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

    await this.mailService.sendFirstTimeMessage(user.email);

    return {
      user: user,
    };
  }

  findAll() {
    return this.traineesRepository.find();
  }

  findOneByTraineeId(id: string) {
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

    console.log(user)

    return {
      user,
    };
  }

  async changeStatus(id: string, status: Status) {
    await this.traineesRepository.update(id, { status });

    return {
      msg: 'Success',
    };
  }
}
