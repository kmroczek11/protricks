import { Field, InputType, Int } from '@nestjs/graphql';
import { Role } from '../../users/entities/role.enum';

@InputType()
export class RegisterUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  emailPlain: string;

  @Field()
  password: string;

  @Field(() => [Role], { nullable: true })
  roles?: Role[];
}
