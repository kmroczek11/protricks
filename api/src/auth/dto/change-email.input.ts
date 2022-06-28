import { Field, InputType, Int } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class ChangeEmailInput {
  @Field(() => Int)
  id: number;

  @Field(() => EmailAddressResolver)
  email: string;
}
