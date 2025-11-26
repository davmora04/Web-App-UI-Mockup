# Módulo Teams - Gestión de Equipos

**Responsable:** Teams Module  
**Dominio:** Equipos de fútbol y tablas de posiciones  
**Dependencias:** Mongoose, class-validator

---

## 1. Propósito del Módulo

El módulo **Teams** es el núcleo del sistema de gestión de equipos de fútbol. Su responsabilidad principal es administrar la información de equipos, incluyendo estadísticas de liga, clasificaciones y datos generales como estadio, entrenador y fundación.

### 1.1 Problema del Dominio

En un sistema de estadísticas de fútbol, los equipos son entidades centrales que:
- Participan en múltiples ligas y temporadas
- Acumulan estadísticas (puntos, victorias, goles)
- Se relacionan con partidos, jugadores y usuarios (favoritos)
- Requieren consultas frecuentes y optimizadas para tablas de posiciones

**Solución implementada:**
- Esquema flexible que soporta múltiples temporadas
- Índices compuestos para queries de alta frecuencia
- API RESTful completa para todas las operaciones CRUD
- Integración con frontend para visualización de tablas y detalles

---

## 2. Entidades y Schemas

### 2.1 Team Schema

**Archivo:** `schemas/team.schema.ts`

```typescript
@Schema({ timestamps: true })
export class Team {
  // Información básica
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) logo: string;
  @Prop({ required: true, index: true }) leagueId: string;
  @Prop({ required: true }) season: string;
  
  // Datos del equipo
  @Prop() city: string;
  @Prop() stadium: string;
  @Prop() founded: number;
  @Prop() coach: string;
  
  // Estadísticas de liga
  @Prop({ default: 0 }) position: number;
  @Prop({ default: 0 }) points: number;
  @Prop({ default: 0 }) played: number;
  @Prop({ default: 0 }) won: number;
  @Prop({ default: 0 }) drawn: number;
  @Prop({ default: 0 }) lost: number;
  @Prop({ default: 0 }) goalsFor: number;
  @Prop({ default: 0 }) goalsAgainst: number;
  @Prop({ default: 0 }) goalDifference: number;
  @Prop() form: string; // Ej: "WWDLW"
}
```

**Campos clave:**

| Campo | Tipo | Propósito | Validación |
|-------|------|-----------|------------|
| `name` | String | Nombre del equipo | Requerido, 2-100 caracteres |
| `leagueId` | String | Referencia a la liga | Requerido, indexado |
| `season` | String | Temporada (ej: "2024-2025") | Requerido |
| `points` | Number | Puntos acumulados | ≥ 0 |
| `goalDifference` | Number | Diferencia de goles | Calculado: goalsFor - goalsAgainst |
| `form` | String | Últimos 5 resultados | Ej: "WWDLW" (W=Win, D=Draw, L=Loss) |

### 2.2 Índices Optimizados

```typescript
// Índice compuesto para filtrado por liga y temporada
TeamSchema.index({ leagueId: 1, season: 1 });

// Índice compuesto para ordenamiento de tabla de posiciones
TeamSchema.index({ points: -1, goalDifference: -1 });
```

**Justificación técnica:**
1. **`{ leagueId: 1, season: 1 }`**: Query más frecuente del sistema (tabla de posiciones). Este índice permite filtrar rápidamente equipos de una liga específica en una temporada.
   
2. **`{ points: -1, goalDifference: -1 }`**: Sorting requerido por la tabla de posiciones (descendente por puntos, desempate por diferencia de goles).

**Impacto en performance:**
- Sin índices: O(n) full collection scan
- Con índices: O(log n) + O(k) donde k = resultados

### 2.3 Timestamps Automáticos

```typescript
@Schema({ timestamps: true })
```

Mongoose agrega automáticamente:
- `createdAt`: Fecha de creación del documento
- `updatedAt`: Última modificación

**Uso:** Auditoría y cache invalidation.

---

## 3. Data Transfer Objects (DTOs)

### 3.1 CreateTeamDto

**Archivo:** `dto/create-team.dto.ts`

