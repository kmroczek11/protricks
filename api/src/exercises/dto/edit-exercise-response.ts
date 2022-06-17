import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EditExerciseResponse {
  @Field()
  msg: string;
}
