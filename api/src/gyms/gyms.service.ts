import { Injectable } from '@nestjs/common';
import { Gym } from './entities/gym.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGymInput } from './dto/create-gym.input';

@Injectable()
export class GymsService {
  constructor(
    @InjectRepository(Gym)
    private readonly gymsRepository: Repository<Gym>,
  ) {}

  createGym(createGymInput: CreateGymInput): Promise<Gym> {
    const newGym = this.gymsRepository.create(createGymInput);

    return this.gymsRepository.save(newGym);
  }

  findAll(): Promise<Gym[]> {
    return this.gymsRepository.find();
  }

  findOne(id: string) {
    return this.gymsRepository.findOne({ where: { id } });
  }

  deleteGym(id: string): Promise<Gym> {
    this.gymsRepository.delete(id);

    return this.gymsRepository.findOne({where:{id}});
  }
}
