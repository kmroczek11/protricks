import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  Column,
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
  customerId: string;

  @Column()
  @Field()
  month: string;

  @Column()
  @Field()
  amount: Number;
}
