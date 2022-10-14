import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendEmailToGroupResponse {
  @Field()
  msg: string;
}
