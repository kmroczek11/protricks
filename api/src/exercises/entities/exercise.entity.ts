import { Field, ObjectType } from '@nestjs/graphql';
import { LocalDateResolver, LocalTimeResolver } from 'graphql-scalars';
import { Group } from '../../groups/entities/group.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('exercises')
@ObjectType()
export class Exercise {
  @PrimaryColumn()
  @Field()
  id: string;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }

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
