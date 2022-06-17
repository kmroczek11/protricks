import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EditGroupResponse {
  @Field()
  msg: string;
}
