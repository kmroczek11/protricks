import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class CreateTraineeResponse {
  @Field()
  token: string;

  @Field()
  user: User;
}