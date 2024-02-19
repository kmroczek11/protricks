import { Field, ObjectType } from '@nestjs/graphql';
import { Gym } from 'src/gyms/entities/gym.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
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
  gymId?: string;

  @OneToOne(() => Gym, (gym) => gym.coach)
  @Field(() => Gym)
  gym: Gym;

  @OneToMany(() => Group, (group) => group.coach, { eager: true })
  @Field(() => [Group], { nullable: true })
  groups?: Group[];
}
