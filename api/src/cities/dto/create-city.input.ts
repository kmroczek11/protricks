import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCityInput {
  @Field()
  name: string;

  @Field()
  room: string;

  @Field()
  citySrc: string;

  @Field()
  roomSrc: string;

  @Field()
  mapSrc: string;

  @Field()
  priceListSrc: string;
}
