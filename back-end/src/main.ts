import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trencendece')
    .setDescription('the back-end API')
    .setVersion('1.0')
    .addTag('back-end')
    .build();

  const document = SwaggerModule.createDocument(app as any, config);

  SwaggerModule.setup('api', app as any, document);

    app.use(cookieParser());
    app.enableCors({
      origin : 'http://localhost',
      credentials: true,
  });

  await app.listen(process.env.UPORT, '0.0.0.0');
}

bootstrap();
