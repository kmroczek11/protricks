import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class DeleteTraineeResponse {
  @Field({ nullable: true })
  user?: User;
}
