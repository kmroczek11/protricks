import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetMonthlyExercisesInput {
  @Field()
  userId: string;
}
