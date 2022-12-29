import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateChargeResponse {
  @Field()
  msg: string;
}
