import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCoachInput {
  @Field()
  userId: string;
}
