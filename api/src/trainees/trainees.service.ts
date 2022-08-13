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
import { JwtService } from '@nestjs/jwt';
import { DeleteTraineeInput } from './dto/delete-trainee.input';

@Injectable()
export class TraineesService {
  constructor(
    @InjectRepository(Trainee)
    private readonly traineesRepository: Repository<Trainee>,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService
  ) {}

  async createTrainee(createTraineeInput: CreateTraineeInput) {
    const group = await this.groupsService.findOne(createTraineeInput.groupId);

    const total = await this.groupsService.count();

    if (total + 1 > group.limit) {
      throw new HttpException('Limit reached', HttpStatus.BAD_REQUEST);
    }

    const newTrainee = await this.traineesRepository.create(createTraineeInput);

    await this.usersService.addRole(createTraineeInput.userId, Role.TRAINEE);

    await this.traineesRepository.save(newTrainee);

    const user = await this.usersService.findOneById(createTraineeInput.userId);

    return {
      user: user,
    };
  }

  findAll() {
    return this.traineesRepository.find();
  }

  findOne(id: string) {
    return this.traineesRepository.findOne(id);
  }

  getUser(userId: string): Promise<User> {
    return this.usersService.findOneById(userId);
  }

  getGroup(groupId: string): Promise<Group> {
    return this.groupsService.findOne(groupId);
  }

  getTrainee(userId: string) {
    return this.traineesRepository.findOne({ userId: userId });
  }

  async deleteTrainee(deleteTraineeInput: DeleteTraineeInput) {
    await this.traineesRepository.delete(deleteTraineeInput.id);

    await this.usersService.deleteRole(deleteTraineeInput.id, Role.TRAINEE);

    return {
      msg: 'Success',
    };
  }
}
