import { Field, InputType } from '@nestjs/graphql';
import { LocalDateResolver } from 'graphql-scalars';

@InputType()
export class CreateAttendanceInput {
  @Field()
  traineeId: string;

  @Field(() => LocalDateResolver)
  day: string;

  @Field()
  present: boolean;

  @Field()
  status: string;
}
