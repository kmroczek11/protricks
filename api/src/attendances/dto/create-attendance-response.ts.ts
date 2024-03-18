import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateAttendanceResponse {
  @Field()
  msg: string;
}
