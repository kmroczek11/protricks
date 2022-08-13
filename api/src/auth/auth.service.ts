import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { RegisterUserInput } from './inputs/register-user.input';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { FileUpload } from 'graphql-upload';
import { ChangeProfilePicInput } from './inputs/change-profile-pic.input';
import { removeFile, saveImage } from './helpers/image-storage';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: p, ...payload } = user;

    return payload;
  }

  async register(registerUserInput: RegisterUserInput) {
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

    return this.logIn(newUser);
  }

  async logIn(user: User) {
    const refreshToken = await this.tokensService.generateRefreshToken(
      user.email,
    );

    const accessToken = await this.tokensService.generateAccessToken(user.id);

    return {
      ...refreshToken,
      ...accessToken,
      user,
    };
  }

  async logOut(user: User) {
    await this.tokensService.removeRefreshToken(user.email);

    return {
      msg: 'Success',
    };
  }

  async changeEmail(changeEmailInput: ChangeEmailInput) {
    const updatedUser = await this.usersService.update(changeEmailInput.id, {
      email: changeEmailInput.email,
    });

    return this.logIn(updatedUser);
  }

  async changePassword(changePasswordInput: ChangePasswordInput) {
    const { password: oldPassword } = await this.usersService.findOneById(
      changePasswordInput.id,
      {
        select: ['password'],
      },
    );

    const valid = await bcrypt.compare(
      changePasswordInput.oldPassword,
      oldPassword,
    );

    if (!valid) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const newPassword = await bcrypt.hash(changePasswordInput.newPassword, 12);

    const updatedUser = await this.usersService.update(changePasswordInput.id, {
      password: newPassword,
    });

    return {
      user: updatedUser,
    };
  }

  async changeProfilePic(changeProfilePicInput: ChangeProfilePicInput) {
    const { userId, image } = changeProfilePicInput;

    const imageData: FileUpload = await image;

    if (!imageData) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.findOneById(userId);

    if (user.imgSrc) {
      await removeFile(user.imgSrc);
    }

    const filePath = await saveImage(imageData, 'users');

    const updatedUser = await this.usersService.update(userId, {
      imgSrc: filePath,
    });

    return {
      user: updatedUser,
    };
  }
}
