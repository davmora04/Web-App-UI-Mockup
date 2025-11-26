# StatFut Backend

Backend NestJS + MongoDB para sistema de estadísticas de fútbol.

## Tecnologías

- NestJS 10.0
- MongoDB 8.0 + Mongoose
- JWT + bcrypt
- class-validator
- Swagger/OpenAPI
- Jest
- TypeScript 5.1.3
- Docker
x
## Módulos

1. **Teams** - Gestión de equipos
2. **Matches** - Gestión de partidos
3. **Leagues** - Gestión de ligas
4. **Users** - Autenticación JWT
5. **Players** - Gestión de jugadores
6. **News** - Noticias deportivas
7. **Favorites** - Favoritos por usuario
8. **Statistics** - Estadísticas de jugadores

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/statfut
PORT=3001
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

## Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Tests
npm run test

# Poblar datos
npm run seed
```

## Docker

```bash
docker-compose up --build
```

## API

Documentación Swagger: `http://localhost:3001/api/docs`

## Endpoints Principales

### Teams
- `GET /api/teams`
- `GET /api/teams/standings/:leagueId`
- `POST /api/teams`

### Matches
- `GET /api/matches`
- `GET /api/matches/upcoming`
- `GET /api/matches/live`

### Users
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/me`

### Players
- `GET /api/players`
- `GET /api/players/team/:teamId`

### News
- `GET /api/news`
- `GET /api/news/featured`

### Statistics
- `GET /api/statistics/top-scorers?leagueId=laliga&season=2024-2025`
- `GET /api/statistics/top-assisters?leagueId=laliga&season=2024-2025`
