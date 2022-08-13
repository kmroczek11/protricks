import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenInput } from './dto/refresh-token.input';

@Injectable()
export class TokensService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async generateRefreshToken(email: string) {
    const refreshToken = await this.jwtService.sign(
      {
        email: email,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      },
    );

    await this.setCurrentRefreshToken(refreshToken, email);

    return {
      refreshToken: refreshToken,
    };
  }

  async generateAccessToken(userId: string) {
    return {
      expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRATION),
      accessToken: this.jwtService.sign(
        { id: userId },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        },
      ),
    };
  }

  async createAccessTokenFromRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.decode(refreshToken) as TokenPayload;

      if (!decoded) {
        throw new Error("Couldn't decode provided token");
      }

      const user = await this.usersService.findOneByEmail(decoded.email);

      if (!user) {
        throw new HttpException(
          'User with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }

      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );

      if (!isRefreshTokenMatching) {
        throw new UnauthorizedException('Invalid token');
      }

      await this.jwtService.verifyAsync(
        refreshToken,
        this.getRefreshTokenOptions(),
      );

      return this.generateAccessToken(user.id);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  getRefreshTokenOptions(): JwtSignOptions {
    return this.getTokenOptions();
  }

  getTokenOptions() {
    const options: JwtSignOptions = {
      secret: process.env.REFRESH_TOKEN_SECRET,
    };

    const expiration: string = process.env.REFRESH_TOKEN_EXPIRATION;

    if (expiration) {
      options.expiresIn = expiration;
    }

    return options;
  }

  async setCurrentRefreshToken(refreshToken: string, email: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    return await this.usersService.update(
      { email },
      {
        refreshToken: currentHashedRefreshToken,
      },
    );
  }

  async refreshToken(refreshTokenInput: RefreshTokenInput) {
    return this.createAccessTokenFromRefreshToken(
      refreshTokenInput.refreshToken,
    );
  }

  async removeRefreshToken(email: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.usersService.update(
      { email },
      {
        refreshToken: null,
      },
    );
  }
}
