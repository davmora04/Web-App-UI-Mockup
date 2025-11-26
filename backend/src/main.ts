import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  // Global API prefix
  app.setGlobalPrefix(process.env.API_PREFIX || 'api');

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('StatFut API')
    .setDescription('Sistema completo de estadísticas de fútbol - Backend API')
    .setVersion('1.0')
    .addTag('teams', 'Gestión de equipos')
    .addTag('matches', 'Gestión de partidos')
    .addTag('leagues', 'Gestión de ligas')
    .addTag('players', 'Gestión de jugadores')
    .addTag('users', 'Gestión de usuarios')
    .addTag('news', 'Gestión de noticias')
    .addTag('favorites', 'Gestión de favoritos')
    .addTag('statistics', 'Estadísticas detalladas')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`\n🚀 StatFut Backend corriendo en: http://localhost:${port}`);
  console.log(`📚 Documentación Swagger: http://localhost:${port}/api/docs`);
  console.log(`🗄️  MongoDB: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/statfut'}\n`);
}

bootstrap();