```typescript
export class CreateTeamDto {
  @ApiProperty({ description: 'Nombre del equipo', example: 'Real Madrid' })
  @IsString() @IsNotEmpty() @MinLength(2) @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Logo del equipo (emoji o URL)', example: '⚪' })
  @IsString() @IsNotEmpty() @MaxLength(200)
  logo: string;

  @ApiProperty({ description: 'ID de la liga', example: 'laliga' })
  @IsString() @IsNotEmpty() @MinLength(2) @MaxLength(50)
  leagueId: string;

  @ApiProperty({ description: 'Temporada', example: '2024-2025' })
  @IsString() @IsNotEmpty()
  season: string;

  @ApiPropertyOptional({ description: 'Puntos', example: 45 })
  @IsInt() @Min(0) @IsOptional()
  points?: number;

  // ... más campos opcionales
}
```

**Validaciones implementadas:**
- **Tipos estrictos:** `@IsString()`, `@IsInt()`
- **Obligatoriedad:** `@IsNotEmpty()`
- **Longitud:** `@MinLength()`, `@MaxLength()`
- **Rangos:** `@Min()`, `@Max()`
- **Opcionalidad:** `@IsOptional()`

**Integración con Swagger:**
Cada campo documenta automáticamente en `/api/docs` con ejemplo incluido.

### 3.2 UpdateTeamDto

```typescript
export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
```

**Patrón utilizado:** `PartialType` de NestJS hace todos los campos opcionales automáticamente, ideal para operaciones PATCH.

---

## 4. Controlador (API Endpoints)

**Archivo:** `teams.controller.ts`

### 4.1 Rutas Implementadas

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| GET | `/api/teams` | Lista todos los equipos | No |
| GET | `/api/teams/search?q=Real` | Búsqueda por nombre | No |
| GET | `/api/teams/standings/:leagueId` | Tabla de posiciones | No |
| GET | `/api/teams/:id` | Detalle de un equipo | No |
| POST | `/api/teams` | Crear equipo | Admin* |
| PATCH | `/api/teams/:id` | Actualizar equipo | Admin* |
| DELETE | `/api/teams/:id` | Eliminar equipo | Admin* |

*Nota: Autenticación de admin no implementada aún (futuro)

### 4.2 Ejemplos de Consumo

#### **GET /api/teams/standings/laliga?season=2024-2025**

**Request:**
```http
GET /api/teams/standings/laliga?season=2024-2025 HTTP/1.1
Host: localhost:3001
```

**Response (200 OK):**
```json
[
  {
    "_id": "674123abc...",
    "name": "Real Madrid",
    "logo": "⚪",
    "leagueId": "laliga",
    "season": "2024-2025",
    "position": 1,
    "points": 45,
    "played": 15,
    "won": 14,
    "drawn": 3,
    "lost": 1,
    "goalsFor": 42,
    "goalsAgainst": 15,
    "goalDifference": 27,
    "form": "WWWDW",
    "stadium": "Santiago Bernabéu",
    "coach": "Carlo Ancelotti"
  },
  {
    "_id": "674123def...",
    "name": "Barcelona",
    "logo": "🔴🔵",
    "position": 2,
    "points": 41,
    // ...
  }
]
```

**Consumo en Frontend:**
```typescript
// src/components/TablePage.tsx
const fetchStandings = async () => {
  const response = await fetch(
    `${API_URL}/api/teams/standings/${leagueId}?season=${season}`
  );
  const teams = await response.json();
  setStandings(teams);
};
```

---

#### **GET /api/teams/search?q=Real**

**Request:**
```http
GET /api/teams/search?q=Real HTTP/1.1
Host: localhost:3001
```

**Response (200 OK):**
```json
[
  { "_id": "...", "name": "Real Madrid", "logo": "⚪" },
  { "_id": "...", "name": "Real Sociedad", "logo": "🔵⚪" },
  { "_id": "...", "name": "Real Betis", "logo": "🟢⚪" }
]
```

**Lógica de búsqueda:**
- Case-insensitive (`$options: 'i'`)
- Regex pattern matching
- Límite de 10 resultados para performance

