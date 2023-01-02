import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateLostTraineeResponse {
  @Field()
  msg: string;
}
