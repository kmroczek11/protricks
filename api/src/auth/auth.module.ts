import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { Upload } from 'src/auth/helpers/upload.scalar';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginStrategy } from './strategies/login.strategy';
import { AutoLoginStrategy } from './strategies/autoLogin.strategy';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [UsersModule, PassportModule, Upload, TokensModule],
  providers: [
    AuthService,
    AuthResolver,
    LoginStrategy,
    AutoLoginStrategy,
    JwtStrategy
  ],
})
export class AuthModule {}
