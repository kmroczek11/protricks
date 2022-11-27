import { Field, ObjectType } from '@nestjs/graphql';
import { Coach } from 'src/coaches/entities/coach.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryColumn, Column, OneToOne, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('cities')
@ObjectType()
export class Attendance {
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
  present: boolean;
}
