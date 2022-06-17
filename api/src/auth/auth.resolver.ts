import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { ChangeEmailResponse } from './dto/change-email-response';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { ChangeEmailInput } from './dto/change-email.input';
import { RegisterResponse } from './dto/register-response';
import { RegisterUserInput } from './dto/register-user.input';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ChangePasswordResponse } from './dto/change-password-response';
import { ChangePasswordInput } from './dto/change-password.input';
import { Public } from './guards/public.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  @Public()
  registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<RegisterResponse> {
    return this.authService.register(registerUserInput);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  @Public()
  loginUser(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Query(() => User)
  getJwtUser(@Args('jwt') jwt: string): Promise<any> {
    return this.authService.getJwtUser(jwt);
  }

  @Mutation(() => ChangeEmailResponse)
  changeEmail(
    @Args('changeEmailInput') changeEmailInput: ChangeEmailInput,
  ): Promise<ChangeEmailResponse> {
    return this.authService.changeEmail(changeEmailInput);
  }

  @Mutation(() => ChangePasswordResponse)
  @Public()
  changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ): Promise<ChangePasswordResponse> {
    return this.authService.changePassword(changePasswordInput);
  }
}
