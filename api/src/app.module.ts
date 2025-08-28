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
import { MailModule } from './mail/mail.module';
import {
  GraphQLError,
  GraphQLFormattedError,
} from 'graphql/error/GraphQLError';
import { AttendancesModule } from './attendances/attendances.module';
import { PaymentsModule } from './payments/payments.module';
import { LostTraineesModule } from './lost_trainees/lost_trainees.module';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/configuration'

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
      playground: true,
      uploads: false,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.extensions?.exception?.code || error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      //synchronize: process.env.NODE_ENV === 'development' ? true : false, // shouldn't be used in production - may lose data
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CitiesModule,
    GroupsModule,
    AuthModule,
    UsersModule,
    CoachesModule,
    ExercisesModule,
    TraineesModule,
    MailModule,
    AttendancesModule,
    PaymentsModule,
    LostTraineesModule,
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
export class AppModule { }
