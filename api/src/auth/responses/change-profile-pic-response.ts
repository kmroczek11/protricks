import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChangeProfilePicResponse {
  @Field()
  userId:string
}
