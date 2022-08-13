import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class ChangeProfilePicResponse {
  @Field()
  expiresIn: string;

  @Field()
  accessToken: string;

  @Field()
  user: User;
}
