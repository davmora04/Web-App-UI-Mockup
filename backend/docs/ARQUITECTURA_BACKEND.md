# Arquitectura del Backend - StatFut

**Autor:** David Mora  
**Proyecto:** StatFut - Sistema de Estadísticas de Fútbol  
**Tecnología:** NestJS 10.0 + MongoDB 8.0  
**Fecha:** Noviembre 2025

---

## 1. Introducción

El backend de StatFut implementa una arquitectura modular basada en el framework NestJS, siguiendo los principios de **Clean Architecture** y **Domain-Driven Design (DDD)**. El sistema gestiona información relacionada con equipos de fútbol, partidos, ligas, jugadores, usuarios y estadísticas, proporcionando una API RESTful robusta y escalable.

### 1.1 Objetivos Arquitecturales

- **Modularidad:** Separación clara de responsabilidades por dominio
- **Escalabilidad:** Diseño que permite crecimiento horizontal
- **Mantenibilidad:** Código limpio y bien documentado
- **Testabilidad:** Alta cobertura de pruebas unitarias
- **Seguridad:** Autenticación JWT y protección de rutas sensibles

### 1.2 Stack Tecnológico

| Componente | Tecnología | Versión | Justificación |
|------------|------------|---------|---------------|
| **Framework** | NestJS | 10.0 | Arquitectura modular, TypeScript nativo, DI avanzada |
| **Base de Datos** | MongoDB | 8.0 | Flexibilidad de esquemas, alto rendimiento en lecturas |
| **ODM** | Mongoose | 8.0 | Validación de esquemas, middleware hooks, queries tipados |
| **Autenticación** | JWT + Passport | 10.2 | Stateless, escalable, estándar de la industria |
| **Validación** | class-validator | 0.14 | Decoradores declarativos, integración con DTOs |
| **Documentación** | Swagger/OpenAPI | 7.1 | Generación automática, interfaz interactiva |
| **Testing** | Jest | 29.5 | Framework completo, mocking avanzado |

---

## 2. Arquitectura de Módulos

El sistema se compone de **8 módulos funcionales** organizados por dominio de negocio:

```
src/
├── app.module.ts              # Módulo raíz
├── main.ts                    # Bootstrap de la aplicación
├── common/                    # Código compartido
│   ├── decorators/           # Decoradores personalizados
│   ├── guards/               # Guards de autenticación/autorización
│   └── middleware/           # Middleware HTTP
├── teams/                    # [MÓDULO 1] Gestión de equipos
├── matches/                  # [MÓDULO 2] Gestión de partidos
├── leagues/                  # [MÓDULO 3] Gestión de ligas
├── users/                    # [MÓDULO 4] Autenticación y usuarios
├── players/                  # [MÓDULO 5] Gestión de jugadores
├── news/                     # [MÓDULO 6] Noticias deportivas
├── favorites/                # [MÓDULO 7] Sistema de favoritos
└── statistics/               # [MÓDULO 8] Estadísticas avanzadas
```

### 2.1 Patrón de Arquitectura por Módulo

Cada módulo sigue una estructura consistente basada en **capas de responsabilidad**:

```
module-name/
├── module-name.module.ts      # Configuración del módulo (imports, providers)
├── module-name.controller.ts  # Capa de presentación (HTTP endpoints)
├── module-name.service.ts     # Capa de lógica de negocio
├── module-name.service.spec.ts # Pruebas unitarias del servicio
├── schemas/                   # Definición de esquemas de base de datos
│   └── entity.schema.ts
└── dto/                       # Data Transfer Objects
    ├── create-entity.dto.ts
    └── update-entity.dto.ts
```

**Flujo de datos:**
```
Request → Controller → Service → Repository (Mongoose) → MongoDB
                ↓         ↓
              DTOs    Business Logic
```

---

## 3. Capa Común (Common Layer)

### 3.1 Middleware Personalizado

#### **LoggingMiddleware**
**Propósito:** Registro de todas las peticiones HTTP para auditoría y debugging.

**Funcionalidad:**
- Captura método HTTP, URL, IP de origen, User-Agent
- Mide tiempo de respuesta en milisegundos
- Registra código de estado y tamaño de respuesta
- Incluye `requestId` para trazabilidad

**Implementación:**
```typescript
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = req['requestId'];
    this.logger.log(`[${requestId}] ${req.method} ${req.originalUrl}`);
    
    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      this.logger.log(`[${requestId}] Response: ${res.statusCode} - ${responseTime}ms`);
    });
    next();
  }
}
```

