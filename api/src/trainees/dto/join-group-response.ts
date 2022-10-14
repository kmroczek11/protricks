import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JoinGroupResponse {
  @Field()
  msg: string;
}
