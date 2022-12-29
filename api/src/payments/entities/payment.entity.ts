import { Field, ObjectType } from '@nestjs/graphql';
import { City } from 'src/cities/entities/city.entity';
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

@Entity('payments')
@ObjectType()
export class Payment {
  @PrimaryColumn()
  @Field()
  id: string;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }

  @Column()
  @Field()
  month: string;

  @Column()
  @Field()
  amount: Number;
}
