# API Reference - StatFut Backend

**Base URL:** `http://localhost:3001/api`  
**Documentación Interactiva:** `http://localhost:3001/api/docs` (Swagger UI)  
**Formato de Respuesta:** JSON  
**Autenticación:** JWT Bearer Token

---

## Índice de Endpoints

1. [Teams](#1-teams) - Gestión de equipos
2. [Matches](#2-matches) - Gestión de partidos
3. [Leagues](#3-leagues) - Gestión de ligas
4. [Users](#4-users) - Autenticación y usuarios
5. [Players](#5-players) - Gestión de jugadores
6. [News](#6-news) - Noticias deportivas
7. [Favorites](#7-favorites) - Sistema de favoritos
8. [Statistics](#8-statistics) - Estadísticas avanzadas

---

## 1. Teams

### GET /api/teams

Obtiene lista de equipos con filtros opcionales.

**Query Parameters:**
- `leagueId` (string, optional) - ID de la liga
- `season` (string, optional) - Temporada (ej: "2024-2025")

**Request Example:**
```http
GET /api/teams?leagueId=laliga&season=2024-2025 HTTP/1.1
Host: localhost:3001
```

**Response (200 OK):**
```json
[
  {
    "_id": "674abc123...",
    "name": "Real Madrid",
    "logo": "⚪",
    "leagueId": "laliga",
    "season": "2024-2025",
    "city": "Madrid",
    "stadium": "Santiago Bernabéu",
    "founded": 1902,
    "coach": "Carlo Ancelotti",
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
    "createdAt": "2024-11-01T10:00:00.000Z",
    "updatedAt": "2024-11-26T09:30:00.000Z"
  }
]
```

**Consumo en Frontend:**
```typescript
// src/components/TablePage.tsx
const fetchTeams = async () => {
  const response = await fetch(
    `${API_URL}/api/teams?leagueId=${selectedLeague}&season=${selectedSeason}`
  );
  const teams = await response.json();
  setTeams(teams);
};
```

---

### GET /api/teams/standings/:leagueId

Obtiene tabla de posiciones ordenada.

**Path Parameters:**
- `leagueId` (string, required) - ID de la liga

**Query Parameters:**
- `season` (string, optional) - Temporada

**Request Example:**
```http
GET /api/teams/standings/laliga?season=2024-2025 HTTP/1.1
Host: localhost:3001
```

**Response (200 OK):**
```json
[
  {
    "_id": "674abc123...",
    "name": "Real Madrid",
    "logo": "⚪",
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
  },
  {
    "_id": "674abc456...",
    "name": "Barcelona",
    "logo": "🔴🔵",
    "position": 2,
    "points": 41,
    "played": 15,
    "won": 13,
    "drawn": 2,
    "lost": 0,
    "goalsFor": 38,
    "goalsAgainst": 12,
    "goalDifference": 26,
    "form": "WWDWW"
  }
]
```

**Ordenamiento:**
1. Puntos (descendente)
2. Diferencia de goles (descendente)
3. Goles a favor (descendente)

**Consumo en Frontend:**
```typescript
// src/components/TablePage.tsx
useEffect(() => {
  fetch(`${API_URL}/api/teams/standings/${selectedLeague}?season=${selectedSeason}`)
    .then(res => res.json())
    .then(data => setStandings(data));
}, [selectedLeague, selectedSeason]);
```

---

### GET /api/teams/search

Busca equipos por nombre.

**Query Parameters:**
- `q` (string, required) - Término de búsqueda

**Request Example:**
```http
GET /api/teams/search?q=Real HTTP/1.1
Host: localhost:3001
```

**Response (200 OK):**
```json
[
  { "_id": "...", "name": "Real Madrid", "logo": "⚪", "leagueId": "laliga" },
  { "_id": "...", "name": "Real Sociedad", "logo": "🔵⚪", "leagueId": "laliga" },
  { "_id": "...", "name": "Real Betis", "logo": "🟢⚪", "leagueId": "laliga" }
]
```

**Características:**
- Case-insensitive
- Regex pattern matching
- Límite: 10 resultados

**Consumo en Frontend:**
```typescript
// src/components/Navbar.tsx (barra de búsqueda)
const handleSearch = async (query: string) => {
  if (query.length < 2) return;
  const response = await fetch(`${API_URL}/api/teams/search?q=${query}`);
  const teams = await response.json();
  setSearchResults(prev => ({ ...prev, teams }));
};
```

---

### GET /api/teams/:id

Obtiene detalle completo de un equipo.

**Path Parameters:**
- `id` (string, required) - ID del equipo

**Request Example:**
```http
GET /api/teams/674abc123 HTTP/1.1
Host: localhost:3001
```

**Response (200 OK):**
```json
{
  "_id": "674abc123",
  "name": "Real Madrid",
  "logo": "⚪",
  "leagueId": "laliga",
  "season": "2024-2025",
  "city": "Madrid",
  "stadium": "Santiago Bernabéu",
  "founded": 1902,
  "coach": "Carlo Ancelotti",
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

**Error Response (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Equipo con ID \"674abc123\" no encontrado",
  "error": "Not Found"
}
```

**Consumo en Frontend:**
```typescript
// src/components/TeamDetail.tsx
useEffect(() => {
  fetch(`${API_URL}/api/teams/${teamId}`)
    .then(res => {
      if (!res.ok) throw new Error('Team not found');
      return res.json();
    })
    .then(data => setTeam(data))
    .catch(err => setError(err.message));
}, [teamId]);
```

---

### POST /api/teams

Crea un nuevo equipo.

**Authentication:** No requerida (en producción debería ser admin)

**Request Body:**
```json
{
  "name": "Atlético Madrid",
  "logo": "🔴⚪",
  "leagueId": "laliga",
  "season": "2024-2025",
  "city": "Madrid",
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
  "_id": "674xyz789",
  "name": "Atlético Madrid",
  "logo": "🔴⚪",
  "leagueId": "laliga",
  "season": "2024-2025",
  "goalDifference": 14,
  "createdAt": "2024-11-26T10:30:00.000Z",
  "updatedAt": "2024-11-26T10:30:00.000Z"
}
```

**Validation Error (400 Bad Request):**
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

### PATCH /api/teams/:id

Actualiza información de un equipo.

**Path Parameters:**
- `id` (string, required) - ID del equipo

**Request Body (parcial):**
```json
{
  "points": 48,
  "played": 16,
  "won": 15,
  "drawn": 3,
  "lost": 1,
  "form": "WWWDWW"
}
```

**Response (200 OK):**
```json
{
  "_id": "674abc123",
  "name": "Real Madrid",
  "points": 48,
  "played": 16,
  "won": 15,
  "updatedAt": "2024-11-26T11:00:00.000Z"
}
```

---

### DELETE /api/teams/:id

Elimina un equipo.

**Path Parameters:**
- `id` (string, required) - ID del equipo

**Response (200 OK):**
```json
{
  "message": "Equipo eliminado correctamente"
}
```

---

## 2. Matches

### GET /api/matches

Obtiene lista de partidos.

**Response (200 OK):**
```json
[
  {
    "_id": "674match123",
    "homeTeamId": "674abc123",
    "awayTeamId": "674abc456",
    "date": "2024-11-30T20:00:00.000Z",
    "leagueId": "laliga",
    "season": "2024-2025",
    "status": "scheduled",
    "stadium": "Santiago Bernabéu",
    "referee": "Mateu Lahoz"
  }
]
```

---

### GET /api/matches/upcoming

Obtiene próximos partidos.

**Query Parameters:**
- `limit` (number, optional) - Cantidad de resultados (default: 5)

**Request Example:**
```http
GET /api/matches/upcoming?limit=10 HTTP/1.1
Host: localhost:3001
```

**Response (200 OK):**
```json
[
  {
    "_id": "674match123",
    "homeTeamId": "674abc123",
    "awayTeamId": "674abc456",
    "date": "2024-11-30T20:00:00.000Z",
    "leagueId": "laliga",
    "status": "scheduled"
  }
]
```

**Consumo en Frontend:**
```typescript
// src/components/CalendarPage.tsx
useEffect(() => {
  fetch(`${API_URL}/api/matches/upcoming?limit=20`)
    .then(res => res.json())
    .then(data => setUpcomingMatches(data));
}, []);
```

---

### GET /api/matches/live

Obtiene partidos en vivo.

**Response (200 OK):**
```json
[
  {
    "_id": "674match456",
    "homeTeamId": "674abc123",
    "awayTeamId": "674abc789",
    "date": "2024-11-26T20:00:00.000Z",
    "status": "live",
    "minute": 67,
    "score": {
      "home": 2,
      "away": 1
    },
    "events": [
      {
        "type": "goal",
        "minute": 23,
        "playerId": "674player123",
        "teamId": "674abc123",
        "detail": "Penalty"
      },
      {
        "type": "yellow_card",
        "minute": 45,
        "playerId": "674player456",
        "teamId": "674abc789"
      }
    ]
  }
]
```

**Consumo en Frontend:**
```typescript
// src/components/HomePage.tsx (auto-refresh cada 30s)
useEffect(() => {
  const interval = setInterval(() => {
    fetch(`${API_URL}/api/matches/live`)
      .then(res => res.json())
      .then(data => setLiveMatches(data));
  }, 30000);
  return () => clearInterval(interval);
}, []);
```

---

### GET /api/matches/recent

Obtiene partidos recientes finalizados.

**Query Parameters:**
- `limit` (number, optional) - Cantidad de resultados (default: 5)

**Response (200 OK):**
```json
[
  {
    "_id": "674match789",
    "homeTeamId": "674abc123",
    "awayTeamId": "674abc456",
    "date": "2024-11-23T18:00:00.000Z",
    "status": "finished",
    "score": {
      "home": 3,
      "away": 1
    }
  }
]
```

**Consumo en Frontend:**
```typescript
// src/components/HomePage.tsx
useEffect(() => {
  fetch(`${API_URL}/api/matches/recent?limit=5`)
    .then(res => res.json())
    .then(data => setRecentMatches(data));
}, [selectedLeague]);
```

---

### GET /api/matches/team/:teamId

Obtiene partidos de un equipo específico.

**Path Parameters:**
- `teamId` (string, required) - ID del equipo

**Response (200 OK):**
```json
[
  {
    "_id": "674match123",
    "homeTeamId": "674abc123",
    "awayTeamId": "674abc456",
    "date": "2024-11-30T20:00:00.000Z",
    "status": "scheduled"
  }
]
```

---

### GET /api/matches/:id

Obtiene detalle completo de un partido.

**Path Parameters:**
- `id` (string, required) - ID del partido

**Response (200 OK):**
```json
{
  "_id": "674match123",
  "homeTeamId": "674abc123",
  "awayTeamId": "674abc456",
  "date": "2024-11-26T20:00:00.000Z",
  "leagueId": "laliga",
  "season": "2024-2025",
  "status": "finished",
  "score": {
    "home": 3,
    "away": 2
  },
  "stadium": "Santiago Bernabéu",
  "referee": "Mateu Lahoz",
  "lineups": {
    "home": ["674player1", "674player2", "..."],
    "away": ["674player10", "674player11", "..."]
  },
  "events": [
    {
      "type": "goal",
      "minute": 12,
      "playerId": "674player1",
      "teamId": "674abc123",
      "detail": "Header"
    },
    {
      "type": "goal",
      "minute": 34,
      "playerId": "674player10",
      "teamId": "674abc456"
    },
    {
      "type": "yellow_card",
      "minute": 56,
      "playerId": "674player2",
      "teamId": "674abc123"
    }
  ]
}
```

**Consumo en Frontend:**
```typescript
// src/components/MatchDetail.tsx
useEffect(() => {
  fetch(`${API_URL}/api/matches/${matchId}`)
    .then(res => res.json())
    .then(data => setMatchDetail(data));
}, [matchId]);
```

---

## 3. Leagues

### GET /api/leagues

Obtiene lista de todas las ligas.

**Response (200 OK):**
```json
[
  {
    "_id": "674league1",
    "leagueId": "laliga",
    "name": "La Liga",
    "country": "España",
    "logo": "🇪🇸",
    "type": "league",
    "seasons": ["2024-2025", "2023-2024", "2022-2023"],
    "active": true
  },
  {
    "_id": "674league2",
    "leagueId": "premier",
    "name": "Premier League",
    "country": "Inglaterra",
    "logo": "🏴󐁧󐁢󐁥󐁮󐁧󐁿",
    "type": "league",
    "seasons": ["2024-2025"],
    "active": true
  }
]
```

**Consumo en Frontend:**
```typescript
// src/components/Sidebar.tsx
useEffect(() => {
  fetch(`${API_URL}/api/leagues`)
    .then(res => res.json())
    .then(data => setLeagues(data));
}, []);
```

---

### GET /api/leagues/:leagueId

Obtiene detalle de una liga.

**Path Parameters:**
- `leagueId` (string, required) - ID de la liga

**Response (200 OK):**
```json
{
  "_id": "674league1",
  "leagueId": "laliga",
  "name": "La Liga",
  "country": "España",
  "logo": "🇪🇸",
  "type": "league",
  "seasons": ["2024-2025", "2023-2024"],
  "active": true
}
```

---

## 4. Users

### POST /api/users/register

Registra un nuevo usuario.

**Authentication:** No requerida

**Request Body:**
```json
{
  "username": "davidmora",
  "email": "david@example.com",
  "password": "SecurePass123!",
  "firstName": "David",
  "lastName": "Mora",
  "favoriteTeamId": "674abc123"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "_id": "674user123",
    "username": "davidmora",
    "email": "david@example.com",
    "firstName": "David",
    "lastName": "Mora",
    "favoriteTeamId": "674abc123",
    "role": "user",
    "active": true,
    "createdAt": "2024-11-26T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation Error (400 Bad Request):**
```json
{
  "statusCode": 400,
  "message": [
    "password must be longer than or equal to 6 characters",
    "email must be a valid email"
  ],
  "error": "Bad Request"
}
```

**Conflict Error (409 Conflict):**
```json
{
  "statusCode": 409,
  "message": "Username or email already exists",
  "error": "Conflict"
}
```

**Consumo en Frontend:**
```typescript
// src/components/AuthPage.tsx
const handleRegister = async (formData) => {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    setError(error.message);
    return;
  }
  
  const { user, token } = await response.json();
  localStorage.setItem('statfut-token', token);
  localStorage.setItem('statfut-user', JSON.stringify(user));
  setCurrentUser(user);
};
```

---

### POST /api/users/login

Inicia sesión.

**Authentication:** No requerida

**Request Body:**
```json
{
  "username": "davidmora",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "_id": "674user123",
    "username": "davidmora",
    "email": "david@example.com",
    "firstName": "David",
    "favoriteTeamId": "674abc123"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

**Consumo en Frontend:**
```typescript
// src/components/AuthPage.tsx
const handleLogin = async (username, password) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) throw new Error('Invalid credentials');
  
  const { user, token } = await response.json();
  localStorage.setItem('statfut-token', token);
  setCurrentUser(user);
};
```

---

### GET /api/users/me

Obtiene perfil del usuario autenticado.

**Authentication:** Requerida (JWT Bearer Token)

**Request Example:**
```http
GET /api/users/me HTTP/1.1
Host: localhost:3001
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "_id": "674user123",
  "username": "davidmora",
  "email": "david@example.com",
  "firstName": "David",
  "lastName": "Mora",
  "avatar": "https://example.com/avatar.jpg",
  "favoriteTeamId": "674abc123",
  "role": "user",
  "active": true,
  "createdAt": "2024-11-01T10:00:00.000Z"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Token no proporcionado",
  "error": "Unauthorized"
}
```

**Consumo en Frontend:**
```typescript
// src/components/ProfilePage.tsx
useEffect(() => {
  const token = localStorage.getItem('statfut-token');
  
  fetch(`${API_URL}/api/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => setProfile(data));
}, []);
```

---

## 5. Players

### GET /api/players

Obtiene lista de jugadores.

**Response (200 OK):**
```json
[
  {
    "_id": "674player123",
    "name": "Vinicius Jr",
    "teamId": "674abc123",
    "number": 7,
    "position": "FWD",
    "nationality": "Brasil",
    "goals": 15,
    "assists": 8,
    "appearances": 16
  }
]
```

---

### GET /api/players/team/:teamId

Obtiene jugadores de un equipo.

**Path Parameters:**
- `teamId` (string, required) - ID del equipo

**Response (200 OK):**
```json
[
  {
    "_id": "674player1",
    "name": "Thibaut Courtois",
    "number": 1,
    "position": "GK"
  },
  {
    "_id": "674player7",
    "name": "Vinicius Jr",
    "number": 7,
    "position": "FWD",
    "goals": 15,
    "assists": 8
  }
]
```

**Consumo en Frontend:**
```typescript
// src/components/TeamDetail.tsx
useEffect(() => {
  fetch(`${API_URL}/api/players/team/${teamId}`)
    .then(res => res.json())
    .then(data => setPlayers(data));
}, [teamId]);
```

---

## 6. News

### GET /api/news

Obtiene lista de noticias.

**Response (200 OK):**
```json
[
  {
    "_id": "674news123",
    "title": "Real Madrid gana el Clásico",
    "summary": "El Real Madrid venció 3-2 al Barcelona...",
    "content": "En un partido emocionante...",
    "source": "Marca",
    "image": "https://example.com/news1.jpg",
    "category": "match",
    "publishedDate": "2024-11-26T10:00:00.000Z",
    "tags": ["laliga", "clasico", "real-madrid"],
    "featured": true
  }
]
```

**Consumo en Frontend:**
```typescript
// src/components/NewsPage.tsx
useEffect(() => {
  fetch(`${API_URL}/api/news`)
    .then(res => res.json())
    .then(data => setNews(data));
}, []);
```

---

### GET /api/news/featured

Obtiene noticias destacadas.

**Response (200 OK):**
```json
[
  {
    "_id": "674news123",
    "title": "Real Madrid gana el Clásico",
    "summary": "El Real Madrid venció 3-2 al Barcelona...",
    "image": "https://example.com/news1.jpg",
    "featured": true,
    "publishedDate": "2024-11-26T10:00:00.000Z"
  }
]
```

---

## 7. Favorites

### GET /api/favorites

Obtiene favoritos del usuario autenticado.

**Authentication:** Requerida

**Request Example:**
```http
GET /api/favorites HTTP/1.1
Host: localhost:3001
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
[
  {
    "_id": "674fav1",
    "userId": "674user123",
    "teamId": "674abc123",
    "order": 0,
    "addedAt": "2024-11-20T10:00:00.000Z"
  },
  {
    "_id": "674fav2",
    "userId": "674user123",
    "teamId": "674abc456",
    "order": 1,
    "addedAt": "2024-11-21T14:30:00.000Z"
  }
]
```

**Consumo en Frontend:**
```typescript
// src/hooks/useFavorites.ts
const fetchFavorites = async () => {
  const token = localStorage.getItem('statfut-token');
  const response = await fetch(`${API_URL}/api/favorites`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const favorites = await response.json();
  setFavorites(favorites);
};
```

---

### POST /api/favorites

Agrega un equipo a favoritos.

**Authentication:** Requerida

**Request Body:**
```json
{
  "teamId": "674abc123"
}
```

**Response (201 Created):**
```json
{
  "_id": "674fav123",
  "userId": "674user123",
  "teamId": "674abc123",
  "order": 0,
  "addedAt": "2024-11-26T10:30:00.000Z"
}
```

---

### DELETE /api/favorites/:teamId

Elimina un equipo de favoritos.

**Authentication:** Requerida

**Path Parameters:**
- `teamId` (string, required) - ID del equipo

**Response (200 OK):**
```json
{
  "message": "Favorito eliminado correctamente"
}
```

---

## 8. Statistics

### GET /api/statistics/top-scorers

Obtiene máximos goleadores.

**Query Parameters:**
- `leagueId` (string, required) - ID de la liga
- `season` (string, required) - Temporada

**Request Example:**
```http
GET /api/statistics/top-scorers?leagueId=laliga&season=2024-2025 HTTP/1.1
Host: localhost:3001
```

**Response (200 OK):**
```json
[
  {
    "_id": "674stat1",
    "playerId": {
      "_id": "674player1",
      "name": "Robert Lewandowski",
      "number": 9,
      "teamId": {
        "_id": "674abc456",
        "name": "Barcelona",
        "logo": "🔴🔵"
      }
    },
    "goals": 18,
    "assists": 5,
    "minutesPlayed": 1350
  },
  {
    "_id": "674stat2",
    "playerId": {
      "name": "Jude Bellingham"
    },
    "goals": 15,
    "assists": 8
  }
]
```

**Consumo en Frontend:**
```typescript
// src/components/TablePage.tsx (pestaña "Top Scorers")
useEffect(() => {
  fetch(`${API_URL}/api/statistics/top-scorers?leagueId=${leagueId}&season=${season}`)
    .then(res => res.json())
    .then(data => setTopScorers(data));
}, [leagueId, season]);
```

---

### GET /api/statistics/top-assisters

Obtiene máximos asistidores.

**Query Parameters:**
- `leagueId` (string, required)
- `season` (string, required)

**Response (200 OK):**
```json
[
  {
    "playerId": {
      "name": "Vinicius Jr"
    },
    "assists": 12,
    "goals": 15
  }
]
```

---

## 9. Códigos de Estado HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| **200** | OK | Operación exitosa (GET, PATCH, DELETE) |
| **201** | Created | Recurso creado exitosamente (POST) |
| **400** | Bad Request | Validación de entrada fallida |
| **401** | Unauthorized | Sin autenticación o token inválido |
| **403** | Forbidden | Sin permisos suficientes |
| **404** | Not Found | Recurso no encontrado |
| **409** | Conflict | Conflicto (ej: email duplicado) |
| **500** | Internal Server Error | Error del servidor |

---

## 10. Formato de Errores

Todos los errores siguen este formato estándar:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

Con validación de DTOs:

```json
{
  "statusCode": 400,
  "message": [
    "name must be longer than or equal to 2 characters",
    "points must not be less than 0",
    "email must be a valid email"
  ],
  "error": "Bad Request"
}
```

---

## 11. Autenticación JWT

### Flujo de Autenticación

```
1. Usuario hace login/register
   ↓
2. Backend genera JWT token
   {
     "sub": "674user123",
     "username": "davidmora",
     "email": "david@example.com",
     "iat": 1732614000,
     "exp": 1733218800
   }
   ↓
3. Frontend almacena token en localStorage
   ↓
4. Frontend incluye token en requests protegidos:
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ↓
5. Backend valida token con AuthGuard
   ↓
6. Si válido → adjunta user al request
   Si inválido → retorna 401 Unauthorized
```

### Ejemplo de Uso en Frontend

```typescript
// Configuración de fetch con autenticación
const fetchWithAuth = async (url: string, options = {}) => {
  const token = localStorage.getItem('statfut-token');
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

// Uso
const response = await fetchWithAuth(`${API_URL}/api/users/me`);
const profile = await response.json();
```

---

**Documento Técnico:** Referencia de API REST - StatFut  
**Especificación:** OpenAPI 3.0  
**Versión de API:** 1.0  
**Autor:** David Mora  
**Fecha:** Noviembre 2025  
**Documentación Interactiva:** http://localhost:3001/api/docs
