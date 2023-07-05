import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import getMongoUrl from './utils/get-mongo-url';

async function bootstrap() {
  console.log('Start Running App ');
  // console.log(getMongoUrl());

  const app = await NestFactory.create(AppModule, {
    cors: true,
    abortOnError: true,
  });

  // Apply prefix for all routes
  app.setGlobalPrefix('/api');
  // Versioning
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('DC8 API Documentation')
    .setDescription('The DC8 API description')
    .setVersion('1.0')
    .addTag('DC8')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);

  console.log(
    `Open http://localhost:${process.env.API_PORT}/document to see the documentation`,
  );

  await app.listen(process.env.API_PORT);
}

bootstrap();
