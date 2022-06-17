import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EmailAddressResolver, PhoneNumberResolver } from 'graphql-scalars';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('trainees')
@ObjectType()
export class Trainee {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.trainee)
  @Field(() => User)
  user: User;

  @Column()
  groupId: number;

  @ManyToOne(() => Group, (group) => group.trainees)
  group: Group;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field()
  parentName: string;

  @Column()
  @Field(() => PhoneNumberResolver)
  parentPhone: string;

  @Column()
  @Field(() => EmailAddressResolver)
  parentEmail: string;

  @Column()
  @Field()
  feedback: string;
}