**Aplicación:** Todas las rutas (`forRoutes('*')`) en `AppModule`.

#### **RequestIdMiddleware**
**Propósito:** Generar un identificador único por petición para trazabilidad.

**Funcionalidad:**
- Genera UUID v4 para cada request
- Adjunta `requestId` al objeto `request`
- Permite correlacionar logs y errores

---

### 3.2 Guards de Seguridad

#### **AuthGuard**
**Propósito:** Proteger rutas que requieren autenticación mediante JWT.

**Funcionalidad:**
- Extrae token JWT del header `Authorization: Bearer <token>`
- Verifica validez del token con `JwtService`
- Adjunta payload del usuario al objeto `request`
- Permite excepciones con decorador `@Public()`

**Flujo de autenticación:**
```
1. Cliente envía request con Authorization header
2. AuthGuard intercepta el request
3. Verifica si ruta es @Public() → permite acceso
4. Si no es pública, extrae y valida token JWT
5. Si token válido → adjunta user al request, continúa
6. Si token inválido → lanza UnauthorizedException
```

**Uso en controllers:**
```typescript
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  @Public() 
  @Post('login') // Ruta pública
  login(@Body() dto: LoginUserDto) {...}
  
  @Get('me') // Ruta protegida
  @ApiBearerAuth()
  getProfile(@CurrentUser('sub') userId: string) {...}
}
```

---

### 3.3 Decoradores Personalizados

#### **@RequestId()**
**Propósito:** Extraer el `requestId` del request de forma declarativa.

**Caso de uso:**
```typescript
@Get()
findAll(@RequestId() requestId: string) {
  this.logger.log(`[${requestId}] Fetching all teams`);
}
```

#### **@CurrentUser()**
**Propósito:** Extraer información del usuario autenticado desde el payload JWT.

**Caso de uso:**
```typescript
@Get('me')
getProfile(@CurrentUser('sub') userId: string) {
  return this.usersService.findOne(userId);
}
```

#### **@Public()**
**Propósito:** Marcar rutas como públicas (sin autenticación requerida).

**Implementación:**
```typescript
export const Public = () => SetMetadata('isPublic', true);
```

---

## 4. Flujo de Peticiones HTTP

### 4.1 Ciclo de Vida de una Request

```
1. Client Request
   ↓
2. RequestIdMiddleware (genera UUID)
   ↓
3. LoggingMiddleware (log entrada)
   ↓
4. AuthGuard (valida JWT si aplica)
   ↓
5. Controller (routing)
   ↓
6. ValidationPipe (valida DTOs)
   ↓
7. Service (lógica de negocio)
   ↓
8. Repository/Mongoose (consulta BD)
   ↓
9. Response (serialización)
   ↓
10. LoggingMiddleware (log salida con timing)
```

### 4.2 Manejo de Errores

**Estrategia:** Excepciones tipadas de NestJS para respuestas HTTP consistentes.

| Excepción | Código HTTP | Uso |
|-----------|-------------|-----|
| `NotFoundException` | 404 | Recurso no encontrado |
| `UnauthorizedException` | 401 | Sin autenticación válida |
| `ForbiddenException` | 403 | Sin permisos suficientes |
| `BadRequestException` | 400 | Datos de entrada inválidos |
| `ConflictException` | 409 | Conflicto (ej: email duplicado) |

**Ejemplo:**
```typescript
async findOne(id: string): Promise<Team> {
  const team = await this.teamModel.findById(id).exec();
  if (!team) {
    throw new NotFoundException(`Equipo con ID "${id}" no encontrado`);
  }
  return team;
}
```

---

## 5. Estrategia de Validación

### 5.1 ValidationPipe Global

Configuración en `main.ts`:
```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,              // Remueve propiedades no definidas en DTO
    forbidNonWhitelisted: true,   // Rechaza requests con propiedades extra
    transform: true,              // Transforma tipos automáticamente
    transformOptions: {
      enableImplicitConversion: true, // Convierte strings a números cuando sea necesario
    },
  }),
);
```

### 5.2 DTOs con class-validator

**Ventajas:**
- Validación declarativa mediante decoradores
- Mensajes de error automáticos y descriptivos
- Integración perfecta con Swagger
- Type-safety completo con TypeScript

