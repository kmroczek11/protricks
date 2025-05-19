import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChangeEmailResponse {
  @Field()
  userId:string
}
