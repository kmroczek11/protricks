import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChangeProfilePicResponse } from './dto/change-profile-pic-response';
import { ChangeProfilePicInput } from './dto/change-profile-pic.input';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  findOne(@Args('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Mutation(() => ChangeProfilePicResponse)
  changeProfilePic(
    @Args('changeProfilePicInput') changeProfilePicInput: ChangeProfilePicInput,
  ) {
    return this.usersService.changeProfilePic(changeProfilePicInput);
  }
}
