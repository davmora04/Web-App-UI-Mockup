"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    });
    app.setGlobalPrefix(process.env.API_PREFIX || 'api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`\n🚀 StatFut Backend corriendo en: http://localhost:${port}`);
    console.log(`📚 Documentación Swagger: http://localhost:${port}/api/docs`);
    console.log(`🗄️  MongoDB: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/statfut'}\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map