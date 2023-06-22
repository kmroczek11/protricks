import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AutoLoginStrategy extends PassportStrategy(Strategy, 'autoLogin') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate({ sub, email }: TokenPayload, done) {
    const user = await this.usersService.findOneById(sub);

    if (!user) {
      throw new UnauthorizedException('User from access token doesn\'t exists');
    }

    done(null, user);
  }
}
