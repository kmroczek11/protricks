import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AcceptToGroupInput {
  @Field()
  id: string;
}
