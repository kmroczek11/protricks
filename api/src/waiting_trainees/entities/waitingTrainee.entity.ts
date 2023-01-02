import { Field, ObjectType } from '@nestjs/graphql';
import { LocalDateResolver } from 'graphql-scalars';
import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('waiting_trainees')
@ObjectType()
export class Exercise {
  @PrimaryColumn()
  @Field()
  id: string;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }

  @Column()
  @Field()
  traineeId: string;

  // day from which we wait for decision
  // after 72h trainee gets removed from a group
  @Column({ type: 'date' })
  @Field(() => LocalDateResolver)
  day: string;
}
