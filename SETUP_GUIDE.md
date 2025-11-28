# 🚀 Guía de Setup - Frontend + Backend Integrados

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación Rápida](#instalación-rápida)
3. [Poblar Base de Datos](#poblar-base-de-datos)
4. [Ejecutar Frontend + Backend](#ejecutar-frontend--backend)
5. [Probar Login y Flujos](#probar-login-y-flujos)
6. [Variables de Entorno](#variables-de-entorno)
7. [Troubleshooting](#troubleshooting)

---

## 📋 Requisitos Previos

Asegúrate de tener instalado:
- **Node.js 18.x+** ([Descargar](https://nodejs.org/))
- **npm 9.x+** (incluido con Node.js)
- **MongoDB 6.0+** corriendo localmente o en la nube
  - Local: `mongodb://localhost:27017/statfut`
  - Atlas: Configura `MONGODB_URI` en `.env` del backend

---

## 🚀 Instalación Rápida

### 1. Clonar el repositorio
```powershell
git clone https://github.com/davmora04/Web-App-UI-Mockup.git
cd Web-App-UI-Mockup
```

### 2. Instalar dependencias del Frontend
```powershell
npm install
```

### 3. Instalar dependencias del Backend
```powershell
cd backend
npm install
cd ..
```

---

## 🌱 Poblar Base de Datos

El script de seed crea automáticamente:
- 2 ligas (La Liga, Premier League)
- 3 equipos (Real Madrid, Barcelona, Manchester City)
- 2 usuarios de prueba
- 3 partidos
- 6 jugadores
- 4 noticias
- 6 estadísticas

### Ejecutar el Seed

```powershell
# Desde el directorio raíz
cd backend
npm run seed
cd ..
```

### Credenciales de Prueba

Después del seed, puedes usar:

```
Email: admin@statfut.com
Password: admin123

Email: user@test.com
Password: test123
```

---

## ▶️ Ejecutar Frontend + Backend

### Opción 1: Dos Terminales (Recomendado para Desarrollo)

**Terminal 1 - Backend:**
```powershell
cd backend
npm run start:dev
```

Backend estará disponible en: **http://localhost:3001**

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

Frontend estará disponible en: **http://localhost:5173**

### Opción 2: Una Terminal (Secuencial)

```powershell
# Backend en background
cd backend
npm run start:dev &

# Frontend (bloquea terminal)
cd ..
npm run dev
```

### Opción 3: Docker Compose

```powershell
# Desde el directorio raíz
docker-compose up --build

# Frontend: http://localhost:5173
# Backend: http://localhost:3001
# MongoDB: localhost:27017
```

---

## 🧪 Probar Login y Flujos

### 1. Acceder a la Aplicación
- Abre http://localhost:5173 en tu navegador

### 2. Hacer Login
- Click en "Auth" o navega a la sección de login
- Usa credenciales:
  ```
  Email: admin@statfut.com
  Password: admin123
  ```

### 3. Verificar que los Datos se Cargan desde Backend
- **Home:** Deberías ver partidos de La Liga/Premier League
- **Tabla:** Muestra equipos reales de la BD (Real Madrid, Barcelona, etc.)
- **Noticias:** Muestra artículos del seed
- **Calendario:** Próximos partidos del backend

### 4. Probar Favoritos
- Navega a un equipo (ej: Real Madrid)
- Marca como favorito (corazón)
- Los favoritos se sincronizarán con el backend cuando estés autenticado

---

## 🔧 Variables de Entorno

### Frontend (.env.local)

```env
# URL del backend (ya configurada por defecto)
VITE_API_URL=http://localhost:3001

# Modo debug (opcional)
VITE_DEBUG_MODE=false
```

### Backend (.env)

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/statfut

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# API
API_PREFIX=api
PORT=3001
FRONTEND_URL=http://localhost:5173
```

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
```
✗ Solución: Asegúrate que MongoDB está corriendo
- Local: mongodb://localhost:27017
- O configura MONGODB_URI en backend/.env
```

### Error: "Port 3001 already in use"
```
✗ Cambiar puerto:
export PORT=3002  # Linux/Mac
set PORT=3002     # Windows
npm run start:dev
```

### Error: "Port 5173 already in use"
```
✗ Vite usará el siguiente puerto disponible automáticamente
O especifica puerto: npm run dev -- --port 5174
```

### Error: "CORS error"
```
✗ Backend debe estar corriendo en http://localhost:3001
✗ Verifica que FRONTEND_URL está en backend/.env:
FRONTEND_URL=http://localhost:5173
```

### Error: "Login fallido"
```
✗ Verifica que el seed se ejecutó:
cd backend && npm run seed
✗ Credenciales correctas:
  - Email: admin@statfut.com (no username)
  - Password: admin123
```

### Error: "No veo datos en la tabla/home"
```
✗ Verifica:
1. Backend está corriendo (http://localhost:3001/api/teams)
2. Seed se ejecutó correctamente
3. Abre browser dev tools (F12) → Network → verifica calls a /api/teams
4. Si hay error, verifica MongoDB está conectado
```

---

## 📊 Estructura de la Integración

### Flujo de Datos

```
Frontend (React)
    ↓
src/services/api.ts  (funciones de fetch transformadas)
    ↓
http://localhost:3001/api/*  (endpoints del backend)
    ↓
Backend (NestJS)
    ↓
MongoDB
    ↓
Backend devuelve datos transformados
    ↓
Frontend convierte a formato UI con transformers
    ↓
AppContext actualiza estado
    ↓
Componentes re-renderean con datos reales
```

### Endpoints Principales

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| GET | `/api/teams` | No | Lista de equipos |
| GET | `/api/leagues` | No | Lista de ligas |
| GET | `/api/news` | No | Últimas noticias |
| GET | `/api/matches/upcoming` | No | Próximos partidos |
| POST | `/api/users/login` | No | Login (devuelve token) |
| POST | `/api/users/register` | No | Registro |
| GET | `/api/users/me` | Sí (JWT) | Perfil del usuario |
| POST | `/api/favorites/teams/:teamId` | Sí | Agregar favorito |

---

## 📚 Documentación Adicional

- **API_REFERENCE.md** - Referencia completa de endpoints
- **DATABASE_SCHEMA.md** - Esquema de MongoDB
- **README.md** - Documentación del proyecto principal

---

## ✅ Checklist de Verificación

- [ ] Node.js 18.x+ instalado (`node --version`)
- [ ] npm 9.x+ instalado (`npm --version`)
- [ ] MongoDB corriendo localmente o conectado (`mongosh`)
- [ ] Dependencias instaladas (`npm install && cd backend && npm install`)
- [ ] Seed ejecutado (`cd backend && npm run seed`)
- [ ] Backend corriendo (`npm run start:dev` desde `/backend`)
- [ ] Frontend corriendo (`npm run dev` desde `/`)
- [ ] Login exitoso con admin@statfut.com / admin123
- [ ] Datos visibles en Home, Tabla, Noticias
- [ ] Favoritos funcionan

---

## 🎉 ¡Listo!

Si todos los pasos fueron exitosos, tienes:

✅ Frontend consumiendo datos reales del backend  
✅ Login funcional con JWT  
✅ Base de datos poblada con datos de ejemplo  
✅ Sistema de favoritos integrado  
✅ Todas las funcionalidades del UI mockup ahora con datos reales  

**Pregunta adicional?** Revisa los logs de:
- Backend: `http://localhost:3001` (consola de Node)
- Frontend: Abre DevTools (F12) → Console/Network
- MongoDB: `mongosh` y ejecuta `db.teams.find()` para verificar datos

---

**Desenvolvimiento:** Noviembre 2025  
**Autor:** David Mora  
**GitHub:** [@davmora04](https://github.com/davmora04)
