import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityInput } from './dto/create-city.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CoachesService } from 'src/coaches/coaches.service';
import { Coach } from 'src/coaches/entities/coach.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
    private readonly coachesService: CoachesService,
     ) {}

  createCity(createCityInput: CreateCityInput): Promise<City> {
    const newCity = this.citiesRepository.create(createCityInput);

    return this.citiesRepository.save(newCity);
  }

  findAll(): Promise<City[]> {
    return this.citiesRepository.find();
  }

  findOne(id: number) {
    return this.citiesRepository.findOne(id);
  }

  deleteCity(id: number): Promise<City> {
    this.citiesRepository.delete(id);

    return this.citiesRepository.findOne(id);
  }

  getCoach(coachId: number): Promise<Coach> {
    return this.coachesService.findOne(coachId);
  }
}
