# 🚀 GUÍA DE INSTALACIÓN Y EJECUCIÓN RÁPIDA

## ⚡ Instalación y Ejecución (5 minutos)

### Paso 1: Instalar Dependencias
```bash
cd backend
npm install
```

### Paso 2: Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus valores (opcional, funciona con valores por defecto)
```

### Paso 3: Iniciar con Docker (RECOMENDADO)
```bash
# Inicia Backend + MongoDB automáticamente
docker-compose up --build

# O en segundo plano
docker-compose up -d
```

**El backend estará disponible en:**
- API: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

### Paso 4 (Alternativa): Ejecución Sin Docker

**Requisitos**: MongoDB instalado y corriendo en `localhost:27017`

```bash
# Terminal 1: Iniciar MongoDB (si no está corriendo)
mongod

# Terminal 2: Iniciar Backend
npm run start:dev
```

---

## 📝 Poblar Base de Datos con Datos de Ejemplo

```bash
# Ejecutar script de seed (crear después de instalar)
node scripts/seed.js
```

---

## 🧪 Ejecutar Tests

```bash
# Tests unitarios
npm run test

# Con cobertura
npm run test:cov
```

---

## 🐳 Comandos Docker Útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f backend

# Reiniciar solo el backend
docker-compose restart backend

# Detener todo
docker-compose down

# Detener y eliminar datos (⚠️ borra DB)
docker-compose down -v
```

---

## 📊 Verificar que Funciona

1. **Health Check**: http://localhost:3001/
2. **Swagger Docs**: http://localhost:3001/api/docs
3. **Info**: http://localhost:3001/info

---

## ❌ Solución de Problemas

### Puerto 3001 ocupado
```bash
# Cambiar puerto en .env
PORT=3002
```

### MongoDB no conecta
```bash
# Verificar que MongoDB está corriendo
docker ps | grep mongo

# O manualmente
mongosh
```

### Dependencias con errores
```bash
# Limpiar e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Siguientes Pasos

1. **Poblar datos**: Ejecutar seed script
2. **Probar endpoints**: Usar Swagger o Postman
3. **Integrar con frontend**: Configurar CORS en `.env`
4. **Crear usuario**: `POST /api/users/register`
5. **Login**: `POST /api/users/login` → obtener token
6. **Usar token**: Headers `Authorization: Bearer <token>`

---

## 🎯 Resumen de Comandos

```bash
# Instalación completa con Docker
cd backend
npm install
docker-compose up --build

# Verificar
curl http://localhost:3001/

# Tests
npm run test

# Detener
docker-compose down
```

**✅ ¡Listo para desarrollo!**
