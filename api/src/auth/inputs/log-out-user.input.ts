import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LogOutUserInput {
  @Field()
  userId: string;
}
