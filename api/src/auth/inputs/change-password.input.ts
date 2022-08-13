import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  id: string;

  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}
