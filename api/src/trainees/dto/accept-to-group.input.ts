import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AcceptToGroupInput {
  @Field()
  traineeId: string;

  @Field()
  email: string;
}
