import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JoinGroupInput {
  @Field()
  id: string;
}
