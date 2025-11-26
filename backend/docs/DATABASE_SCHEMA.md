# Modelo de Datos - StatFut Backend

**Autor:** David Mora  
**Sistema:** StatFut - Estadísticas de Fútbol  
**Base de Datos:** MongoDB 8.0  
**ODM:** Mongoose 8.0

---

## 1. Decisiones de Diseño

### 1.1 ¿Por qué MongoDB?

#### **Justificación Técnica**

| Criterio | MongoDB | SQL Relacional | Decisión |
|----------|---------|----------------|----------|
| **Flexibilidad de esquemas** | ✅ Documentos flexibles | ❌ Esquemas rígidos | ✅ MongoDB |
| **Performance en lecturas** | ✅ Muy alto (documentos completos) | ⚠️ JOINs costosos | ✅ MongoDB |
| **Escalabilidad horizontal** | ✅ Sharding nativo | ⚠️ Complejo | ✅ MongoDB |
| **Consultas complejas** | ⚠️ Agregaciones | ✅ SQL avanzado | 🤝 Empate |
| **Transacciones ACID** | ⚠️ Desde v4.0 | ✅ Nativo | ⚠️ SQL |

**Decisión final:** MongoDB es óptimo para StatFut porque:

1. **Read-Heavy Workload:** 90% de las operaciones son lecturas (tablas, partidos, noticias)
2. **Evolución de Schemas:** Agregar campos a equipos/partidos sin migraciones complejas
3. **Documentos Anidados:** Partidos con alineaciones, eventos y estadísticas en un solo documento
4. **Rendimiento:** Consultas de tablas de posiciones son extremadamente rápidas
5. **Escalabilidad:** Preparado para millones de documentos en producción

### 1.2 Estrategia de Relaciones

**Patrón adoptado:** **Referencias (Normalización)**

```javascript
// ❌ Embedded (No usado)
{
  _id: "match123",
  homeTeam: {
    name: "Real Madrid",
    logo: "⚪",
    stadium: "Bernabéu"
  }
}

// ✅ Referenced (Usado)
{
  _id: "match123",
  homeTeamId: "team456",  // Referencia por ID
  awayTeamId: "team789"
}
```

**Ventajas:**
- ✅ No hay duplicación de datos
- ✅ Actualización de equipos se refleja en todos los partidos
- ✅ Queries más flexibles
- ✅ Tamaño de documentos controlado

**Desventaja:**
- ⚠️ Requiere múltiples queries (pero Mongoose tiene `.populate()`)

---

## 2. Entidades del Sistema

### 2.1 Diagrama Entidad-Relación

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   League    │◄────────│    Team     │────────►│   Player    │
│             │ 1     * │             │ 1     * │             │
│ • leagueId  │         │ • _id       │         │ • _id       │
│ • name      │         │ • name      │         │ • name      │
│ • country   │         │ • leagueId  │         │ • teamId    │
└─────────────┘         │ • points    │         │ • position  │
                        └──────┬──────┘         └─────────────┘
                               │
                               │ *
                               ▼
                        ┌─────────────┐
                        │    Match    │
                        │             │
                        │ • homeTeamId│
                        │ • awayTeamId│
                        │ • score     │
                        │ • events[]  │
                        └──────┬──────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼ *                  ▼ *                  ▼ *
  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
  │    User     │      │    News     │      │ Statistic   │
  │             │      │             │      │             │
  │ • username  │      │ • title     │      │ • playerId  │
  │ • password  │      │ • content   │      │ • goals     │
  │ • favorites │      │ • category  │      │ • assists   │
  └─────────────┘      └─────────────┘      └─────────────┘
          │
          │ 1
          ▼
  ┌─────────────┐
  │  Favorite   │
  │             │
  │ • userId    │
  │ • teamId    │
  │ • order     │
  └─────────────┘
```

---

## 3. Schemas Detallados

### 3.1 Team (Equipos)

**Propósito:** Almacenar información de equipos y sus estadísticas de liga.

```typescript
@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ required: true, index: true })
  leagueId: string;

  @Prop({ required: true })
  season: string;

  @Prop({ trim: true })
  city: string;

  @Prop()
  stadium: string;

  @Prop({ min: 1800, max: 2100 })
  founded: number;

  @Prop()
  coach: string;

  // Estadísticas de liga
  @Prop({ default: 0, min: 0 })
  position: number;

  @Prop({ default: 0, min: 0 })
  points: number;

  @Prop({ default: 0, min: 0 })
  played: number;

  @Prop({ default: 0, min: 0 })
  won: number;

  @Prop({ default: 0, min: 0 })
  drawn: number;

  @Prop({ default: 0, min: 0 })
  lost: number;

  @Prop({ default: 0, min: 0 })
  goalsFor: number;

  @Prop({ default: 0, min: 0 })
  goalsAgainst: number;

  @Prop({ default: 0 })
  goalDifference: number;

  @Prop({ maxlength: 10 })
  form: string; // "WWDLW"
}

