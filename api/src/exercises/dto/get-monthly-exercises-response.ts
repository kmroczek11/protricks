import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from 'src/trainees/entities/status.enum';
import { Exercise } from '../entities/exercise.entity';

@ObjectType()
export class GetMonthlyExercisesResponse {
  @Field(() => [Exercise])
  exercises: Exercise[];

  @Field()
  price: Number;

  @Field()
  status: Status;
}
