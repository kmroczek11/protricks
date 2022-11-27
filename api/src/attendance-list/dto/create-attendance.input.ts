import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAttendanceInput {
  @Field()
  userId: string;

  @Field()
  present: boolean;

  @Field()
  payed: false;
}
