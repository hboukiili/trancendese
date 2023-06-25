import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trencendece')
    .setDescription('the back-end API')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app as any, config);

  SwaggerModule.setup('api', app as any, document);

    app.use(cookieParser());
    app.enableCors({
      origin: process.env.FrontIp,
      credentials: true,
  });

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
