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
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Group } from 'src/groups/entities/group.entity';
import { Role } from 'src/users/entities/role.enum';
import { User } from 'src/users/entities/user.entity';
import { CreateExerciseResponse } from './dto/create-exercise-response';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { DeleteExerciseResponse } from './dto/delete-exercise-response';
import { EditExerciseResponse } from './dto/edit-exercise-response';
import { EditExerciseInput } from './dto/edit-exercise.input';
import { GetMonthlyExercisesResponse } from './dto/get-monthly-exercises-response';
import { GetMonthlyExercisesInput } from './dto/get-monthly-exercises.input';
import { Exercise } from './entities/exercise.entity';
import { ExercisesService } from './exercises.service';

@Resolver(() => Exercise)
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExercisesService) { }

  @Mutation(() => CreateExerciseResponse)
  @Roles(Role.COACH)
  createExercise(
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
  ): Promise<CreateExerciseResponse> {
    return this.exercisesService.createExercise(createExerciseInput);
  }

  @Query(() => [Exercise])
  @Roles(Role.TRAINEE, Role.COACH)
  exercises(): Promise<Exercise[]> {
    return this.exercisesService.findAll();
  }

  @ResolveField(() => Group)
  group(@Parent() exercise: Exercise): Promise<Group> {
    return this.exercisesService.getGroup(exercise.groupId);
  }

  @Mutation(() => EditExerciseResponse)
  @Roles(Role.COACH)
  editExercise(
    @Args('editExerciseInput') editExerciseInput: EditExerciseInput,
  ): Promise<EditExerciseResponse> {
    return this.exercisesService.editExercise(editExerciseInput);
  }

  @Mutation(() => DeleteExerciseResponse)
  @Roles(Role.COACH)
  deleteExercise(@Args('id') id: string): Promise<DeleteExerciseResponse> {
    return this.exercisesService.deleteExercise(id);
  }

  @Query(() => GetMonthlyExercisesResponse)
  @Roles(Role.TRAINEE)
  getMonthlyExercises(
    @Args('getMonthlyExercisesInput') getMonthlyExercisesInput: GetMonthlyExercisesInput,
    @CurrentUser() user: User,
  ) {
    return this.exercisesService.getMonthlyExercises(getMonthlyExercisesInput, user.stripeCustomerId);
  }
}
