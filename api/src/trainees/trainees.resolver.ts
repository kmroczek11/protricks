import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Group } from 'src/groups/entities/group.entity';
import { Role } from 'src/users/entities/role.enum';
import { User } from 'src/users/entities/user.entity';
import { CreateTraineeResponse } from './dto/create-trainee-response';
import { CreateTraineeInput } from './dto/create-trainee.input';
import { DeleteTraineeResponse } from './dto/delete-trainee-response';
import { DeleteTraineeInput } from './dto/delete-trainee.input';
import { Trainee } from './entities/trainee.entity';
import { TraineesService } from './trainees.service';

@Resolver(() => Trainee)
export class TraineesResolver {
  constructor(private traineesService: TraineesService) {}

  @Mutation(() => CreateTraineeResponse)
  @Roles(Role.USER)
  createTrainee(
    @Args('createTraineeInput') createTraineeInput: CreateTraineeInput,
  ): Promise<CreateTraineeResponse> {
    return this.traineesService.createTrainee(createTraineeInput);
  }

  @Mutation(() => DeleteTraineeResponse)
  @Roles(Role.COACH)
  deleteTrainee(
    @Args('deleteTraineeInput') deleteTraineeInput: DeleteTraineeInput,
  ): Promise<DeleteTraineeResponse> {
    return this.traineesService.deleteTrainee(deleteTraineeInput);
  }

  @Query(() => [Trainee])
  @Roles(Role.COACH)
  trainees(): Promise<Trainee[]> {
    return this.traineesService.findAll();
  }

  @ResolveField(() => User)
  user(@Parent() trainee: Trainee): Promise<User> {
    return this.traineesService.getUser(trainee.userId);
  }

  @ResolveField(() => Group)
  group(@Parent() trainee: Trainee): Promise<Group> {
    return this.traineesService.getGroup(trainee.groupId);
  }

  @Query(() => Trainee)
  @Roles(Role.TRAINEE)
  getTrainee(@Args('id') id: string): Promise<Trainee> {
    return this.traineesService.getTrainee(id);
  }
}
