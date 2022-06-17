import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateGroupResponse {
  @Field()
  msg: string;
}
