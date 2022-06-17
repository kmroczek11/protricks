import { Field, InputType, Int } from '@nestjs/graphql';
import { EmailAddressResolver, PhoneNumberResolver } from 'graphql-scalars';

@InputType()
export class CreateTraineeInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  groupId: number;

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
