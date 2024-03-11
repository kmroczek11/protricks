import { Field, ObjectType } from '@nestjs/graphql';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@ObjectType()
export class MonthObject {
    @Field()
    month: string

    @Field(() => [Exercise])
    exercises: Exercise[];

    @Field(() => Boolean)
    payed: boolean
}