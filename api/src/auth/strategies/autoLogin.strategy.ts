import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AutoLoginStrategy extends PassportStrategy(Strategy, 'autoLogin') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
    });
  }

  async validate({ iat, exp, email }: TokenPayload, done) {
    const timeDiff = exp - iat;

    if (timeDiff <= 0) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User from refresh token doesn\'t exists');
    }

    done(null, user);
  }
}
