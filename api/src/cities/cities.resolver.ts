import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { CreateCityInput } from './dto/create-city.input';
import { User } from 'src/users/entities/user.entity';
import { Coach } from 'src/coaches/entities/coach.entity';
import { Public } from 'src/auth/guards/public.guard';

@Resolver((of) => City)
export class CitiesResolver {
  constructor(private citiesService: CitiesService) {}

  @Mutation(() => City)
  createCity(
    @Args('createCityInput') createCityInput: CreateCityInput,
  ): Promise<City> {
    return this.citiesService.createCity(createCityInput);
  }

  @Query(() => [City])
  @Public()
  cities(): Promise<City[]> {
    return this.citiesService.findAll();
  }

  @Mutation(() => City)
  deleteCity(@Args('id', { type: () => Int }) id: number): Promise<City> {
    return this.citiesService.deleteCity(id);
  }

  @ResolveField(() => Coach)
  coach(@Parent() city: City): Promise<Coach> {
    return this.citiesService.getCoach(city.coachId);
  }
}
