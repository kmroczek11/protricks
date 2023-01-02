import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field()
  paymentMethodId: string;

  @Field(() => Number)
  amount: number;
}

export default CreatePaymentInput;
