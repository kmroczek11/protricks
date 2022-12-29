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
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Status } from './status.enum';
import { Attendance } from 'src/attendance-list/entities/attendance';

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

  @OneToMany(() => Attendance, (attendance) => attendance.trainee, {
    eager: true,
  })
  @Field(() => [Attendance], { nullable: true })
  attendances?: Attendance[];

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
