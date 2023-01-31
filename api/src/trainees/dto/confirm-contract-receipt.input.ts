import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConfirmContractReceiptInput {
  @Field()
  traineeId: string;

  @Field()
  email: string;
}
