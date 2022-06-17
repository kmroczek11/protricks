import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class ChangeProfilePicResponse {
  @Field()
  token: string;

  @Field()
  user: User;
}
