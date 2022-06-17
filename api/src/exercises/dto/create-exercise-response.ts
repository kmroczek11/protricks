import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateExerciseResponse {
  @Field()
  msg: string;
}