// Índices
TeamSchema.index({ leagueId: 1, season: 1 });
TeamSchema.index({ points: -1, goalDifference: -1 });
TeamSchema.index({ name: 'text' }); // Full-text search
```

**Campos clave:**

| Campo | Tipo | Constraints | Propósito |
|-------|------|-------------|-----------|
| `leagueId` | String | Required, Indexed | Referencia a League |
| `season` | String | Required | Ej: "2024-2025" |
| `points` | Number | ≥ 0, Default 0 | Puntos acumulados |
| `goalDifference` | Number | Default 0 | goalsFor - goalsAgainst |
| `form` | String | Max 10 chars | Últimos resultados (WWDLW) |

**Índices explicados:**

1. **`{ leagueId: 1, season: 1 }`** - Compound index
   - **Query:** `db.teams.find({ leagueId: "laliga", season: "2024-2025" })`
   - **Frecuencia:** Muy alta (tabla de posiciones)
   - **Performance:** O(log n)

2. **`{ points: -1, goalDifference: -1 }`** - Sorting index
   - **Query:** `db.teams.find().sort({ points: -1, goalDifference: -1 })`
   - **Frecuencia:** Alta (ordenamiento de tablas)
   - **Performance:** O(k) donde k = resultados

3. **`{ name: 'text' }`** - Text index
   - **Query:** `db.teams.find({ $text: { $search: "Real Madrid" } })`
   - **Frecuencia:** Media (búsqueda)
   - **Performance:** O(log n)

**Validaciones a nivel de esquema:**
```typescript
// Validación custom: goalDifference debe ser correcto
TeamSchema.pre('save', function(next) {
  this.goalDifference = this.goalsFor - this.goalsAgainst;
  next();
});
```

---

### 3.2 Match (Partidos)

**Propósito:** Almacenar información de partidos pasados, presentes y futuros.

```typescript
@Schema({ timestamps: true })
export class Match {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  homeTeamId: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  awayTeamId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, index: true })
  leagueId: string;

  @Prop({ required: true })
  season: string;

  @Prop({ 
    required: true, 
    enum: ['scheduled', 'live', 'finished', 'postponed'],
    default: 'scheduled'
  })
  status: string;

  @Prop({ type: Object })
  score: {
    home: number;
    away: number;
  };

  @Prop({ min: 0, max: 120 })
  minute: number;

  @Prop()
  stadium: string;

  @Prop()
  referee: string;

  @Prop({ type: [Object] })
  events: Array<{
    type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
    minute: number;
    playerId: string;
    teamId: string;
    detail?: string;
  }>;

  @Prop({ type: Object })
  lineups: {
    home: string[];
    away: string[];
  };
}

// Índices
MatchSchema.index({ leagueId: 1, date: -1 });
MatchSchema.index({ status: 1, date: 1 });
MatchSchema.index({ homeTeamId: 1 });
MatchSchema.index({ awayTeamId: 1 });
```

**Decisión de diseño: Eventos embebidos**

```typescript
// ✅ Embedded (Usado en Match.events)
events: [
  { type: 'goal', minute: 23, playerId: '...', teamId: '...' },
  { type: 'yellow_card', minute: 45, playerId: '...', teamId: '...' }
]
```

**Justificación:**
- Eventos siempre se consultan con el partido (no de forma aislada)
- Tamaño limitado (~20-30 eventos por partido máximo)
- Performance superior (un solo query)
- Atomicidad de escritura

**Índices explicados:**

1. **`{ leagueId: 1, date: -1 }`** - Partidos de una liga ordenados por fecha
2. **`{ status: 1, date: 1 }`** - Partidos en vivo o próximos
3. **`{ homeTeamId: 1 }` y `{ awayTeamId: 1 }`** - Partidos de un equipo

---

### 3.3 League (Ligas)

**Propósito:** Información de competiciones (La Liga, Premier League, etc.)

```typescript
@Schema({ timestamps: true })
export class League {
  @Prop({ required: true, unique: true })
  leagueId: string; // "laliga", "premier", "bundesliga"

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  logo: string;

  @Prop()
  type: string; // "league", "cup", "international"

  @Prop({ type: [String], default: [] })
  seasons: string[]; // ["2024-2025", "2023-2024"]

  @Prop({ default: true })
  active: boolean;
}

