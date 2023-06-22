import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class LogInResponse {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}
