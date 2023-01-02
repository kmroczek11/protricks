import { Field, ObjectType } from '@nestjs/graphql';
import { LocalDateResolver, LocalTimeResolver } from 'graphql-scalars';
import { Group } from 'src/groups/entities/group.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('lost_trainees')
@ObjectType()
export class LostTrainee {
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
}
