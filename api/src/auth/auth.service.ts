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
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';
import { LogInUserInput } from './inputs/log-in-user.input';
import { RefreshTokenInput } from './inputs/refresh-token.input';
import { LogOutUserInput } from './inputs/log-out-user.input';
import { AutoLogInUserInput } from './inputs/auto-log-in-user.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
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

  async logIn(logInUserInput: LogInUserInput) {
    const user = await this.usersService.findOneByEmail(logInUserInput.email)

    return this.sign(user)
  }

  async sign(user: User) {
    const payload = { sub: user.id, email: user.email }

    const accessTokenSecret = this.configService.get<string>('accessTokenSecret')
    const accessTokenExpiration = this.configService.get<string>('accessTokenExpiration')
    const refreshTokenSecret = this.configService.get<string>('refreshTokenSecret')
    const refreshTokenExpiration = this.configService.get<string>('refreshTokenExpiration')

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessTokenSecret,
      expiresIn: accessTokenExpiration,
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpiration,
    })

    await this.redisService.saveAccessToken(user.id, accessToken)

    await this.redisService.saveRefreshToken(user.id, refreshToken)

    await this.redisService.saveUser(user.id, user)

    return {
      userId: user.id
    }
  }

  async refreshToken(refreshTokenInput: RefreshTokenInput) {
    const { refreshToken } = refreshTokenInput

    const refreshTokenSecret = this.configService.get<string>('refreshTokenSecret')

    const decodedToken = this.jwtService.verify(refreshToken, {
      secret: refreshTokenSecret,
    })

    const user = await this.redisService.getUser(decodedToken.sub)

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const accessTokenSecret = this.configService.get<string>('accessTokenSecret')
    const accessTokenExpiration = this.configService.get<string>('accessTokenExpiration')

    const newAccessToken = await this.jwtService.signAsync(
      {
        sub: decodedToken.sub,
        email: decodedToken.email
      },
      {
        secret: accessTokenSecret,
        expiresIn: accessTokenExpiration
      }
    )

    await this.redisService.saveAccessToken(decodedToken.sub, newAccessToken)

    return {
      accessToken: newAccessToken,
    }
  }

  async autoLogIn(autoLogInUserInput: AutoLogInUserInput) {
    const user = await this.usersService.findOneById(autoLogInUserInput.userId)

    return this.sign(user)
  }

  async logOut(logOutUserInput: LogOutUserInput) {
    const { userId } = logOutUserInput

    await this.redisService.removeUser(userId)

    await this.redisService.removeAccessToken(userId)

    await this.redisService.removeRefreshToken(userId)

    return {
      msg: 'Success',
    }
  }

  async changeEmail(changeEmailInput: ChangeEmailInput) {
    const updatedUser = await this.usersService.updateById(
      changeEmailInput.id,
      {
        email: changeEmailInput.email,
      },
    );

    return this.sign(updatedUser)
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

    return this.sign(updatedUser)
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

    return this.sign(updatedUser)
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
