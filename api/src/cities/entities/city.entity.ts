import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Coach } from 'src/coaches/entities/coach.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('cities')
@ObjectType()
export class City {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ default: '' })
  @Field()
  name: string;

  @Column({ default: '' })
  @Field()
  room: string;

  @Column({ default: '' })
  @Field()
  citySrc: string;

  @Column({ default: '' })
  @Field()
  roomSrc: string;

  @Column()
  coachId: number;

  @OneToOne(() => Coach, (coach) => coach.city)
  @Field(() => Coach)
  coach: Coach;
}
