import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteTraineeWithMessageInput {
  @Field()
  userId: string;

  @Field()
  email: string;
}
