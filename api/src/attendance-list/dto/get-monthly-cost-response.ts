import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetMonthlyCostResponse {
  @Field(() => Number)
  amount: number;
}
