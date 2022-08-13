import { Field, InputType } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class ChangeEmailInput {
  @Field()
  id: string;

  @Field(() => EmailAddressResolver)
  email: string;
}
