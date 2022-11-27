import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityInput } from './dto/create-city.input';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
  ) {}

  createCity(createCityInput: CreateCityInput): Promise<City> {
    const newCity = this.citiesRepository.create(createCityInput);

    return this.citiesRepository.save(newCity);
  }

  findAll(): Promise<City[]> {
    return this.citiesRepository.find();
  }

  findOne(id: string) {
    return this.citiesRepository.findOne({ where: { id } });
  }

  deleteCity(id: string): Promise<City> {
    this.citiesRepository.delete(id);

    return this.citiesRepository.findOne({where:{id}});
  }
}
