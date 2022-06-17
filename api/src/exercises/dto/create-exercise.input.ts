import { Field, InputType, Int } from '@nestjs/graphql';
import { LocalDateResolver, LocalTimeResolver } from 'graphql-scalars';

@InputType()
export class CreateExerciseInput {
  @Field(() => LocalDateResolver)
  day: string;

  @Field(() => LocalTimeResolver)
  start: string;

  @Field(() => LocalTimeResolver)
  end: string;

  @Field(() => Int)
  groupId: number;
}
