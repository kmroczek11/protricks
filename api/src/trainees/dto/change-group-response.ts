import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChangeGroupResponse {
  @Field()
  msg: string;
}
