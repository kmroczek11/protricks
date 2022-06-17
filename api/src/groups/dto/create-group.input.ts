import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field()
  name: string;

  @Field(() => Int)
  coachId: number;

  @Field(() => Int)
  limit: number;
}