// Índice único
LeagueSchema.index({ leagueId: 1 }, { unique: true });
```

**Validación única:** `leagueId` debe ser único globalmente.

---

### 3.4 Player (Jugadores)

**Propósito:** Información de jugadores asociados a equipos.

```typescript
@Schema({ timestamps: true })
export class Player {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  teamId: string;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true, enum: ['GK', 'DEF', 'MID', 'FWD'] })
  position: string;

  @Prop()
  nationality: string;

  @Prop()
  birthDate: Date;

  @Prop()
  height: number; // cm

  @Prop()
  weight: number; // kg

  @Prop()
  photo: string;

  // Estadísticas de la temporada
  @Prop({ default: 0, min: 0 })
  goals: number;

  @Prop({ default: 0, min: 0 })
  assists: number;

  @Prop({ default: 0, min: 0 })
  yellowCards: number;

  @Prop({ default: 0, min: 0 })
  redCards: number;

  @Prop({ default: 0, min: 0 })
  appearances: number;
}

// Índices
PlayerSchema.index({ teamId: 1 });
PlayerSchema.index({ goals: -1 }); // Top scorers
PlayerSchema.index({ assists: -1 }); // Top assisters
```

**Relación:** `Player.teamId → Team._id` (Muchos a Uno)

---

### 3.5 User (Usuarios)

**Propósito:** Gestión de usuarios y autenticación.

```typescript
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  username: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false }) // No incluir en queries por defecto
  password: string; // Hash bcrypt

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatar: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  favoriteTeamId: string;

  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: string;

  @Prop({ default: true })
  active: boolean;
}

// Índices
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
```

**Seguridad:**

```typescript
// Pre-save hook: Hash password antes de guardar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método de instancia: Verificar password
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

**Importante:** `password` tiene `select: false` para no exponerlo en queries.

---

### 3.6 Favorite (Favoritos)

**Propósito:** Gestión de equipos favoritos por usuario con orden personalizado.

```typescript
@Schema({ timestamps: true })
export class Favorite {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  teamId: string;

  @Prop({ default: 0 })
  order: number; // Para drag & drop en frontend

  @Prop({ default: Date.now })
  addedAt: Date;
}

// Índices
FavoriteSchema.index({ userId: 1, teamId: 1 }, { unique: true });
FavoriteSchema.index({ userId: 1, order: 1 });
```

**Constraint único compuesto:** Un usuario no puede agregar el mismo equipo dos veces.

**Query típica:**
```javascript
db.favorites.find({ userId: "user123" }).sort({ order: 1 })
```

---

### 3.7 News (Noticias)

**Propósito:** Artículos y noticias deportivas.

```typescript
@Schema({ timestamps: true })
export class News {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, enum: ['match', 'transfer', 'injury', 'general'] })
  category: string;

  @Prop({ default: Date.now, index: true })
  publishedDate: Date;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: false })
  featured: boolean; // Destacado en home
}

// Índices
NewsSchema.index({ publishedDate: -1 });
NewsSchema.index({ category: 1, publishedDate: -1 });
NewsSchema.index({ featured: 1, publishedDate: -1 });
```

**Query frecuente:**
```javascript
// Últimas 10 noticias destacadas
db.news.find({ featured: true }).sort({ publishedDate: -1 }).limit(10)
```

---

### 3.8 Statistic (Estadísticas)

**Propósito:** Estadísticas agregadas por jugador y temporada.

```typescript
@Schema({ timestamps: true })
export class Statistic {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Player' })
  playerId: string;

  @Prop({ required: true })
  season: string;

  @Prop({ required: true, index: true })
  leagueId: string;

  @Prop({ default: 0 })
  goals: number;

  @Prop({ default: 0 })
  assists: number;

  @Prop({ default: 0 })
  minutesPlayed: number;

  @Prop({ default: 0 })
  shots: number;

  @Prop({ default: 0 })
  shotsOnTarget: number;

  @Prop({ default: 0 })
  passesCompleted: number;

  @Prop({ default: 0 })
  passesAttempted: number;

  @Prop({ default: 0 })
  tacklesWon: number;

  @Prop({ default: 0 })
  interceptions: number;
}

// Índices
StatisticSchema.index({ leagueId: 1, season: 1, goals: -1 });
StatisticSchema.index({ leagueId: 1, season: 1, assists: -1 });
```

**Query de top scorers:**
```javascript
db.statistics.find({ leagueId: "laliga", season: "2024-2025" })
  .sort({ goals: -1 })
  .limit(10)
  .populate('playerId')
```

---

## 4. Resumen de Índices

### 4.1 Tabla de Índices por Colección

