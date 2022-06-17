import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteExerciseResponse {
  @Field()
  msg: string;
}
