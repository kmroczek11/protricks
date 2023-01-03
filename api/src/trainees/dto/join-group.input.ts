import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JoinGroupInput {
  @Field()
  traineeId: string;

  @Field()
  email: string;
}
