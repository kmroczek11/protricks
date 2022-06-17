import { Field, InputType, Int } from '@nestjs/graphql';
import { Role } from '../entities/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [Role], { nullable: true })
  roles?: Role[];
}