**Consumo en Frontend:**
```typescript
// src/components/Navbar.tsx (barra de búsqueda)
const handleSearch = async (query: string) => {
  const response = await fetch(`${API_URL}/api/teams/search?q=${query}`);
  const teams = await response.json();
  setSearchResults(prev => ({ ...prev, teams }));
};
```

---

#### **POST /api/teams**

**Request:**
```http
POST /api/teams HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "name": "Atlético Madrid",
  "logo": "🔴⚪",
  "leagueId": "laliga",
  "season": "2024-2025",
  "stadium": "Cívitas Metropolitano",
  "coach": "Diego Simeone",
  "points": 38,
  "played": 15,
  "won": 11,
  "drawn": 5,
  "lost": 1,
  "goalsFor": 32,
  "goalsAgainst": 18
}
```

**Response (201 Created):**
```json
{
  "_id": "674567xyz...",
  "name": "Atlético Madrid",
  "logo": "🔴⚪",
  "leagueId": "laliga",
  "season": "2024-2025",
  "goalDifference": 14,
  "createdAt": "2024-11-26T10:30:00.000Z",
  "updatedAt": "2024-11-26T10:30:00.000Z"
}
```

**Validación automática:**
Si el request no pasa las validaciones del DTO:

```json
{
  "statusCode": 400,
  "message": [
    "name must be longer than or equal to 2 characters",
    "points must not be less than 0"
  ],
  "error": "Bad Request"
}
```

---

#### **GET /api/teams/:id**

**Request:**
```http
GET /api/teams/674123abc HTTP/1.1
Host: localhost:3001
```

**Response (200 OK):**
```json
{
  "_id": "674123abc",
  "name": "Real Madrid",
  "logo": "⚪",
  "city": "Madrid",
  "stadium": "Santiago Bernabéu",
  "founded": 1902,
  "coach": "Carlo Ancelotti",
  "leagueId": "laliga",
  "season": "2024-2025",
  "position": 1,
  "points": 45,
  "played": 15,
  "won": 14,
  "drawn": 3,
  "lost": 1,
  "goalsFor": 42,
  "goalsAgainst": 15,
  "goalDifference": 27,
  "form": "WWWDW"
}
```

**Consumo en Frontend:**
```typescript
// src/components/TeamDetail.tsx
useEffect(() => {
  const fetchTeamDetail = async () => {
    const response = await fetch(`${API_URL}/api/teams/${teamId}`);
    const team = await response.json();
    setTeamData(team);
  };
  fetchTeamDetail();
}, [teamId]);
```

**Error handling (404):**
```json
{
  "statusCode": 404,
  "message": "Equipo con ID \"674123abc\" no encontrado",
  "error": "Not Found"
}
```

---

## 5. Servicio (Lógica de Negocio)

**Archivo:** `teams.service.ts`

### 5.1 Métodos Implementados

#### **findAll(leagueId?, season?): Promise<Team[]>**

**Propósito:** Lista equipos con filtrado opcional por liga y temporada.

**Implementación:**
```typescript
async findAll(leagueId?: string, season?: string): Promise<Team[]> {
  const filter: any = {};
  if (leagueId) filter.leagueId = leagueId;
  if (season) filter.season = season;

  return this.teamModel
    .find(filter)
    .sort({ position: 1 })
    .exec();
}
```

**Query generada (MongoDB):**
```javascript
db.teams.find({ leagueId: "laliga", season: "2024-2025" })
  .sort({ position: 1 })
```

**Complejidad:** O(log n) con índice en `{ leagueId, season }`

---

#### **getStandings(leagueId, season?): Promise<Team[]>**

**Propósito:** Obtener tabla de posiciones ordenada.

**Implementación:**
```typescript
async getStandings(leagueId: string, season?: string): Promise<Team[]> {
  const filter: any = { leagueId };
  if (season) filter.season = season;

  return this.teamModel
    .find(filter)
    .sort({ points: -1, goalDifference: -1, goalsFor: -1 })
    .exec();
}
```

**Criterios de ordenamiento:**
1. **Puntos** (descendente) - Más puntos = mejor posición
2. **Diferencia de goles** (descendente) - Desempate primario
3. **Goles a favor** (descendente) - Desempate secundario

