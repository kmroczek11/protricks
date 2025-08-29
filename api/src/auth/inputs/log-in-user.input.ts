import { Field, InputType } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class LogInUserInput {
  @Field(() => EmailAddressResolver)
  emailPlain: string;

  @Field()
  password: string;
}
