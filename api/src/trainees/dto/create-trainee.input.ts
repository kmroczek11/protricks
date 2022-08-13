import { Field, InputType, Int } from '@nestjs/graphql';
import { EmailAddressResolver, PhoneNumberResolver } from 'graphql-scalars';

@InputType()
export class CreateTraineeInput {
  @Field()
  userId: string;

  @Field()
  groupId: string;

  @Field(() => Int)
  age: number;

  @Field()
  parentName: string;

  @Field(() => PhoneNumberResolver)
  parentPhone: string;

  @Field(() => EmailAddressResolver)
  parentEmail: string;

  @Field()
  feedback: string;
}
