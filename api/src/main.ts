import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(process.env.APP_PORT, () =>
    console.log(`🚀 Server is listening on ${process.env.APP_PORT}`),
  );
}
bootstrap();