**Ejemplo completo:**
```typescript
export class CreateTeamDto {
  @ApiProperty({ description: 'Nombre del equipo', example: 'Real Madrid' })
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'Mínimo 2 caracteres' })
  @MaxLength(100, { message: 'Máximo 100 caracteres' })
  name: string;

  @ApiPropertyOptional({ description: 'Puntos', example: 45 })
  @IsInt({ message: 'Los puntos deben ser enteros' })
  @Min(0, { message: 'Los puntos no pueden ser negativos' })
  @IsOptional()
  points?: number;
}
```

---

## 6. Integración con Frontend

### 6.1 Configuración CORS

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
});
```

**Propósito:** Permitir peticiones desde el frontend React (Vite en puerto 5173).

### 6.2 Prefijo Global de API

```typescript
app.setGlobalPrefix(process.env.API_PREFIX || 'api');
```

**Resultado:** Todas las rutas tienen prefijo `/api` (ej: `/api/teams`, `/api/matches`).

### 6.3 Endpoints Consumidos por el Frontend

| Funcionalidad Frontend | Endpoint Backend | Método | Autenticación |
|------------------------|------------------|--------|---------------|
| Tabla de posiciones | `/api/teams/standings/:leagueId` | GET | No |
| Partidos recientes | `/api/matches/recent` | GET | No |
| Login de usuario | `/api/users/login` | POST | No |
| Perfil de usuario | `/api/users/me` | GET | Sí (JWT) |
| Gestión de favoritos | `/api/favorites` | GET/POST/DELETE | Sí (JWT) |
| Búsqueda de equipos | `/api/teams/search?q=Real` | GET | No |
| Estadísticas top scorers | `/api/statistics/top-scorers` | GET | No |

---

## 7. Documentación Automática con Swagger

### 7.1 Configuración

```typescript
const config = new DocumentBuilder()
  .setTitle('StatFut API')
  .setDescription('Sistema completo de estadísticas de fútbol - Backend API')
  .setVersion('1.0')
  .addTag('teams', 'Gestión de equipos')
  .addTag('matches', 'Gestión de partidos')
  .addBearerAuth()
  .build();

SwaggerModule.setup('api/docs', app, document);
```

### 7.2 Acceso

- **URL:** `http://localhost:3001/api/docs`
- **Interfaz:** Swagger UI interactiva
- **Funcionalidad:** Probar endpoints directamente desde el navegador

### 7.3 Decoradores de Documentación

```typescript
@ApiTags('teams')
@ApiOperation({ summary: 'Obtener tabla de posiciones' })
@ApiQuery({ name: 'season', required: false })
@ApiResponse({ status: 200, description: 'Tabla de posiciones', type: [Team] })
@ApiResponse({ status: 404, description: 'Liga no encontrada' })
```

---

## 8. Estrategia de Testing

### 8.1 Pruebas Unitarias (Jest)

**Cobertura actual:** 3 suites, 13 tests

#### **Suite 1: TeamsService**
**Objetivo:** Validar lógica de negocio del módulo Teams.

**Tests:**
- ✅ `findAll()` retorna array de equipos con sorting correcto
- ✅ Filtrado por `leagueId` aplica query correctamente
- ✅ `getStandings()` ordena por puntos y diferencia de goles
- ✅ `search()` usa regex case-insensitive y limita a 10 resultados

**Técnicas:**
- Mocking de `Model<TeamDocument>` con `getModelToken`
- Simulación de queries encadenadas (`find().sort().exec()`)
- Assertions sobre llamadas a métodos (`expect().toHaveBeenCalledWith()`)

#### **Suite 2: LoggingMiddleware**
**Objetivo:** Validar registro de peticiones HTTP.

**Tests:**
- ✅ Middleware definido correctamente
- ✅ Log de request incluye método y URL
- ✅ Log de response se ejecuta en evento `finish`
- ✅ `requestId` se incluye en logs cuando está presente

#### **Suite 3: AuthGuard**
**Objetivo:** Validar protección de rutas.

**Tests:**
- ✅ Rutas marcadas con `@Public()` permiten acceso sin token
- ✅ Lanza `UnauthorizedException` cuando no hay token
- ✅ Permite acceso con token JWT válido
- ✅ Rechaza tokens inválidos o expirados
- ✅ Adjunta payload del usuario al `request`

---

## 9. Despliegue y Containerización

### 9.1 Dockerfile Multi-Stage

**Estrategia:** Build optimizado con dos etapas para reducir tamaño de imagen.

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig*.json nest-cli.json ./
RUN npm ci
COPY src ./src
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist

