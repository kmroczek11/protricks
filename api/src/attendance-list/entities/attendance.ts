import { Field, ObjectType } from '@nestjs/graphql';
import { LocalDateResolver } from 'graphql-scalars';
import { Status } from 'src/trainees/entities/status.enum';
import { Trainee } from 'src/trainees/entities/trainee.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('attendance')
@ObjectType()
export class Attendance {
  @PrimaryColumn()
  @Field()
  id: string;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }

  @Column()
  traineeId: string;

  @ManyToOne(() => Trainee, (trainee) => trainee.attendances, {
    onDelete: 'CASCADE',
  })
  @Field(() => Trainee)
  trainee: Trainee;

  @Column({ type: 'date' })
  @Field(() => LocalDateResolver)
  day: string;

  @Column()
  @Field(() => Boolean)
  present: boolean;

  @Column()
  @Field()
  status: string;
}
