import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenResponse {
  @Field()
  expiresIn: number;

  @Field()
  accessToken: string;
}
