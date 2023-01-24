import { Field, ObjectType } from '@nestjs/graphql';
import { boolean } from 'joi';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@ObjectType()
export class GetMonthlyCostResponse {
  @Field(() => [Exercise])
  actualExercises: Exercise[];

  @Field(() => Number)
  amount: number;

  @Field(() => Number)
  groupPrice: number;

  @Field(() => Boolean)
  firstTimeDiscountApplied: boolean;
}
