import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentItemInput {
  @Field()
  month: string

  @Field(() => Number)
  amount: number;
}
