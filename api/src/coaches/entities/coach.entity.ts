import { Field, ObjectType } from '@nestjs/graphql';
import { City } from '../../cities/entities/city.entity';
import { Group } from '../../groups/entities/group.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryColumn,
  OneToOne,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('coaches')
@ObjectType()
export class Coach {
  @PrimaryColumn()
  @Field()
  id: string;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }

  @Column({ default: '' })
  @Field()
  facebookUrl: string;

  @Column({ default: '' })
  @Field()
  instagramUrl: string;

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.coach)
  user: User;

  @Column({ nullable: true })
  cityId?: string;

  @OneToOne(() => City, (city) => city.coach)
  @Field(() => City)
  city: City;

  @OneToMany(() => Group, (group) => group.coach, { eager: true })
  @Field(() => [Group], { nullable: true })
  groups?: Group[];
}
