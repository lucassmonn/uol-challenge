import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from '@shared/interceptors/log.interceptor';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(app.get(LoggingInterceptor));
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['POST'],
    allowedHeaders: '*',
    credentials: true,
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
