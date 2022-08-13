import { Field, InputType, Int } from '@nestjs/graphql';
import {
  LocalDateResolver,
  LocalDateTypeDefinition,
  LocalTimeResolver,
  LocalTimeTypeDefinition,
} from 'graphql-scalars';

@InputType()
export class EditExerciseInput {
  @Field()
  exerciseId: string;

  @Field(() => LocalDateResolver)
  day: typeof LocalDateTypeDefinition;

  @Field(() => LocalTimeResolver)
  start: typeof LocalTimeTypeDefinition;

  @Field(() => LocalTimeResolver)
  end: typeof LocalTimeTypeDefinition;
}
