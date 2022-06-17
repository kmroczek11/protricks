import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteGroupResponse {
  @Field()
  msg: string;
}
