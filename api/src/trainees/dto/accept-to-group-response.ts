import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AcceptToGroupResponse {
  @Field()
  msg: string;
}
