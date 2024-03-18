import { InputType, Field } from '@nestjs/graphql';
import { LocalDateResolver } from 'graphql-scalars';

@InputType()
export class AttendanceByGroupIdAndDayInput {
  @Field()
  groupId: string;

  @Field(() => LocalDateResolver)
  day: string;
}
