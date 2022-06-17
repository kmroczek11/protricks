import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { User } from 'src/users/entities/user.entity';
import { CoachesService } from './coaches.service';
import { CreateCoachInput } from './dto/create-coach.input';
import { Coach } from './entities/coach.entity';

@Resolver(() => Coach)
export class CoachesResolver {
  constructor(private coachesService: CoachesService) {}

  @Mutation(() => Coach)
  @Roles(Role.ADMIN)
  createCoach(
    @Args('createCoachInput') createCoachInput: CreateCoachInput,
  ): Promise<Coach> {
    return this.coachesService.createCoach(createCoachInput);
  }

  @ResolveField(() => User)
  user(@Parent() coach: Coach): Promise<User> {
    return this.coachesService.getUser(coach.userId);
  }

  @Query(() => Coach)
  @Roles(Role.COACH)
  getCoach(@Args('id', { type: () => Int }) id: number): Promise<Coach> {
    return this.coachesService.findOne(id);
  }
}
