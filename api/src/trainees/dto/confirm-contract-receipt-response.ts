import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConfirmContractReceiptResponse {
  @Field()
  msg: string;
}
