import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteTraineeResponse {
  @Field()
  msg: string;
}
