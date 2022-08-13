import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field()
  name: string;

  @Field()
  coachId: string;

  @Field(() => Int)
  limit: number;
}
