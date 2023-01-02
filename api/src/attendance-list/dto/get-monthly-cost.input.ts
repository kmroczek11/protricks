import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetMonthlyCostInput {
  @Field()
  userId: string;
}

export default GetMonthlyCostInput;
