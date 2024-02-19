import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach } from './entities/coach.entity';
import { Repository } from 'typeorm';
import { CreateCoachInput } from './dto/create-coach.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Gym } from 'src/gyms/entities/gym.entity';
import { GymsService } from 'src/gyms/gyms.service';

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(Coach)
    private readonly coachesRepository: Repository<Coach>,
    private readonly usersService: UsersService,
    private readonly gymsService: GymsService
  ) {}

  createCoach(createCoachInput: CreateCoachInput) {
    const newCoach = this.coachesRepository.create(createCoachInput);

    return this.coachesRepository.save(newCoach);
  }

  findAll() {
    return this.coachesRepository.find();
  }

  findOne(id: string) {
    return this.coachesRepository.findOne({ where: { id } });
  }

  getCoach(userId: string) {
    return this.coachesRepository.findOne({ where: { userId } });
  }

  getUser(userId: string): Promise<User> {
    return this.usersService.findOneById(userId);
  }

  getGym(gymId: string): Promise<Gym> {
    return this.gymsService.findOne(gymId);
  }
}
