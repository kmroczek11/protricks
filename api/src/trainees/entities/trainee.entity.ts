import { Field, ObjectType } from '@nestjs/graphql';
import { EmailAddressResolver, PhoneNumberResolver } from 'graphql-scalars';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { LocalDateResolver } from 'graphql-scalars';
import {
  Entity,
  PrimaryColumn,
  OneToOne,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Status } from './status.enum';

@Entity('trainees')
@ObjectType()
export class Trainee {
  @PrimaryColumn()
  @Field()
  id: string;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.trainee)
  @Field(() => User)
  user: User;

  @Column()
  groupId: string;

  @ManyToOne(() => Group, (group) => group.trainees)
  group: Group;

  @Column({ type: 'date' })
  @Field(() => LocalDateResolver)
  birthDate: string;

  @Column()
  @Field()
  traineeName: string;

  @Column()
  @Field(() => PhoneNumberResolver)
  parentPhone: string;

  @Column()
  @Field(() => EmailAddressResolver)
  parentEmail: string;

  @Column({ default: '' })
  @Field()
  feedback?: string;

  @Column('varchar', { default: Status.FIRST_TIME })
  @Field(() => Status)
  status: Status;
}
