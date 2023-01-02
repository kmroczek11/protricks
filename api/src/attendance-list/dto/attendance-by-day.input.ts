import { InputType, Field } from '@nestjs/graphql';
import { LocalDateResolver } from 'graphql-scalars';

@InputType()
export class AttendanceByDayInput {
  @Field(() => LocalDateResolver)
  day: string;
}
