import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChargeInput {
  @Field()
  paymentMethodId: string;

  @Field(() => Number)
  amount: number;
}

export default CreateChargeInput;
