# StatFut Backend API

**Autor:** David Mora  
**Proyecto:** Sistema de Estadísticas de Fútbol  
**Tecnología:** NestJS 10.0 + MongoDB 8.0 + TypeScript 5.1.3

Backend profesional desarrollado con arquitectura modular, siguiendo principios de Clean Code y Domain-Driven Design.

---

## 📋 Tabla de Contenidos

1. [Características](#-características)
2. [Tecnologías](#-tecnologías)
3. [Arquitectura de Módulos](#-arquitectura-de-módulos)
4. [Instalación](#-instalación)
5. [Configuración](#-configuración)
6. [Ejecución](#-ejecución)
7. [Docker](#-docker)
8. [API Documentation](#-api-documentation)
9. [Testing](#-testing)
10. [Integración con Frontend](#-integración-con-frontend)
11. [Documentación Técnica](#-documentación-técnica)

---

## ✨ Características

- ✅ **8 módulos funcionales** completamente implementados
- ✅ **Autenticación JWT** con bcrypt para passwords
- ✅ **Validación robusta** con class-validator y DTOs
- ✅ **Documentación automática** con Swagger/OpenAPI
- ✅ **Middleware personalizado** (Logging, RequestId)
- ✅ **Guards de seguridad** (AuthGuard con JWT)
- ✅ **Decoradores custom** (@RequestId, @CurrentUser, @Public)
- ✅ **Testing** con Jest (3 suites, 13 tests)
- ✅ **Base de datos optimizada** con índices compuestos
- ✅ **Docker** con multi-stage build
- ✅ **CORS** configurado para frontend React

---

## 🛠️ Tecnologías

| Componente | Tecnología | Versión | Propósito |
|------------|------------|---------|-----------|
| **Framework** | NestJS | 10.0 | Arquitectura modular, DI, TypeScript |
| **Base de Datos** | MongoDB | 8.0 | NoSQL, alto rendimiento en lecturas |
| **ODM** | Mongoose | 8.0 | Esquemas, validación, queries tipados |
| **Autenticación** | JWT + Passport | 10.2 | Tokens stateless, escalable |
| **Validación** | class-validator | 0.14 | Decoradores declarativos en DTOs |
| **Hashing** | bcrypt | 5.1 | Hash seguro de contraseñas (10 rounds) |
| **Documentación** | Swagger/OpenAPI | 7.1 | UI interactiva, specs automáticas |
| **Testing** | Jest | 29.5 | Unit tests con mocking avanzado |
| **Containerización** | Docker | Latest | Multi-stage build optimizado |

---

## 📁 Arquitectura de Módulos

El sistema implementa **8 módulos funcionales** organizados por dominio:

```
src/
├── common/                    # Código compartido
│   ├── decorators/           # @RequestId(), @CurrentUser()
│   ├── guards/               # AuthGuard (JWT)
│   └── middleware/           # LoggingMiddleware, RequestIdMiddleware
│
├── teams/                    # [MÓDULO 1] Gestión de equipos
│   ├── teams.controller.ts   # 7 endpoints REST
│   ├── teams.service.ts      # Lógica de negocio
│   ├── teams.service.spec.ts # 4 tests unitarios
│   ├── schemas/              # Team schema (Mongoose)
│   └── dto/                  # CreateTeamDto, UpdateTeamDto
│
├── matches/                  # [MÓDULO 2] Gestión de partidos
│   ├── matches.controller.ts # Próximos, en vivo, recientes
│   ├── schemas/              # Match schema con eventos
│   └── dto/                  # DTOs validados
│
├── leagues/                  # [MÓDULO 3] Gestión de ligas
│   ├── leagues.controller.ts # CRUD de ligas
│   └── schemas/              # League schema
│
├── users/                    # [MÓDULO 4] Autenticación y usuarios
│   ├── users.controller.ts   # Register, login, profile
│   ├── users.service.ts      # Hash passwords, JWT tokens
│   └── schemas/              # User schema (password con select: false)
│
├── players/                  # [MÓDULO 5] Gestión de jugadores
│   ├── players.controller.ts # Jugadores por equipo
│   └── schemas/              # Player schema con estadísticas
│
├── news/                     # [MÓDULO 6] Noticias deportivas
│   ├── news.controller.ts    # Listado y destacadas
│   └── schemas/              # News schema con categorías
│
├── favorites/                # [MÓDULO 7] Sistema de favoritos
│   ├── favorites.controller.ts # CRUD de favoritos
│   └── schemas/              # Favorite schema (userId + teamId)
│
└── statistics/               # [MÓDULO 8] Estadísticas avanzadas
    ├── statistics.controller.ts # Top scorers, top assisters
    └── schemas/              # Statistic schema con agregaciones
```

### Patrón de Arquitectura por Módulo

```
Request → Controller (routing) 
    ↓
DTOs (validación automática)
    ↓
Service (lógica de negocio)
    ↓
Repository/Mongoose (consultas BD)
    ↓
MongoDB
```

---

## 🚀 Instalación

### Requisitos Previos

- Node.js ≥ 18.0
- MongoDB ≥ 7.0 (local o Docker)
- npm ≥ 9.0

### Pasos de Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/davmora04/Web-App-UI-Mockup.git
cd Web-App-UI-Mockup/backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (ver siguiente sección)
cp .env.example .env
# Editar .env con tus valores

# 4. Iniciar MongoDB (si es local)
mongod --dbpath /data/db

# 5. Poblar base de datos con datos de prueba
npm run seed
```

---

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto backend:

```env
# Entorno
NODE_ENV=development

# Servidor
PORT=3001
API_PREFIX=api

# Base de Datos
MONGODB_URI=mongodb://localhost:27017/statfut

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Frontend (CORS)
FRONTEND_URL=http://localhost:5173
```

**⚠️ IMPORTANTE:** 
- En producción, usar un `JWT_SECRET` fuerte y aleatorio
- Nunca commitear el archivo `.env` al repositorio

### Conexión con Frontend

El backend se conecta automáticamente con el frontend React en `http://localhost:5173` mediante:

1. **CORS configurado** en `main.ts`:
   ```typescript
   app.enableCors({
     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
     credentials: true,
   });
   ```

2. **Prefijo `/api`** en todas las rutas:
   ```typescript
   app.setGlobalPrefix('api');
   ```

3. **Endpoints consumidos por el frontend:**
   - `GET /api/teams/standings/:leagueId` → TablePage.tsx
   - `GET /api/matches/upcoming` → CalendarPage.tsx
   - `GET /api/matches/live` → HomePage.tsx
   - `POST /api/users/login` → AuthPage.tsx
   - `GET /api/favorites` → Sidebar.tsx

---

## ▶️ Ejecución

### Modo Desarrollo

```bash
npm run start:dev
```

- **Puerto:** http://localhost:3001
- **Swagger UI:** http://localhost:3001/api/docs
- **Hot Reload:** Activado
- **Logs:** Detallados con colores

### Modo Producción

```bash
# Build del proyecto
npm run build

# Ejecutar build
npm run start:prod
```

### Poblar Base de Datos

```bash
# Script de seeding con datos de ejemplo
npm run seed
```

**Datos generados:**
- 20 equipos de La Liga
- 30 partidos (pasados, en vivo, futuros)
- 100+ jugadores
- 15 noticias
- 2 usuarios de prueba

---

## 🐳 Docker

### Opción 1: Docker Compose (Recomendado)

Levanta backend + MongoDB automáticamente:

```bash
# Iniciar servicios
docker-compose up --build

# En segundo plano
docker-compose up -d --build

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f backend
```

**Servicios incluidos:**
- `mongodb`: Base de datos con persistencia en volumen
- `backend`: API NestJS conectada a MongoDB

**Puertos expuestos:**
- Backend: `http://localhost:3001`
- MongoDB: `localhost:27017`

### Opción 2: Docker Build Manual

```bash
# Build de imagen
docker build -t statfut-backend .

# Ejecutar contenedor
docker run -d \
  --name statfut-backend \
  -p 3001:3001 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/statfut \
  -e JWT_SECRET=your-secret \
  statfut-backend

# Ver logs
docker logs -f statfut-backend
```

### Dockerfile Multi-Stage

**Ventajas:**
- Imagen final ligera (~200MB vs ~800MB)
- No incluye devDependencies
- Usuario no privilegiado (seguridad)
- Healthcheck integrado

---

## 📚 API Documentation

### Swagger UI Interactiva

**URL:** http://localhost:3001/api/docs

**Funcionalidades:**
- 📋 Listado de todos los endpoints
- 🧪 Probar requests directamente desde el navegador
- 📖 Documentación de DTOs y responses
- 🔐 Autenticación JWT integrada

### Endpoints Principales

#### **Teams (Equipos)**
```http
GET    /api/teams                      # Lista equipos con filtros
GET    /api/teams/standings/:leagueId  # Tabla de posiciones
GET    /api/teams/search?q=Real        # Búsqueda
GET    /api/teams/:id                  # Detalle de equipo
POST   /api/teams                      # Crear equipo
PATCH  /api/teams/:id                  # Actualizar equipo
DELETE /api/teams/:id                  # Eliminar equipo
```

#### **Matches (Partidos)**
```http
GET /api/matches              # Todos los partidos
GET /api/matches/upcoming     # Próximos partidos
GET /api/matches/live         # Partidos en vivo
GET /api/matches/recent       # Partidos recientes
GET /api/matches/team/:teamId # Partidos de un equipo
GET /api/matches/:id          # Detalle con alineaciones
```

#### **Users (Usuarios)**
```http
POST /api/users/register      # Registro (público)
POST /api/users/login         # Login (público)
GET  /api/users/me            # Perfil (protegido)
```

#### **Favorites (Favoritos)**
```http
GET    /api/favorites         # Mis favoritos (protegido)
POST   /api/favorites         # Agregar favorito (protegido)
DELETE /api/favorites/:teamId # Eliminar favorito (protegido)
```

#### **Statistics (Estadísticas)**
```http
GET /api/statistics/top-scorers?leagueId=laliga&season=2024-2025
GET /api/statistics/top-assisters?leagueId=laliga&season=2024-2025
```

**Ver documentación completa:** [docs/API_REFERENCE.md](docs/API_REFERENCE.md)

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Modo watch
npm run test:watch

# Coverage report
npm run test:coverage

# Tests específicos
npm run test -- teams.service.spec.ts
```

### Cobertura Actual

**3 suites, 13 tests, 100% passing**

| Suite | Tests | Descripción |
|-------|-------|-------------|
| **TeamsService** | 4 | Lógica de negocio de equipos |
| **LoggingMiddleware** | 4 | Logging de peticiones HTTP |
| **AuthGuard** | 5 | Protección de rutas con JWT |

**Ejemplo de test:**

```typescript
describe('TeamsService', () => {
  it('should return teams sorted by points', async () => {
    const mockTeams = [{ name: 'Real Madrid', points: 45 }];
    mockTeamModel.exec.mockResolvedValue(mockTeams);

    const result = await service.getStandings('laliga');

    expect(mockTeamModel.sort).toHaveBeenCalledWith({
      points: -1,
      goalDifference: -1,
      goalsFor: -1,
    });
    expect(result).toEqual(mockTeams);
  });
});
```

---

## 🔗 Integración con Frontend

### Configuración de CORS

```typescript
// main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
});
```

### Ejemplo de Consumo desde React

```typescript
// Frontend: src/components/TablePage.tsx
import { useEffect, useState } from 'react';

const TablePage = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const response = await fetch(
        'http://localhost:3001/api/teams/standings/laliga?season=2024-2025'
      );
      const data = await response.json();
      setStandings(data);
    };
    fetchStandings();
  }, []);

  return (
    <table>
      {standings.map(team => (
        <tr key={team._id}>
          <td>{team.position}</td>
          <td>{team.name}</td>
          <td>{team.points}</td>
        </tr>
      ))}
    </table>
  );
};
```

### Autenticación JWT en Frontend

```typescript
// Guardar token después de login
const { token } = await fetch('http://localhost:3001/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
}).then(res => res.json());

localStorage.setItem('statfut-token', token);

// Usar token en requests protegidos
const profile = await fetch('http://localhost:3001/api/users/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('statfut-token')}`
  }
}).then(res => res.json());
```

---

## 📖 Documentación Técnica

### Documentos Disponibles

| Documento | Contenido |
|-----------|-----------|
| **[ARQUITECTURA_BACKEND.md](docs/ARQUITECTURA_BACKEND.md)** | Arquitectura completa del sistema |
| **[DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** | Modelo de datos, schemas, índices |
| **[API_REFERENCE.md](docs/API_REFERENCE.md)** | Referencia completa de endpoints |
| **[modules/TEAMS_MODULE.md](docs/modules/TEAMS_MODULE.md)** | Documentación detallada del módulo Teams |

### Características Técnicas Destacadas

#### 1. Middleware Personalizado

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

#### 2. Guards de Seguridad

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    const payload = await this.jwtService.verifyAsync(token);
    request['user'] = payload;
    return true;
  }
}
```

#### 3. Decoradores Personalizados

```typescript
// @RequestId() - Extrae requestId del request
export const RequestId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request['requestId'] || 'unknown';
  },
);

// Uso en controller
@Get()
findAll(@RequestId() requestId: string) {
  this.logger.log(`[${requestId}] Fetching all teams`);
  return this.teamsService.findAll();
}
```

#### 4. Validación con DTOs

```typescript
export class CreateTeamDto {
  @ApiProperty({ example: 'Real Madrid' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 45 })
  @IsInt()
  @Min(0)
  @IsOptional()
  points?: number;
}
```

---

## 🔧 Troubleshooting

### Problemas Comunes

#### 1. Error de conexión a MongoDB

```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solución:**
- Verificar que MongoDB esté corriendo: `mongod --version`
- Iniciar MongoDB: `mongod --dbpath /data/db`
- O usar Docker: `docker-compose up mongodb`

#### 2. Token JWT inválido

```json
{ "statusCode": 401, "message": "Token inválido o expirado" }
```

**Solución:**
- Verificar que el token no haya expirado (7 días por defecto)
- Hacer login nuevamente para obtener un token fresco
- Verificar que el header sea: `Authorization: Bearer <token>`

#### 3. CORS error en frontend

```
Access to fetch blocked by CORS policy
```

**Solución:**
- Verificar que `FRONTEND_URL` en `.env` coincida con la URL del frontend
- Reiniciar el backend después de cambiar `.env`

---

## 👨‍💻 Autor

**David Mora**  
Proyecto: StatFut - Sistema de Estadísticas de Fútbol  
Curso: Desarrollo Web - Segundo Semestre 2025  
Repositorio: [github.com/davmora04/Web-App-UI-Mockup](https://github.com/davmora04/Web-App-UI-Mockup)

---

## 📄 Licencia

Este proyecto es de uso académico para el curso de Desarrollo Web.
