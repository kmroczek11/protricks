import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteTraineeWithMessageResponse {
  @Field()
  userId: string;
}
