import { Field, Int, ObjectType } from '@nestjs/graphql';
import { City } from 'src/cities/entities/city.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('coaches')
@ObjectType()
export class Coach {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.coach)
  user: User;

  @OneToOne(() => City, (city) => city.coach)
  city: City;

  @OneToMany(() => Group, (group) => group.coach, { eager: true })
  @Field(() => [Group], { nullable: true })
  groups?: Group[];
}
