import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ChangeEmailResponse } from './responses/change-email-response';
import { LogInResponse } from './responses/logIn-response';
import { ChangeEmailInput } from './inputs/change-email.input';
import { RegisterUserInput } from './inputs/register-user.input';
import { ChangePasswordResponse } from './responses/change-password-response';
import { ChangePasswordInput } from './inputs/change-password.input';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { ChangeProfilePicResponse } from './responses/change-profile-pic-response';
import { ChangeProfilePicInput } from './inputs/change-profile-pic.input';
import { LogOutResponse } from './responses/logOut-response';
import { LogInUserInput } from './inputs/logIn-user.input';
import { LogInAuthGuard } from './guards/logIn-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AutoLogInGuard } from './guards/autoLogIn-auth.guard';
import { AutoLogInUserInput } from './inputs/autoLogIn-user.input';
import { CurrentUser } from './decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ForgotPasswordInput } from './inputs/forgot-password.input';
import { ForgotPasswordResponse } from './responses/forgot-password-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LogInResponse)
  @Public()
  registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<LogInResponse> {
    return this.authService.register(registerUserInput);
  }

  @Mutation(() => LogInResponse)
  @UseGuards(LogInAuthGuard)
  @Public()
  logInUser(
    @Args('logInUserInput') logInUserInput: LogInUserInput,
    @Context() context,
  ) {
    return this.authService.logIn(context.user);
  }

  @Mutation(() => LogInResponse)
  @Public()
  @UseGuards(AutoLogInGuard)
  autoLogInUser(
    @Args('autoLogInUserInput') autoLogInUserInput: AutoLogInUserInput,
    @CurrentUser() user: User,
  ) {
    return this.authService.logIn(user);
  }

  @Mutation(() => LogOutResponse)
  @Roles(Role.USER)
  logOutUser(@CurrentUser() user: User): Promise<LogOutResponse> {
    return this.authService.logOut(user);
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
}
