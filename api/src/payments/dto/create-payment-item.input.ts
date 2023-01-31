import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentItemInput {
  @Field(() => Number)
  amount: number;
}
