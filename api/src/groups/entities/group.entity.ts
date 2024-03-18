import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Attendance } from 'src/attendances/entities/attendance';
import { Coach } from 'src/coaches/entities/coach.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Trainee } from 'src/trainees/entities/trainee.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('groups')
@ObjectType()
export class Group {
  @PrimaryColumn()
  @Field()
  id: string;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }

  @Column({ default: '' })
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  limit: number;

  @Column()
  @Field(() => Number)
  price:number;

  @Column()
  coachId: string;

  @ManyToOne(() => Coach, (coach) => coach.groups)
  coach: Coach;

  @OneToMany(() => Exercise, (exercise) => exercise.group, { eager: true })
  @Field(() => [Exercise], { nullable: true })
  exercises?: Exercise[];

  @OneToMany(() => Trainee, (trainee) => trainee.group, { eager: true })
  @Field(() => [Trainee], { nullable: true })
  trainees?: Trainee[];

  @OneToMany(() => Attendance, (attendance) => attendance.group, {
    eager: true,
    cascade: true,
  })
  @Field(() => [Attendance], { nullable: true })
  attendances?: Attendance[];
}
