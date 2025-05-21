import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AutoLogInUserInput {
  @Field()
  userId: string;
}