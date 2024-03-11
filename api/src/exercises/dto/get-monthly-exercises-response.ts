import { Field, ObjectType } from '@nestjs/graphql';
import { MonthObject } from './month-object';

@ObjectType()
export class GetMonthlyExercisesResponse {
    @Field(() => [MonthObject])
    monthObjects: MonthObject[]

    @Field(() => Number)
    price: number
}