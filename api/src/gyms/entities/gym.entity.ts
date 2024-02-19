import { Field, ObjectType } from '@nestjs/graphql';
import { Coach } from 'src/coaches/entities/coach.entity';
import { Entity, PrimaryColumn, Column, OneToOne, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('gyms')
@ObjectType()
export class Gym {
  @PrimaryColumn()
  @Field()
  id: string;

  @BeforeInsert()
  setId() {
    this.id = uuidv4();
  }

  @Column({ default: '' })
  @Field()
  name: string;

  @Column({ default: '' })
  @Field()
  room: string;

  @Column({ default: '' })
  @Field()
  gymSrc: string;

  @Column({ default: '' })
  @Field()
  roomSrc: string;

  @Column({ default: '' })
  @Field()
  mapSrc: string;

  @Column({ default: '' })
  @Field()
  priceListSrc: string;

  @OneToOne(() => Coach, (coach) => coach.gym)
  @Field(() => Coach)
  coach: Coach;
}
