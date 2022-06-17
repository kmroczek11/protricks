import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class RegisterResponse {
  @Field()
  token: string;

  @Field()
  user: User;
}
