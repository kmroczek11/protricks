import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGymInput {
  @Field()
  name: string;

  @Field()
  room: string;

  @Field()
  gymSrc: string;

  @Field()
  roomSrc: string;

  @Field()
  mapSrc: string;

  @Field()
  priceListSrc: string;
}
