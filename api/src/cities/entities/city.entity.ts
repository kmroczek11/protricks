import { Field, ObjectType } from '@nestjs/graphql';
import { Coach } from 'src/coaches/entities/coach.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';

@Entity('cities')
@ObjectType()
export class City {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

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

  @Column({ default: '' })
  @Field()
  mapSrc: string;

  @OneToOne(() => Coach, (coach) => coach.city)
  @Field(() => Coach)
  coach: Coach;
}
