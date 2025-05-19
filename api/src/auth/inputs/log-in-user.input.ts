import { Field, InputType } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class LogInUserInput {
  @Field(() => EmailAddressResolver)
  email: string;

  @Field()
  password: string;
}
