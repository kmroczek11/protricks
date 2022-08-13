import { Injectable } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { CoachesService } from 'src/coaches/coaches.service';
import { Coach } from 'src/coaches/entities/coach.entity';
import { EditGroupInput } from './dto/edit-group.input';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    private readonly coachesService: CoachesService,
  ) {}

  async createGroup(createGroupInput: CreateGroupInput) {
    const newGroup = this.groupsRepository.create(createGroupInput);

    this.groupsRepository.save(newGroup);

    return { msg: 'success' };
  }

  findAll() {
    return this.groupsRepository.find();
  }

  findOne(id: string) {
    return this.groupsRepository.findOne(id);
  }

  getCoach(coachId: string): Promise<Coach> {
    return this.coachesService.findOne(coachId);
  }

  async count(): Promise<number> {
    const [result, total] = await this.groupsRepository.findAndCount();

    return total;
  }

  async editGroup(editGroupInput: EditGroupInput) {
    const { groupId, ...payload } = editGroupInput;

    this.groupsRepository.update(groupId, payload);

    return {
      msg: 'success',
    };
  }

  async deleteGroup(id: string) {
    this.groupsRepository.delete(id);

    return {
      msg: 'success',
    };
  }
}
