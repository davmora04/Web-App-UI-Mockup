# 🎯 INSTRUCCIONES PARA INICIAR EL BACKEND

## 📋 Requisitos Previos

Necesitas tener instalado:
- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **Docker Desktop** (recomendado) - [Descargar](https://www.docker.com/products/docker-desktop/)
  - O **MongoDB** local (v7.0+) - [Descargar](https://www.mongodb.com/try/download/community)

---

## 🚀 OPCIÓN 1: Inicio Rápido con Docker (RECOMENDADO)

Esta es la forma más fácil y rápida. Docker instalará y configurará todo automáticamente.

### Paso 1: Navegar a la carpeta backend
```powershell
cd backend
```

### Paso 2: Instalar dependencias de Node.js
```powershell
npm install
```

### Paso 3: Iniciar con Docker Compose
```powershell
# Iniciar Backend + MongoDB
docker-compose up --build

# O en segundo plano (background)
docker-compose up -d
```

### Paso 4: Verificar que funciona
Abre tu navegador en:
- **API**: http://localhost:3001
- **Swagger Docs**: http://localhost:3001/api/docs

### Paso 5: Poblar datos de ejemplo (opcional)
```powershell
# En otra terminal
npm run seed
```

---

## 🔧 OPCIÓN 2: Inicio Manual (sin Docker)

Si prefieres no usar Docker, sigue estos pasos:

### Paso 1: Instalar MongoDB localmente
1. Descargar MongoDB Community: https://www.mongodb.com/try/download/community
2. Instalar MongoDB
3. Iniciar el servicio MongoDB

**Verificar que MongoDB está corriendo:**
```powershell
# En otra terminal
mongosh
# Deberías ver "Connected to: mongodb://127.0.0.1:27017"
```

### Paso 2: Navegar a la carpeta backend
```powershell
cd backend
```

### Paso 3: Instalar dependencias
```powershell
npm install
```

### Paso 4: Configurar variables de entorno
El archivo `.env` ya está configurado por defecto. Si MongoDB está en otro puerto, edítalo:
```env
MONGODB_URI=mongodb://localhost:27017/statfut
```

### Paso 5: Iniciar el backend
```powershell
npm run start:dev
```

### Paso 6: Verificar que funciona
Abre tu navegador en:
- **API**: http://localhost:3001
- **Swagger Docs**: http://localhost:3001/api/docs

### Paso 7: Poblar datos de ejemplo (opcional)
```powershell
# En otra terminal
npm run seed
```

---

## 🧪 Ejecutar Tests

```powershell
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests en modo watch
npm run test:watch
```

---

## 📊 Poblar Base de Datos

El script de seed crea datos de ejemplo:
- 2 Ligas (La Liga, Premier League)
- 3 Equipos (Real Madrid, Barcelona, Manchester City)
- 2 Usuarios de prueba

```powershell
npm run seed
```

**Credenciales de prueba:**
```
Admin:
- Email: admin@statfut.com
- Password: admin123

Usuario:
- Email: user@test.com
- Password: test123
```

---

## 🐳 Comandos Docker Útiles

```powershell
# Ver logs en tiempo real
docker-compose logs -f backend

# Reiniciar solo el backend
docker-compose restart backend

# Detener todo
docker-compose down

# Detener y eliminar datos (⚠️ borra la base de datos)
docker-compose down -v

# Ver contenedores corriendo
docker ps
```

---

## 🔍 Verificar que Todo Funciona

### 1. Health Check
```powershell
curl http://localhost:3001/
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2024-11-26T...",
  "service": "StatFut Backend API",
  "version": "1.0.0"
}
```

### 2. Swagger Documentation
Abre: http://localhost:3001/api/docs

Deberías ver la interfaz de Swagger con todos los endpoints.

### 3. Probar un Endpoint
```powershell
# Listar equipos
curl http://localhost:3001/api/teams

# Listar ligas
curl http://localhost:3001/api/leagues
```

---

## ❌ Solución de Problemas

### Error: "Puerto 3001 ya está en uso"
```powershell
# Opción 1: Cambiar puerto en .env
# Editar backend\.env y cambiar:
PORT=3002

# Opción 2: Encontrar y detener el proceso
netstat -ano | findstr :3001
# Luego terminar el proceso con su PID
taskkill /PID <numero> /F
```

### Error: "No se puede conectar a MongoDB"
```powershell
# Verificar que MongoDB está corriendo
docker ps | findstr mongo

# O si es local:
mongosh
```

### Error: "npm install falla"
```powershell
# Limpiar e instalar de nuevo
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Error: "Cannot find module ..."
```powershell
# Reinstalar dependencias
npm install
```

---

## 📁 Estructura de Archivos Importante

```
backend/
├── src/                   # Código fuente
│   ├── main.ts           # Punto de entrada
│   ├── app.module.ts     # Módulo principal
│   ├── teams/            # Módulo de equipos
│   ├── matches/          # Módulo de partidos
│   └── ...               # Otros módulos
├── scripts/
│   └── seed.js           # Script para poblar BD
├── .env                  # Variables de entorno
├── docker-compose.yml    # Configuración Docker
├── Dockerfile            # Imagen Docker
├── package.json          # Dependencias
└── README.md             # Documentación completa
```

---

## 📚 Próximos Pasos

1. ✅ **Iniciar backend** (Docker o manual)
2. ✅ **Poblar datos**: `npm run seed`
3. ✅ **Probar Swagger**: http://localhost:3001/api/docs
4. ✅ **Ejecutar tests**: `npm run test`
5. ✅ **Integrar con frontend**: Configurar CORS si es necesario

---

## 🆘 Ayuda Adicional

- **README completo**: `backend/README.md`
- **Guía rápida**: `backend/QUICKSTART.md`
- **Cumplimiento rúbrica**: `backend/RUBRICA_CUMPLIMIENTO.md`

---

## 🎉 ¡Listo!

El backend debería estar corriendo en **http://localhost:3001**

Para usar con el frontend, asegúrate de que el frontend esté configurado para apuntar a esta URL.
