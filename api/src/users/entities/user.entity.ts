import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Coach } from 'src/coaches/entities/coach.entity';
import { Trainee } from 'src/trainees/entities/trainee.entity';
import { Exclude } from 'class-transformer';
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
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

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
  @Exclude()
  password: string;

  @Column({ default: '' })
  @Field()
  imgSrc: string;

  @Column('varchar', { default: [Role.USER], array: true })
  @Field(() => [Role])
  roles: Role[];

  @Column({ nullable: true })
  @Exclude()
  refreshToken?: string;

  @OneToOne(() => Coach, (coach) => coach.user)
  coach: Coach;

  @OneToOne(() => Trainee, (trainee) => trainee.user)
  trainee: Trainee;
}
