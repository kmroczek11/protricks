import { ObjectType, Field, Int } from '@nestjs/graphql';
import { type } from 'os';
import { City } from 'src/cities/entities/city.entity';
import { Coach } from 'src/coaches/entities/coach.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Trainee } from 'src/trainees/entities/trainee.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('groups')
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ default: '' })
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  limit: number;

  @Column()
  coachId: string;

  @ManyToOne(() => Coach, (coach) => coach.groups)
  coach: City;

  @OneToMany(() => Exercise, (exercise) => exercise.group, { eager: true })
  @Field(() => [Exercise], { nullable: true })
  exercises?: Exercise[];

  @OneToMany(() => Trainee, (trainee) => trainee.group, { eager: true })
  @Field(() => [Trainee], { nullable: true })
  trainees?: Trainee[];
}
