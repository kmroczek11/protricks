import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateTraineeResponse {
  @Field()
  userId: string;
}
