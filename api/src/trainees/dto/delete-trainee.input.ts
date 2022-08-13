import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteTraineeInput {
  @Field()
  id: string;
}
