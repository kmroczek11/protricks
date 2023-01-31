import { Field,ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatePaymentIntentResponse {
  @Field()
  clientSecret: string;
}
