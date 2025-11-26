# StatFut Backend API

Backend completo desarrollado con **NestJS + MongoDB** para el sistema de estadísticas de fútbol StatFut.

## 📋 Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Arquitectura de Módulos](#arquitectura-de-módulos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Docker](#docker)
- [Documentación API](#documentación-api)
- [Testing](#testing)
- [Endpoints](#endpoints)
- [Integración con Frontend](#integración-con-frontend)

## 🚀 Tecnologías

- **Framework**: NestJS 10.0
- **Base de Datos**: MongoDB 8.0 + Mongoose
- **Autenticación**: JWT (JSON Web Tokens) + bcrypt
- **Validación**: class-validator + class-transformer
- **Documentación**: Swagger/OpenAPI
- **Testing**: Jest
- **TypeScript**: 5.1.3
- **Containerización**: Docker + Docker Compose

## 🏗️ Arquitectura de Módulos

El backend está organizado en **8 módulos** independientes y escalables:

### 1. **Teams** (Equipos)
**Propósito**: Gestión completa de equipos de fútbol  
**Entidades**: Equipo con estadísticas de temporada  
**Rutas principales**:
- `GET /api/teams` - Listar equipos (filtrable por liga/temporada)
- `GET /api/teams/standings/:leagueId` - Tabla de posiciones
- `GET /api/teams/search?q=query` - Búsqueda por nombre
- `POST /api/teams` - Crear equipo
- `PATCH /api/teams/:id` - Actualizar equipo

**Problema que resuelve**: Centraliza información de equipos y sus estadísticas en una temporada.

---

### 2. **Matches** (Partidos)
**Propósito**: Gestión de partidos pasados, presentes y futuros  
**Entidades**: Partido con equipos, fecha, resultado y estado  
**Rutas principales**:
- `GET /api/matches/upcoming` - Próximos partidos
- `GET /api/matches/live` - Partidos en vivo
- `GET /api/matches/recent` - Partidos recientes
- `GET /api/matches/team/:teamId` - Historial de un equipo
- `POST /api/matches` - Crear partido

**Problema que resuelve**: Calendario y resultados de partidos con diferentes estados.

---

### 3. **Leagues** (Ligas)
**Propósito**: Gestión de competiciones deportivas  
**Entidades**: Liga con país, temporada y jornadas  
**Rutas principales**:
- `GET /api/leagues` - Listar ligas
- `GET /api/leagues/:leagueId` - Detalle de liga
- `POST /api/leagues` - Crear liga

**Problema que resuelve**: Organiza competiciones y sus temporadas.

---

### 4. **Users** (Usuarios)
**Propósito**: Gestión de usuarios y autenticación con JWT  
**Entidades**: Usuario con rol, perfil y equipo favorito  
**Rutas principales**:
- `POST /api/users/register` - Registro de usuario
- `POST /api/users/login` - Login (retorna JWT)
- `GET /api/users/me` - Perfil actual (protegido)
- `PATCH /api/users/:id` - Actualizar perfil

**Problema que resuelve**: Autenticación segura y gestión de perfiles.

---

### 5. **Players** (Jugadores)
**Propósito**: Gestión de jugadores con características detalladas  
**Entidades**: Jugador con posición, equipo, nacionalidad, etc.  
**Rutas principales**:
- `GET /api/players` - Listar jugadores
- `GET /api/players/team/:teamId` - Plantilla de un equipo
- `GET /api/players/search?q=query` - Buscar jugadores
- `POST /api/players` - Crear jugador

**Problema que resuelve**: Almacena información detallada de jugadores.

---

### 6. **News** (Noticias)
**Propósito**: Gestión de contenido editorial deportivo  
**Entidades**: Noticia con categoría, tags, equipos relacionados  
**Rutas principales**:
- `GET /api/news` - Listar noticias (paginado)
- `GET /api/news/featured` - Noticias destacadas
- `GET /api/news/:slug` - Detalle de noticia
- `GET /api/news/team/:teamId` - Noticias de un equipo
- `POST /api/news` - Crear noticia

**Problema que resuelve**: Publicación y organización de contenido informativo.

---

### 7. **Favorites** (Favoritos)
**Propósito**: Gestión de equipos y jugadores favoritos por usuario  
**Entidades**: Favoritos vinculados a un usuario  
**Rutas principales**:
- `GET /api/favorites/me` - Mis favoritos (protegido)
- `POST /api/favorites/teams/:teamId` - Agregar equipo
- `DELETE /api/favorites/teams/:teamId` - Quitar equipo
- `POST /api/favorites/players/:playerId` - Agregar jugador

**Problema que resuelve**: Personalización de la experiencia del usuario.

---

### 8. **Statistics** (Estadísticas)
**Propósito**: Estadísticas detalladas de jugadores  
**Entidades**: Estadísticas por jugador, temporada y liga  
**Rutas principales**:
- `GET /api/statistics/player/:playerId` - Stats de jugador
- `GET /api/statistics/team/:teamId` - Stats del equipo
- `GET /api/statistics/top-scorers` - Máximos goleadores
- `GET /api/statistics/top-assisters` - Máximos asistidores
- `POST /api/statistics` - Crear estadística

**Problema que resuelve**: Análisis de rendimiento y comparativas.

---

## 📦 Instalación

```bash
# Clonar el repositorio
cd backend

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env
```

## ⚙️ Configuración

Editar el archivo `.env`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/statfut

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend CORS
FRONTEND_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# API Configuration
API_PREFIX=api
```

## 🏃 Ejecución

### Modo Desarrollo
```bash
npm run start:dev
```

### Modo Producción
```bash
npm run build
npm run start:prod
```

### Ejecutar Tests
```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests en modo watch
npm run test:watch
```

## 🐳 Docker

### Construcción y Ejecución con Docker Compose

```bash
# Iniciar todos los servicios (Backend + MongoDB)
docker-compose up --build

# Iniciar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener servicios
docker-compose down

# Eliminar volúmenes (⚠️ borra datos)
docker-compose down -v
```

### Construcción Manual

```bash
# Construir imagen
docker build -t statfut-backend .

# Ejecutar contenedor
docker run -p 3001:3001 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/statfut \
  -e JWT_SECRET=your-secret-key \
  statfut-backend
```

## 📚 Documentación API

Una vez iniciado el servidor, visitar:

- **Swagger UI**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/
- **API Info**: http://localhost:3001/info

## 🧪 Testing

El proyecto incluye tests unitarios completos:

### Suites de Tests Implementadas

1. **TeamsService.spec.ts** - 5 tests
   - Validación de CRUD de equipos
   - Filtrado por liga y temporada
   - Búsqueda y tabla de posiciones

2. **AuthGuard.spec.ts** - 5 tests
   - Validación de tokens JWT
   - Rutas públicas vs protegidas
   - Manejo de errores de autenticación

3. **LoggingMiddleware.spec.ts** - 4 tests
   - Logging de requests/responses
   - Inclusión de requestId
   - Medición de tiempos de respuesta

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Cobertura
npm run test:cov

# Watch mode
npm run test:watch
```

## 🔗 Integración con Frontend

### CORS Configurado

El backend acepta peticiones desde:
- `http://localhost:5173` (Vite dev server)
- Configurable vía `FRONTEND_URL` en `.env`

### Headers Importantes

```typescript
// El backend incluye automáticamente:
{
  "x-request-id": "uuid-generado",
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Credentials": "true"
}
```

### Autenticación JWT

```typescript
// 1. Login
POST /api/users/login
Body: { email, password }
Response: { user, token }

// 2. Usar token en requests protegidos
Headers: {
  "Authorization": "Bearer <token>"
}

// 3. Rutas protegidas con @UseGuards(AuthGuard)
GET /api/users/me
GET /api/favorites/me
```

## 🛡️ Middleware y Guards

### Middleware Personalizados

1. **RequestIdMiddleware**: Asigna UUID único a cada petición
2. **LoggingMiddleware**: Registra requests/responses con tiempos

### Guards Personalizados

1. **AuthGuard**: Protege rutas que requieren autenticación JWT
   - Verifica token Bearer
   - Adjunta usuario a `request.user`
   - Soporte para rutas públicas con `@Public()`

### Decoradores Personalizados

1. **@RequestId()**: Extrae el requestId del request
2. **@CurrentUser()**: Extrae el usuario autenticado
3. **@Public()**: Marca rutas como públicas (sin auth)

## 📂 Estructura del Proyecto

```
backend/
├── src/
│   ├── common/               # Utilidades compartidas
│   │   ├── decorators/       # Decoradores personalizados
│   │   ├── guards/           # Guards (AuthGuard)
│   │   └── middleware/       # Middleware personalizados
│   ├── teams/                # Módulo Teams
│   │   ├── dto/              # DTOs con validaciones
│   │   ├── schemas/          # Schemas Mongoose
│   │   ├── teams.controller.ts
│   │   ├── teams.service.ts
│   │   ├── teams.module.ts
│   │   └── teams.service.spec.ts
│   ├── matches/              # Módulo Matches
│   ├── leagues/              # Módulo Leagues
│   ├── users/                # Módulo Users (Auth + JWT)
│   ├── players/              # Módulo Players
│   ├── news/                 # Módulo News
│   ├── favorites/            # Módulo Favorites
│   ├── statistics/           # Módulo Statistics
│   ├── app.module.ts         # Módulo principal
│   └── main.ts               # Bootstrap
├── test/                     # Tests e2e
├── Dockerfile                # Configuración Docker
├── docker-compose.yml        # Orquestación servicios
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Modelo de Datos

### Relaciones entre Entidades

```
User ──┬── favoriteTeamId ───> Team
       └── Favorite ──┬── favoriteTeams[] ───> Team[]
                      └── favoritePlayers[] ───> Player[]

League ──> Teams[] (via leagueId)
       └── Matches[] (via leagueId)

Team ──> Players[] (via teamId)
     └── Statistics[] (via teamId)

Match ──┬── homeTeamId ───> Team
        └── awayTeamId ───> Team

Player ──┬── teamId ───> Team
         └── Statistics[] (via playerId)

News ──┬── relatedTeamIds[] ───> Team[]
       └── relatedMatchId ───> Match
```

## 📊 Validación con DTOs

Todos los endpoints POST/PATCH usan DTOs con `class-validator`:

```typescript
export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsInt()
  @Min(0)
  points: number;

  // ... más validaciones
}
```

El `ValidationPipe` global valida automáticamente y rechaza datos inválidos.

## 📈 Escalabilidad

- **Índices MongoDB**: Optimizados para consultas frecuentes
- **Paginación**: Implementada en endpoints de listado
- **Relaciones**: Uso eficiente de `populate` de Mongoose
- **Caching**: Preparado para Redis (extensión futura)

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar funcionalidad X'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto es privado y de uso académico.

## 👥 Autores

Equipo StatFut - Proyecto Backend NestJS 2024

---

## 📞 Soporte

- **Swagger Docs**: http://localhost:3001/api/docs
- **Health**: http://localhost:3001/
- **Issues**: GitHub Issues

---

**✅ Backend completamente funcional y listo para integración con frontend**
