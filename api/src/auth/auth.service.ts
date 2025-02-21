import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { RegisterUserInput } from './inputs/register-user.input';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { FileUpload } from 'graphql-upload';
import { ChangeProfilePicInput } from './inputs/change-profile-pic.input';
import { removeFile, saveImage } from './helpers/image-storage';
import { ForgotPasswordInput } from './inputs/forgot-password.input';
import { MailService } from 'src/mail/mail.service';
import * as generator from 'generate-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) { }

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
    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user
    };
  }

  async logOut(user: User) {
    return {
      msg: 'Success',
    };
  }

  async changeEmail(changeEmailInput: ChangeEmailInput) {
    const updatedUser = await this.usersService.updateById(
      changeEmailInput.id,
      {
        email: changeEmailInput.email,
      },
    );

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

    const updatedUser = await this.usersService.updateById(
      changePasswordInput.id,
      {
        password: newPassword,
      },
    );

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

    const updatedUser = await this.usersService.updateById(userId, {
      imgSrc: filePath,
    });

    return {
      user: updatedUser,
    };
  }

  async forgotPassword(forgotPasswordInput: ForgotPasswordInput) {
    const { email } = forgotPasswordInput;

    const generatedPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    const password = await bcrypt.hash(generatedPassword, 12);

    await this.usersService.updateByEmail(email, { password });

    await this.mailService.sendForgotPassword(email, generatedPassword);

    return {
      msg: 'Success',
    };
  }
}
