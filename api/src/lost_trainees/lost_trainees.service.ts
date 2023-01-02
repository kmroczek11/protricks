import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLostTraineeInput } from './dto/create-lost-trainee.input';
import { LostTrainee } from './entities/lostTrainee.entity';

@Injectable()
export class LostTraineesService {
  constructor(
    @InjectRepository(LostTrainee)
    private lostTraineesRepository: Repository<LostTrainee>,
  ) {}

  async createLostTrainee(createLostTrainee: CreateLostTraineeInput) {
    const newLostTrainee = this.lostTraineesRepository.create(createLostTrainee);

    this.lostTraineesRepository.save(newLostTrainee);

    return { msg: 'Success' };
  }
}
