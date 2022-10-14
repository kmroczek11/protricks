import { Field, InputType } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class SendEmailToGroupInput {
  @Field()
  groupId: string;

  @Field()
  sender: string;

  @Field(() => EmailAddressResolver)
  from: string;

  @Field()
  subject: string;

  @Field()
  message: string;
}
