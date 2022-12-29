import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class EditGroupInput {
  @Field()
  groupId: string;

  @Field()
  name: string;

  @Field(() => Int)
  limit: number;

  @Field(() => Number)
  price: number;
}
