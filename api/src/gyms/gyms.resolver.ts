import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GymsService } from './gyms.service';
import { Gym } from './entities/gym.entity';
import { CreateGymInput } from './dto/create-gym.input';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';

@Resolver((of) => Gym)
export class GymsResolver {
  constructor(private gymsService: GymsService) {}

  @Mutation(() => Gym)
  @Roles(Role.ADMIN)
  createGym(
    @Args('createGymInput') createGymInput: CreateGymInput,
  ): Promise<Gym> {
    return this.gymsService.createGym(createGymInput);
  }

  @Mutation(() => Gym)
  @Roles(Role.ADMIN)
  deleteGym(@Args('id') id: string): Promise<Gym> {
    return this.gymsService.deleteGym(id);
  }
}
