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

@Injectable()
export class TraineesService {
  constructor(
    @InjectRepository(Trainee)
    private readonly traineesRepository: Repository<Trainee>,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly jwtService: JwtService,
  ) {}

  async createTrainee(createTraineeInput: CreateTraineeInput) {
    const group = await this.groupsService.findOne(createTraineeInput.groupId);

    const total = await this.groupsService.count();

    if (total + 1 > group.limit) {
      throw new HttpException(
        'Limit reached',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTrainee = this.traineesRepository.create(createTraineeInput);

    this.usersService.addRole(createTraineeInput.userId, Role.TRAINEE);

    this.traineesRepository.save(newTrainee);

    const user = await this.usersService.findOneById(createTraineeInput.userId);

    return {
      token: this.jwtService.sign({ user: user }),
      user: user,
    };
  }

  findAll() {
    return this.traineesRepository.find();
  }

  findOne(id: number) {
    return this.traineesRepository.findOne({ userId: id });
  }

  getUser(userId: number): Promise<User> {
    return this.usersService.findOneById(userId);
  }

  getGroup(groupId: number): Promise<Group> {
    return this.groupsService.findOne(groupId);
  }
}
