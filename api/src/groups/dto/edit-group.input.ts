import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class EditGroupInput {
  @Field(() => Int)
  groupId: number;
  
  @Field()
  name: string;

  @Field(() => Int)
  limit: number;
}
