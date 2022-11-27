import { Injectable } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { CoachesService } from 'src/coaches/coaches.service';
import { Coach } from 'src/coaches/entities/coach.entity';
import { EditGroupInput } from './dto/edit-group.input';
import { SendEmailToGroupInput } from './dto/send-email-to-group.input';
import { SendEmailToGroupResponse } from './dto/send-email-to-group-response';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    private readonly usersService: UsersService,
    private readonly coachesService: CoachesService,
    private readonly mailService: MailService,
  ) { }

  async createGroup(createGroupInput: CreateGroupInput) {
    const newGroup = this.groupsRepository.create(createGroupInput);

    this.groupsRepository.save(newGroup);

    return { msg: 'Success' };
  }

  findAll() {
    return this.groupsRepository.find();
  }

  findOne(id: string) {
    return this.groupsRepository.findOne({ where: { id } });
  }

  getCoach(coachId: string): Promise<Coach> {
    return this.coachesService.findOne(coachId);
  }

  async editGroup(editGroupInput: EditGroupInput) {
    const { groupId, ...payload } = editGroupInput;

    this.groupsRepository.update(groupId, payload);

    return {
      msg: 'Success',
    };
  }

  async deleteGroup(id: string) {
    this.groupsRepository.delete(id);

    return {
      msg: 'Success',
    };
  }

  async sendMessageToGroup(
    sendEmailToGroupInput: SendEmailToGroupInput,
  ): Promise<SendEmailToGroupResponse> {
    const { groupId, sender, from, subject, message } = sendEmailToGroupInput;

    const group = await this.groupsRepository.findOne({ where: { id: groupId } });

    group.trainees.forEach(async (trainee) => {
      const user = await this.usersService.findOneById(trainee.userId);

      await this.mailService.sendMessage(user.email, subject, message, sender);
    });

    return {
      msg: 'Success',
    };
  }
}
