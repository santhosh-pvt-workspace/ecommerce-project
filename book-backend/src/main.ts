import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './utils/interceptor';
import { GlobalExceptionFilter } from './utils/filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('E-Commerce project')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(
          errors.map((e) => ({
            field: e.property,
            errors: Object.values(e.constraints ?? {}),
          })),
        );
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log(`🚀 Server running at: http://localhost:${port}/api`);
  console.log(`🚀 Server running at: http://localhost:${port}/api/docs`);
}
bootstrap();
