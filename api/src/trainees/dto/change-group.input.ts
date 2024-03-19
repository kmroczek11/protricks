import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangeGroupInput {
  @Field()
  traineeId: string;

  @Field()
  groupId: string;
}
