import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { Upload } from 'src/auth/helpers/upload.scalar';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginStrategy } from './strategies/login.strategy';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AutoLoginStrategy } from './strategies/autoLogin.strategy';

dotenv.config();

@Module({
  imports: [UsersModule, PassportModule, Upload, MailModule, JwtModule.register({
    secret: process.env.ACCESS_TOKEN_SECRET,
    signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
  }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LoginStrategy,
    AutoLoginStrategy,
    JwtStrategy,
  ],
})
export class AuthModule { }