# Seguridad: Usuario no privilegiado
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3001/', ...)"

CMD ["node", "dist/main.js"]
```

**Ventajas:**
- Imagen final ligera (~200MB vs ~800MB sin multi-stage)
- No incluye herramientas de desarrollo
- Usuario no root (mejora seguridad)
- Healthcheck integrado

### 9.2 Docker Compose

**Servicios:**
1. **MongoDB:** Base de datos con persistencia en volumen
2. **Backend:** API NestJS conectada a MongoDB

**Características:**
- Healthcheck en MongoDB antes de iniciar backend (`depends_on: condition`)
- Variables de entorno configurables
- Red aislada (`statfut-network`)
- Reinicio automático en caso de fallo

---

## 10. Variables de Entorno

| Variable | Descripción | Valor por Defecto | Requerida |
|----------|-------------|-------------------|-----------|
| `NODE_ENV` | Entorno de ejecución | `development` | No |
| `PORT` | Puerto de la API | `3001` | No |
| `MONGODB_URI` | Connection string de MongoDB | `mongodb://localhost:27017/statfut` | Sí |
| `JWT_SECRET` | Secreto para firmar tokens JWT | - | Sí |
| `JWT_EXPIRES_IN` | Tiempo de expiración de tokens | `7d` | No |
| `FRONTEND_URL` | URL del frontend para CORS | `http://localhost:5173` | No |
| `API_PREFIX` | Prefijo global de rutas | `api` | No |

---

## 11. Mejores Prácticas Implementadas

### 11.1 Principios SOLID

- **Single Responsibility:** Cada clase tiene una única responsabilidad
- **Open/Closed:** Módulos extensibles sin modificar código existente
- **Liskov Substitution:** Interfaces bien definidas
- **Interface Segregation:** DTOs específicos por operación
- **Dependency Injection:** Todas las dependencias inyectadas

### 11.2 Clean Code

- Nombres descriptivos de variables y funciones
- Funciones pequeñas y enfocadas (<50 líneas)
- Comentarios explicativos en lógica compleja
- Consistencia en estilo de código

### 11.3 Seguridad

- ✅ Contraseñas hasheadas con `bcrypt` (10 rounds)
- ✅ Tokens JWT con expiración
- ✅ Validación de entrada en todos los endpoints
- ✅ CORS configurado para frontend específico
- ✅ Sanitización de queries (protección contra NoSQL injection)
- ✅ Usuario no privilegiado en Docker

---

## 12. Escalabilidad y Rendimiento

### 12.1 Optimizaciones de Base de Datos

**Índices implementados:**
```typescript
// Índices simples
TeamSchema.index({ leagueId: 1 });

// Índices compuestos para queries frecuentes
TeamSchema.index({ leagueId: 1, season: 1 });
TeamSchema.index({ points: -1, goalDifference: -1 });
```

**Justificación:**
- `{ leagueId: 1, season: 1 }` → Query de tabla de posiciones (muy frecuente)
- `{ points: -1, goalDifference: -1 }` → Sorting de standings (muy frecuente)

### 12.2 Estrategia de Caching (Futuro)

**Recomendaciones para producción:**
- Implementar Redis para cacheo de tablas de posiciones (TTL: 5 minutos)
- Cache de resultados de búsqueda
- Rate limiting por IP

---

## 13. Conclusiones

El backend de StatFut implementa una arquitectura sólida, escalable y mantenible, siguiendo las mejores prácticas de la industria. La separación en 8 módulos funcionales permite un desarrollo paralelo eficiente y facilita la incorporación de nuevas funcionalidades.

### 13.1 Fortalezas

✅ Arquitectura modular bien definida  
✅ Cobertura de pruebas en componentes críticos  
✅ Documentación automática con Swagger  
✅ Seguridad mediante JWT y guards  
✅ Containerización profesional con Docker  
✅ Integración completa con frontend React

### 13.2 Trabajo Futuro

- Implementar paginación en endpoints de listado
- Agregar rate limiting para prevenir abuso
- Implementar caching con Redis
- Expandir cobertura de tests (objetivo: >80%)
- Agregar logging estructurado con Winston
- Implementar CI/CD con GitHub Actions

---

**Documento Técnico:** Arquitectura Backend - StatFut  
**Framework:** NestJS 10.0 + MongoDB 8.0  
**Autor:** David Mora  
**Fecha:** Noviembre 2025
