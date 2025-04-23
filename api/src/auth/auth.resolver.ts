import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LogInResponse } from './responses/logIn-response';
import { RegisterUserInput } from './inputs/register-user.input';
import { Public } from './decorators/public.decorator';
import { LogInUserInput } from './inputs/logIn-user.input';
import { LogInAuthGuard } from './guards/logIn-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AutoLogInUserInput } from './inputs/autoLogIn-user.input';
import { LogOutResponse } from './responses/logOut-response';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { LogOutUserInput } from './inputs/logOut-user.input';
import { ChangeEmailResponse } from './responses/change-email-response';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordResponse } from './responses/change-password-response';
import { ChangePasswordInput } from './inputs/change-password.input';
import { ChangeProfilePicResponse } from './responses/change-profile-pic-response';
import { ChangeProfilePicInput } from './inputs/change-profile-pic.input';
import { ForgotPasswordResponse } from './responses/forgot-password-response';
import { ForgotPasswordInput } from './inputs/forgot-password.input';
import { RefreshTokenInput } from './inputs/refresh-token.input';
import { RefreshTokenResponse } from './responses/refresh-token-response';
import { RedisService } from 'src/redis/redis.service';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor
    (
      private authService: AuthService,
      private readonly redisService: RedisService
    ) { }

  @Mutation(() => LogInResponse)
  @Public()
  registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<LogInResponse> {
    return this.authService.register(registerUserInput);
  }

  @Mutation(() => LogInResponse)
  @Public()
  @UseGuards(LogInAuthGuard)
  logInUser(
    @Args('logInUserInput') logInUserInput: LogInUserInput,
  ): Promise<LogInResponse> {
    return this.authService.logIn(logInUserInput);
  }

  @Mutation(() => LogInResponse)
  @Public()
  // @UseGuards(AutoLogInAuthGuard)
  autoLogInUser(
    @Args('autoLogInUserInput') autoLogInUserInput: AutoLogInUserInput,
  ) {
    return this.authService.autoLogIn(autoLogInUserInput);
  }

  @Mutation(() => LogOutResponse)
  @Public()
  logOutUser(
    @Args('logOutUserInput') logOutUserInput: LogOutUserInput,
  ): Promise<LogOutResponse> {
    return this.authService.logOut(logOutUserInput);
  }

  @Mutation(() => RefreshTokenResponse)
  @Public()
  refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput) {
    return this.authService.refreshToken(refreshTokenInput);
  }

  @Mutation(() => ChangeEmailResponse)
  @Roles(Role.USER)
  changeEmail(@Args('changeEmailInput') changeEmailInput: ChangeEmailInput) {
    return this.authService.changeEmail(changeEmailInput);
  }

  @Mutation(() => ChangePasswordResponse)
  @Roles(Role.USER)
  changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ) {
    return this.authService.changePassword(changePasswordInput);
  }

  @Mutation(() => ChangeProfilePicResponse)
  @Roles(Role.USER)
  changeProfilePic(
    @Args('changeProfilePicInput') changeProfilePicInput: ChangeProfilePicInput,
  ) {
    return this.authService.changeProfilePic(changeProfilePicInput);
  }

  @Mutation(() => ForgotPasswordResponse)
  @Public()
  forgotPassword(
    @Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput,
  ) {
    return this.authService.forgotPassword(forgotPasswordInput);
  }

  @Query(() => User)
  @Public()
  getUser(@Args('userId') userId: string): Promise<User | null> {
    return this.redisService.getUser(userId);
  }

  @Query(() => String)
  @Public()
  getAccessToken(@Args('userId') userId: string): Promise<string | null> {
    return this.redisService.getAccessToken(userId);
  }

  @Query(() => String)
  @Public()
  getRefreshToken(@Args('userId') userId: string): Promise<string | null> {
    return this.redisService.getRefreshToken(userId);
  }
}