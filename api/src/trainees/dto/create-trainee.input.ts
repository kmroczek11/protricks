import { Field, InputType } from '@nestjs/graphql';
import { EmailAddressResolver, PhoneNumberResolver } from 'graphql-scalars';
import { LocalDateResolver } from 'graphql-scalars';

@InputType()
export class CreateTraineeInput {
  @Field()
  userId: string;

  @Field()
  groupId: string;

  @Field(() => LocalDateResolver)
  birthDate: string;

  @Field()
  traineeName: string;

  @Field(() => PhoneNumberResolver)
  parentPhone: string;

  @Field(() => EmailAddressResolver)
  parentEmail: string;

  @Field()
  feedback?: string;

  @Field(() => LocalDateResolver)
  dateJoined: string;
}
