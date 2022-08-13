import { Field, ObjectType } from '@nestjs/graphql';
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
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

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
  groupId: string;

  @ManyToOne(() => Group, (group) => group.exercises)
  group: Group;
}
