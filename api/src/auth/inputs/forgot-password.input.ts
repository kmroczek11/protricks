import { Field, InputType } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class ForgotPasswordInput {
  @Field(() => EmailAddressResolver)
  email: string;
}
