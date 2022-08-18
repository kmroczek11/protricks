import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class RefreshTokenResponse {
  @Field()
  expiresIn: number;

  @Field()
  accessToken: string;
}
