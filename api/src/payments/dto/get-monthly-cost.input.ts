import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetMonthlyCostInput {
  @Field()
  traineeId: string;
}

export default GetMonthlyCostInput;
