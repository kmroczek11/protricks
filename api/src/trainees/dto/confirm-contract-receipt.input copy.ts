import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConfirmContractReceiptInput {
  @Field()
  id: string;
}
