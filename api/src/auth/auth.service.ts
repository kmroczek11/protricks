import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterResponse } from './dto/register-response';
import { ChangeEmailInput } from './dto/change-email.input';
import { ChangePasswordInput } from './dto/change-password.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email, {
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'imgSrc',
        'password',
        'roles',
      ],
    });

    if (!user) {
      throw new HttpException('User doesn\'t exist', HttpStatus.BAD_REQUEST);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
    }

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(
    registerUserInput: RegisterUserInput,
  ): Promise<RegisterResponse> {
    const user = await this.usersService.findOneByEmail(
      registerUserInput.email,
    );

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const password = await bcrypt.hash(registerUserInput.password, 12);

    const newUser = await this.usersService.createUser({
      ...registerUserInput,
      password,
    });

    return {
      token: this.jwtService.sign({ user: registerUserInput }),
      user: newUser,
    };
  }

  async login(user: User) {
    const { password, ...payload } = user;

    return {
      token: this.jwtService.sign({ user: payload }),
      user: payload,
    };
  }

  async getJwtUser(jwt: string): Promise<any> {
    const { user } = await this.jwtService.verify(jwt);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async changeEmail(changeEmailInput: ChangeEmailInput) {
    this.usersService.update(changeEmailInput.id, {
      email: changeEmailInput.email,
    });

    return { msg: 'success' };
  }

  async changePassword(changePasswordInput: ChangePasswordInput) {
    const { password } = await this.usersService.findOneById(
      changePasswordInput.id,
      {
        select: ['password'],
      },
    );

    const oldPassword = await bcrypt.hash(changePasswordInput.oldPassword, 12);

    console.log(
      password,
      oldPassword,
      changePasswordInput.oldPassword,
      changePasswordInput.newPassword,
    );

    const valid = await bcrypt.compare(password, oldPassword);

    if (!valid) {
      throw new HttpException('invalid_password.', HttpStatus.BAD_REQUEST);
    }

    const newPassword = await bcrypt.hash(changePasswordInput.newPassword, 12);

    this.usersService.update(changePasswordInput.id, { password: newPassword });

    return { msg: 'success' };
  }
}
