import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentIntentInput {
  @Field(() => Number)
  amount: number;
}
