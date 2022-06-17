import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field(() => Int)
  id: number;

  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}
