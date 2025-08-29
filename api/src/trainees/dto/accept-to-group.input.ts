import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AcceptToGroupInput {
  @Field()
  userId: string;

  @Field()
  traineeId: string;

  @Field()
  emailPlain: string;
}
