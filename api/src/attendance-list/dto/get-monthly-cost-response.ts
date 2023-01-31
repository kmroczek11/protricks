import { Field, ObjectType } from '@nestjs/graphql';
import { boolean } from 'joi';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@ObjectType()
export class GetMonthlyCostResponse {
  @Field(() => Number)
  amount: number;

  @Field(() => [Exercise], { nullable: true })
  actualExercises?: Exercise[];

  @Field(() => Number, { nullable: true })
  groupPrice?: number;

  @Field(() => Boolean, { nullable: true })
  firstTimeDiscountApplied?: boolean;
}
