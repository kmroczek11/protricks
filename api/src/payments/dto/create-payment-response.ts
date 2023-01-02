import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatePaymentResponse {
  @Field()
  msg: string;
}
