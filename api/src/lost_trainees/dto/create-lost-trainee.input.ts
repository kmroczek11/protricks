import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLostTraineeInput {
  @Field()
  traineeId: string;
}
