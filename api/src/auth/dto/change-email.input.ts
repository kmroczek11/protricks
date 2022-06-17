import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ChangeEmailInput {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;
}
