import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LogInStrategy } from './strategies/logIn.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AutoLoginStrategy } from './strategies/autoLogin.strategy';
import { UsersModule } from 'src/users/users.module';
import { RedisModule } from 'src/redis/redis.module';
import { MailModule } from 'src/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { Upload } from 'src/auth/helpers/upload.scalar';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    RedisModule,
    JwtModule.register({}),
    Upload,
    MailModule,
    ConfigModule
  ],
  providers: [
    AuthService,
    AuthResolver,
    LogInStrategy,
    AutoLoginStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule { }