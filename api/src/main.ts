import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true
  });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(process.env.APP_PORT, () =>
    console.log(`🚀 Server is listening on ${process.env.APP_PORT}`),
  );
}
bootstrap();
