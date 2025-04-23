import { Inject, Injectable } from '@nestjs/common';
import { RedisPrefixEnum } from './enums/redis-prefix-enum';
import { RedisRepository } from './redis.repository';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
    constructor(
        @Inject(RedisRepository)
        private readonly redisRepository: RedisRepository,
        private readonly configService: ConfigService
    ) { }

    async saveUser(userId: string, user: User): Promise<void> {
        await this.redisRepository.setWithExpiry(
            RedisPrefixEnum.USER,
            userId,
            JSON.stringify(user),
            this.configService.get('accessTokenExpiration'),
        );
    }

    async getUser(userId: string): Promise<User | null> {
        const user = await this.redisRepository.get(RedisPrefixEnum.USER, userId);
        const parsedUser = JSON.parse(user)
        delete parsedUser.password

        return parsedUser;
    }

    async saveAccessToken(userId: string, token: string): Promise<void> {
        await this.redisRepository.setWithExpiry(
            RedisPrefixEnum.ACCESS_TOKEN,
            userId,
            token,
            this.configService.get('accessTokenExpiration'),
        );
    }

    async saveRefreshToken(userId: string, token: string): Promise<void> {
        await this.redisRepository.setWithExpiry(
            RedisPrefixEnum.REFRESH_TOKEN,
            userId,
            token,
            this.configService.get('refreshTokenExpiration'),
        );
    }

    async getAccessToken(token: string): Promise<string | null> {
        return await this.redisRepository.get(RedisPrefixEnum.ACCESS_TOKEN, token);
    }

    async getRefreshToken(token: string): Promise<string | null> {
        return await this.redisRepository.get(RedisPrefixEnum.REFRESH_TOKEN, token);
    }

    async removeUser(userId: string): Promise<void> {
        await this.redisRepository.delete(RedisPrefixEnum.USER, userId);
    }

    async removeAccessToken(userId: string): Promise<void> {
        return await this.redisRepository.delete(RedisPrefixEnum.ACCESS_TOKEN, userId);
    }

    async removeRefreshToken(userId: string): Promise<void> {
        return await this.redisRepository.delete(RedisPrefixEnum.REFRESH_TOKEN, userId);
    }
}