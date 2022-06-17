import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  LocalDateResolver,
  LocalTimeResolver,
} from 'graphql-scalars';
import { Group } from 'src/groups/entities/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('exercises')
@ObjectType()
export class Exercise {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'date' })
  @Field(() => LocalDateResolver)
  day: string;

  @Column({ type: 'time' })
  @Field(() => LocalTimeResolver)
  start: string;

  @Column({ type: 'time' })
  @Field(() => LocalTimeResolver)
  end: string;

  @Column()
  groupId: number;

  @ManyToOne(() => Group, (group) => group.exercises)
  group: Group;
}
