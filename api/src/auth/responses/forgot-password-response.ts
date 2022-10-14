import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  msg: string;
}
