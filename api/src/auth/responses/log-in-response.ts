import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogInResponse {
  @Field()
  userId: string
}
