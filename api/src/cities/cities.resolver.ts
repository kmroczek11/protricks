import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { CreateCityInput } from './dto/create-city.input';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';

@Resolver((of) => City)
export class CitiesResolver {
  constructor(private citiesService: CitiesService) {}

  @Mutation(() => City)
  @Roles(Role.ADMIN)
  createCity(
    @Args('createCityInput') createCityInput: CreateCityInput,
  ): Promise<City> {
    return this.citiesService.createCity(createCityInput);
  }

  @Mutation(() => City)
  @Roles(Role.ADMIN)
  deleteCity(@Args('id') id: string): Promise<City> {
    return this.citiesService.deleteCity(id);
  }
}
