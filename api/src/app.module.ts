import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExercisesModule } from './exercises/exercises.module';
import { CoachesModule } from './coaches/coaches.module';
import { TraineesModule } from './trainees/trainees.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './core/all-exceptions.filter';
import * as Joi from 'joi';
import { RolesGuard } from './auth/guards/roles.guard';
import { GqlAuthGuard } from './auth/guards/gql-auth.guard';
import { TokensModule } from './tokens/tokens.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        process.env.NODE_ENV === 'development'
          ? 'src/schema.gql'
          : 'dist/schema.gql',
      ),
      uploads: false,
      // formatError: (error: GraphQLError) => {
      //   const graphQLFormattedError: GraphQLFormattedError = {
      //     message: error?.extensions?.exception?.response?.message || error?.message,
      //   };
      //   return graphQLFormattedError;
      // },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required().default(5000),
        APP_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required().default(5432),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.number().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.number().required(),
        MAIL_PORT: Joi.number().required().default(465),
        MAIL_HOST: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: parseInt(<string>process.env.POSTGRES_PORT),

      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      //synchronize: process.env.NODE_ENV === 'development' ? true : false, // shouldn't be used in production - may lose data
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    CitiesModule,
    GroupsModule,
    AuthModule,
    UsersModule,
    CoachesModule,
    ExercisesModule,
    TraineesModule,
    ConfigModule,
    TokensModule,
    MailModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