| Colección | Índices | Propósito | Tipo |
|-----------|---------|-----------|------|
| **teams** | `{ leagueId: 1, season: 1 }` | Filtrado de tabla | Compound |
| | `{ points: -1, goalDifference: -1 }` | Ordenamiento | Compound |
| | `{ name: 'text' }` | Búsqueda | Text |
| **matches** | `{ leagueId: 1, date: -1 }` | Partidos por liga | Compound |
| | `{ status: 1, date: 1 }` | Partidos en vivo | Compound |
| | `{ homeTeamId: 1 }` | Partidos de equipo | Single |
| | `{ awayTeamId: 1 }` | Partidos de equipo | Single |
| **leagues** | `{ leagueId: 1 }` | Unique constraint | Unique |
| **players** | `{ teamId: 1 }` | Jugadores por equipo | Single |
| | `{ goals: -1 }` | Top scorers | Single |
| | `{ assists: -1 }` | Top assisters | Single |
| **users** | `{ username: 1 }` | Login | Unique |
| | `{ email: 1 }` | Login | Unique |
| **favorites** | `{ userId: 1, teamId: 1 }` | Unique constraint | Compound Unique |
| | `{ userId: 1, order: 1 }` | Ordenamiento | Compound |
| **news** | `{ publishedDate: -1 }` | Últimas noticias | Single |
| | `{ category: 1, publishedDate: -1 }` | Por categoría | Compound |
| **statistics** | `{ leagueId: 1, season: 1, goals: -1 }` | Top scorers | Compound |

### 4.2 Impacto en Performance

**Sin índices:**
```javascript
// Full collection scan: O(n)
db.teams.find({ leagueId: "laliga" }) // Recorre todos los documentos
```

**Con índices:**
```javascript
// Index scan: O(log n)
db.teams.find({ leagueId: "laliga" }) // Usa índice B-tree
```

**Ejemplo real:**
- Colección con 1,000,000 equipos
- Sin índice: ~1000ms
- Con índice: ~5ms
- **Mejora: 200x más rápido**

---

## 5. Estrategia de Validación

### 5.1 Validación en Múltiples Capas

```
1. DTOs (class-validator)
   ↓ Validación de entrada
2. Mongoose Schema
   ↓ Validación de tipos y constraints
3. Custom Validators
   ↓ Lógica de negocio
4. Database Constraints
   ↓ Unique indexes, etc.
```

**Ejemplo completo:**

```typescript
// 1. DTO
export class CreateTeamDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
}

// 2. Schema
@Prop({ required: true, trim: true, minlength: 2, maxlength: 100 })
name: string;

// 3. Custom Validator
TeamSchema.pre('save', function(next) {
  if (this.points < 0) {
    return next(new Error('Points cannot be negative'));
  }
  next();
});

// 4. Database
TeamSchema.index({ leagueId: 1, name: 1 }, { unique: true });
```

---

## 6. Queries Optimizadas

### 6.1 Agregaciones Complejas

**Top 10 Scorers con Información del Equipo:**

```typescript
async getTopScorers(leagueId: string, season: string) {
  return this.statisticModel.aggregate([
    {
      $match: { leagueId, season }
    },
    {
      $sort: { goals: -1 }
    },
    {
      $limit: 10
    },
    {
      $lookup: {
        from: 'players',
        localField: 'playerId',
        foreignField: '_id',
        as: 'player'
      }
    },
    {
      $unwind: '$player'
    },
    {
      $lookup: {
        from: 'teams',
        localField: 'player.teamId',
        foreignField: '_id',
        as: 'team'
      }
    },
    {
      $unwind: '$team'
    },
    {
      $project: {
        playerName: '$player.name',
        teamName: '$team.name',
        teamLogo: '$team.logo',
        goals: 1,
        assists: 1,
        minutesPlayed: 1
      }
    }
  ]);
}
```

**Performance:** O(log n + k) donde k = 10 resultados.

---

## 7. Migración y Versionado

### 7.1 Estrategia de Cambios de Schema

**Ejemplo: Agregar campo `marketValue` a Player**

```typescript
// 1. Agregar campo opcional al schema
@Prop({ default: 0 })
marketValue: number;

// 2. Script de migración
async function migratePlayersMarketValue() {
  await mongoose.connection.db.collection('players').updateMany(
    { marketValue: { $exists: false } },
    { $set: { marketValue: 0 } }
  );
}

// 3. Ejecutar migration
npm run migrate:players:market-value
```

**Principio:** Siempre agregar campos opcionales primero, nunca eliminar directamente.

---

## 8. Conclusión

El modelo de datos de StatFut está diseñado para:

✅ **Alto rendimiento** en consultas frecuentes (tablas, partidos, estadísticas)  
✅ **Escalabilidad** mediante índices optimizados y referencias  
✅ **Flexibilidad** para evolucionar sin migraciones complejas  
✅ **Integridad** con validaciones en múltiples capas  
✅ **Mantenibilidad** con schemas bien documentados

**Métricas del modelo:**
- **8 colecciones** principales
- **23 índices** optimizados
- **~50 campos** por entidad en promedio
- **Validaciones** en 3 capas (DTO → Schema → Custom)

---

**Documento Técnico:** Diseño de Base de Datos - StatFut  
**Sistema de Gestión:** MongoDB 8.0 con Mongoose ODM  
**Autor:** David Mora  
**Fecha:** Noviembre 2025