**Nota:** Sigue las reglas oficiales de La Liga y UEFA.

---

#### **search(query): Promise<Team[]>**

**Propósito:** Búsqueda rápida de equipos por nombre.

**Implementación:**
```typescript
async search(query: string): Promise<Team[]> {
  return this.teamModel
    .find({ name: { $regex: query, $options: 'i' } })
    .limit(10)
    .exec();
}
```

**Características:**
- **Regex case-insensitive:** Busca "real" → encuentra "Real Madrid"
- **Límite de 10:** Previene sobrecarga en autocomplete
- **Performance:** Sin índice en `name`, considera agregarlo si hay >10k equipos

---

#### **create(dto): Promise<Team>**

**Propósito:** Crear nuevo equipo en el sistema.

**Implementación:**
```typescript
async create(createTeamDto: CreateTeamDto): Promise<Team> {
  const createdTeam = new this.teamModel(createTeamDto);
  return createdTeam.save();
}
```

**Validación:** Ejecutada antes por `ValidationPipe` en el DTO.

---

#### **update(id, dto): Promise<Team>**

**Propósito:** Actualizar información de un equipo.

**Implementación:**
```typescript
async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
  const team = await this.teamModel
    .findByIdAndUpdate(id, updateTeamDto, { new: true })
    .exec();
  
  if (!team) {
    throw new NotFoundException(`Equipo con ID "${id}" no encontrado`);
  }
  return team;
}
```

**Opción `{ new: true }`:** Retorna el documento actualizado (no el original).

---

#### **remove(id): Promise<void>**

**Propósito:** Eliminar equipo del sistema.

**Implementación:**
```typescript
async remove(id: string): Promise<void> {
  const result = await this.teamModel.findByIdAndDelete(id).exec();
  if (!result) {
    throw new NotFoundException(`Equipo con ID "${id}" no encontrado`);
  }
}
```

**Consideración:** En producción, implementar soft delete (flag `deleted: true` en lugar de eliminación física).

---

## 6. Integración con Frontend

### 6.1 Componentes que Consumen este Módulo

| Componente Frontend | Endpoint Usado | Funcionalidad |
|---------------------|----------------|---------------|
| **TablePage.tsx** | `GET /teams/standings/:leagueId` | Muestra tabla de posiciones completa |
| **HomePage.tsx** | `GET /teams/:id` | Detalle de equipos en partidos recientes |
| **TeamDetail.tsx** | `GET /teams/:id` | Vista detallada de un equipo |
| **Navbar.tsx** | `GET /teams/search?q=` | Barra de búsqueda global |
| **Sidebar.tsx** | `GET /teams?leagueId=` | Lista de equipos para filtros |

### 6.2 Flujo de Datos: Tabla de Posiciones

```
1. Usuario selecciona "La Liga" en Sidebar
   ↓
2. Frontend: setSelectedLeague('laliga')
   ↓
3. useEffect(() => fetchStandings(), [selectedLeague])
   ↓
4. fetch(`/api/teams/standings/laliga?season=2024-2025`)
   ↓
5. Backend: TeamsController.getStandings()
   ↓
6. TeamsService.getStandings() → MongoDB query
   ↓
7. Response: Array<Team> ordenado por puntos
   ↓
8. Frontend: setStandings(data) → renderiza tabla
```

### 6.3 Ejemplo Completo de Integración

