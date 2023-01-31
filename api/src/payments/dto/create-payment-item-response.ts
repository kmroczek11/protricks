import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatePaymentItemResponse {
  @Field()
  msg: string;
}
