import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { CreateCityInput } from './dto/create-city.input';

@Resolver((of) => City)
export class CitiesResolver {
  constructor(private citiesService: CitiesService) {}

  @Mutation(() => City)
  createCity(
    @Args('createCityInput') createCityInput: CreateCityInput,
  ): Promise<City> {
    return this.citiesService.createCity(createCityInput);
  }

  @Mutation(() => City)
  deleteCity(@Args('id') id: string): Promise<City> {
    return this.citiesService.deleteCity(id);
  }
}
