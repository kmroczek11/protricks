import { Field, ObjectType } from '@nestjs/graphql';
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
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.coach)
  user: User;

  @Column({nullable:true})
  cityId?: string;

  @OneToOne(() => City, (city) => city.coach)
  @Field(() => City)
  city: City;

  @OneToMany(() => Group, (group) => group.coach, { eager: true })
  @Field(() => [Group], { nullable: true })
  groups?: Group[];
}