**Frontend (React):**
```typescript
// src/components/TablePage.tsx
import { useApp } from './AppContext';

const TablePage = () => {
  const { selectedLeague, selectedSeason } = useApp();
  const [standings, setStandings] = useState<Team[]>([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const response = await fetch(
        `http://localhost:3001/api/teams/standings/${selectedLeague}?season=${selectedSeason}`
      );
      const data = await response.json();
      setStandings(data);
    };
    fetchStandings();
  }, [selectedLeague, selectedSeason]);

  return (
    <table>
      <thead>
        <tr>
          <th>Pos</th>
          <th>Team</th>
          <th>Pts</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
        </tr>
      </thead>
      <tbody>
        {standings.map(team => (
          <tr key={team._id}>
            <td>{team.position}</td>
            <td>{team.logo} {team.name}</td>
            <td>{team.points}</td>
            <td>{team.won}</td>
            <td>{team.drawn}</td>
            <td>{team.lost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

**Backend (NestJS):**
```typescript
// teams.controller.ts
@Get('standings/:leagueId')
async getStandings(
  @Param('leagueId') leagueId: string,
  @Query('season') season?: string,
): Promise<Team[]> {
  return this.teamsService.getStandings(leagueId, season);
}

// teams.service.ts
async getStandings(leagueId: string, season?: string): Promise<Team[]> {
  return this.teamModel
    .find({ leagueId, ...(season && { season }) })
    .sort({ points: -1, goalDifference: -1, goalsFor: -1 })
    .exec();
}
```

---

## 7. Pruebas Unitarias

**Archivo:** `teams.service.spec.ts`

### 7.1 Suite de Tests

```typescript
describe('TeamsService', () => {
  let service: TeamsService;
  let mockTeamModel: any;

  beforeEach(async () => {
    mockTeamModel = {
      find: jest.fn().mockReturnThis(),
      findById: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        TeamsService,
        { provide: getModelToken(Team.name), useValue: mockTeamModel },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should return teams filtered by leagueId', async () => {
    const mockTeams = [{ name: 'Real Madrid', leagueId: 'laliga' }];
    mockTeamModel.exec.mockResolvedValue(mockTeams);

    const result = await service.findAll('laliga');

    expect(mockTeamModel.find).toHaveBeenCalledWith({ leagueId: 'laliga' });
    expect(result).toEqual(mockTeams);
  });

  it('should sort standings by points and goal difference', async () => {
    mockTeamModel.exec.mockResolvedValue([]);

    await service.getStandings('laliga');

    expect(mockTeamModel.sort).toHaveBeenCalledWith({
      points: -1,
      goalDifference: -1,
      goalsFor: -1,
    });
  });
});
```

### 7.2 Cobertura

- ✅ Filtrado por `leagueId`
- ✅ Ordenamiento de standings
- ✅ Búsqueda con regex
- ✅ Manejo de errores (NotFoundException)

---

## 8. Relaciones con Otros Módulos

```
Teams ──────────────────────────────────────┐
  │                                          │
  │ (leagueId: string)                       │
  ├──► Leagues Module                        │
  │                                          │
  │ (_id referenciado)                       │
  ├──► Matches Module (homeTeam, awayTeam)  │
  │                                          │
  │ (_id referenciado)                       │
  ├──► Players Module (teamId)               │
  │                                          │
  │ (_id referenciado)                       │
  └──► Favorites Module (teamId)             │
```

**Tipo de relación:** Referencias por ID (no embedded), similar a foreign keys en SQL.

---

## 9. Mejoras Futuras

### 9.1 Corto Plazo
- [ ] Implementar paginación (`?page=1&limit=20`)
- [ ] Agregar filtro por país/continente
- [ ] Endpoint para histórico de posiciones
- [ ] Cache con Redis (TTL: 5 minutos)

### 9.2 Mediano Plazo
- [ ] Soft delete para preservar datos históricos
- [ ] Versionado de estadísticas por jornada
- [ ] Webhooks para actualización automática de datos
- [ ] Agregación de estadísticas multi-temporada

### 9.3 Largo Plazo
- [ ] Machine Learning para predicción de resultados
- [ ] GraphQL endpoint como alternativa a REST
- [ ] Microservicio independiente para escalabilidad

---

## 10. Conclusión

El módulo **Teams** es fundamental en la arquitectura de StatFut, proporcionando una API robusta y eficiente para la gestión de equipos. Su diseño modular permite fácil mantenimiento y extensión, mientras que la integración con el frontend garantiza una experiencia de usuario fluida en la visualización de tablas de posiciones y detalles de equipos.

**Características técnicas del módulo:**
- **Endpoints REST implementados:** 7
- **Índices de base de datos:** 3 (2 compuestos, 1 simple)
- **DTOs con validación:** 2 (Create, Update)
- **Cobertura de tests:** 4 casos de prueba unitaria
- **Complejidad:** ~350 líneas de código TypeScript
