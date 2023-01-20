import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JoinGroupInput {
  @Field()
  userId: string;

  @Field()
  traineeId: string;

  @Field()
  email: string;
}
