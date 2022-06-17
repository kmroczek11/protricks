import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach } from './entities/coach.entity';
import { Repository } from 'typeorm';
import { CreateCoachInput } from './dto/create-coach.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(Coach)
    private readonly coachesRepository: Repository<Coach>,
    private readonly usersService: UsersService,
  ) {}

  createCoach(createCoachInput: CreateCoachInput) {
    const newCoach = this.coachesRepository.create(createCoachInput);

    return this.coachesRepository.save(newCoach);
  }

  findOne(id: number) {
    return this.coachesRepository.findOne(id);
  }

  getUser(userId: number): Promise<User> {
    return this.usersService.findOneById(userId);
  }
}
