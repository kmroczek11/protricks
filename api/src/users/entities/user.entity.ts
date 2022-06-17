import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Coach } from 'src/coaches/entities/coach.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Trainee } from 'src/trainees/entities/trainee.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { Role } from './role.enum';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ default: '' })
  @Field()
  firstName: string;

  @Column({ default: '' })
  @Field()
  lastName: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ select: false })
  @Field()
  @IsString()
  password: string;

  @Column({ default: '' })
  @Field()
  imgSrc: string;

  @Column('text', { default: [Role.USER], array: true })
  @Field(() => [Role])
  roles: Role[];

  @OneToOne(() => Coach, (coach) => coach.user)
  coach: Coach;

  @OneToOne(() => Trainee, (trainee) => trainee.user)
  trainee: Trainee;
}
