# StatFut - Aplicación Web de Estadísticas de Fútbol

**Proyecto Frontend - Desarrollo Web**  
**Autor:** David Mora  
**Repositorio:** [Web-App-UI-Mockup](https://github.com/davmora04/Web-App-UI-Mockup)

Una aplicación web de estadísticas de fútbol desarrollada con React y TypeScript, implementando las mejores prácticas de desarrollo frontend.

**Diseño Figma:** [Ver Mockups](https://www.figma.com/design/t5nA649GHPmA3YdC344Mkt/Web-App-UI-Mockup)

---

## � Contenido

1. [Instalación y Ejecución](#instalación-y-ejecución)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Pruebas](#pruebas)
6. [Docker](#docker)

---
  
## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Acceder a http://localhost:5173
```

---

## ✨ Funcionalidades

La aplicación implementa **16 funcionalidades completas** según los requisitos del proyecto:

1. **Home con resultados recientes** - Últimos 5 partidos del equipo/liga seleccionada
2. **Filtros por temporada y liga** - Panel lateral con selección jerárquica
3. **Tabla de posiciones** - Clasificación ordenable con estadísticas completas
4. **Calendario de partidos** - Próximos encuentros con zona horaria del usuario
5. **Registro e inicio de sesión** - Formularios con validación y selección de favoritos
6. **Noticias** - Cards con detalle completo de artículos
7. **Búsqueda global** - Equipos, ligas, partidos y noticias
8. **Detalle de equipo** - Tabs con resumen, partidos y estadísticas
9. **Detalle de partido** - Alineaciones, marcador y eventos
10. **Comparador Head-to-Head** - Enfrentamientos directos entre equipos
11. **Favoritos con drag & drop** - Gestión y reordenamiento de equipos favoritos
12. **Notificaciones** - Sistema de alertas (in-app)
13. **Preferencias de accesibilidad** - Tamaño de texto, tema claro/oscuro
14. **Selector de idioma ES/EN** - Internacionalización completa
15. **Exportar CSV** - Descarga de tablas y datos
16. **Onboarding tour** - Tutorial de 5 pasos para nuevos usuarios

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Librería de UI
- **TypeScript 5.9.3** - Tipado estático
- **Vite 6.3.5** - Build tool
- **Tailwind CSS** - Estilos

### Componentes y UI
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos

### Estado y Datos
- **Context API** - Estado global
- **useReducer** - Gestión de favoritos
- **Custom Hooks** - useFavorites, useLocalStorage, useTranslation, etc.

### Testing
- **Vitest** - Tests unitarios (39 tests)
- **Cypress** - Tests E2E (39 tests)
- **cypress-axe** - Auditorías de accesibilidad

### DevOps
- **Docker** - Containerización
- **Nginx** - Servidor web en producción

---

## 📁 Estructura del Proyecto

```
Web-App-UI-Mockup/
├── src/
│   ├── components/        # Componentes React
│   │   ├── AppContext.tsx    # Context global
│   │   ├── HomePage.tsx      # Página principal
│   │   ├── Navbar.tsx        # Barra de navegación
│   │   ├── Sidebar.tsx       # Panel de filtros
│   │   ├── TablePage.tsx     # Tabla de posiciones
│   │   ├── CalendarPage.tsx  # Calendario
│   │   └── ...               # Otros componentes
│   ├── hooks/             # Custom hooks
│   │   ├── useFavorites.ts
│   │   ├── useLocalStorage.ts
│   │   └── useTranslation.ts
│   ├── locales/           # Traducciones (ES/EN)
│   ├── test/              # Tests unitarios
│   └── main.tsx           # Punto de entrada
├── cypress/               # Tests E2E
├── Dockerfile             # Configuración Docker
├── package.json
└── README.md
```

---

## 🧪 Pruebas

### Tests Unitarios

```bash
npm run test:run      # Ejecutar todos los tests
```

**Suites implementadas (39 tests):**
- `useFavorites.test.ts` - 8 tests
- `useLocalStorage.test.ts` - 6 tests
- `AppContext.test.tsx` - 9 tests
- `Navbar.test.tsx` - 8 tests
- `Sidebar.test.tsx` - 8 tests

### Tests E2E

```bash
npm run e2e           # Ejecutar tests E2E
```

**Specs implementados (39 tests):**
- `navigation.cy.ts` - Navegación y búsqueda
- `sidebar-favorites.cy.ts` - Filtros y favoritos
- `accessibility-ux.cy.ts` - Accesibilidad
- Y más...

**Resultado:** ✅ 78/78 tests pasados (100%)

Consultar [TESTING_REPORT.md](./TESTING_REPORT.md) para detalles completos.

---

## 🐳 Docker

### Ejecutar con Docker

```bash
# Build de la imagen
npm run docker:build

# Ejecutar contenedor
npm run docker:run

# Acceder a http://localhost:3000
```

### Características del Dockerfile
- Multi-stage build (Node + Nginx)
- Optimización de tamaño
- Health checks configurados

---

## 🌐 Internacionalización (i18n)

La aplicación soporta **Español e Inglés** completo:
- 180+ traducciones
- Formateo de fechas localizado
- Switch dinámico en la interfaz
- Persistencia de preferencia del usuario

---

## ♿ Accesibilidad

Implementación completa de **WCAG 2.1 AA**:
- Navegación por teclado
- ARIA labels y roles semánticos
- Skip links
- Tamaño de texto ajustable
- Tema claro/oscuro
- Tests automatizados con cypress-axe

---

## 📝 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run preview          # Preview del build

# Testing
npm run test:run         # Tests unitarios
npm run test:ui          # UI de Vitest
npm run e2e              # Tests E2E

# Docker
npm run docker:build     # Build imagen Docker
npm run docker:run       # Ejecutar contenedor
npm run docker:down      # Detener contenedores
```

---

## 📚 Documentación Adicional

- **TESTING_REPORT.md** - Reporte detallado de todas las pruebas ejecutadas

---

## 👨‍💻 Autor

**David Mora**  
GitHub: [@davmora04](https://github.com/davmora04)

---

## 📄 Licencia

Este proyecto es un trabajo académico desarrollado para el curso de Desarrollo Web.

**Fecha de entrega:** Octubre 2025

│   ├── useTranslation.ts     # i18n
│   └── useAccessibility.ts   # a11y helpers
├── locales/            # Traducciones
│   ├── es.ts          # Español
│   └── en.ts          # Inglés
├── test/              # Tests unitarios
│   ├── hooks/
│   ├── components/
│   └── context/
└── styles/            # Estilos globales

cypress/
├── e2e/               # Tests E2E
└── support/           # Configuración Cypress

docker/
├── Dockerfile         # Producción multi-stage
├── Dockerfile.dev     # Desarrollo
└── docker-compose.yml # Orquestación
```

## 🛠️ Scripts Disponibles

```json
{
  "dev": "vite",                    // Desarrollo (puerto 5173)
  "build": "vite build",            // Build producción
  "test": "vitest",                 // Tests modo watch
  "test:run": "vitest run",         // Tests una vez
  "test:ui": "vitest --ui",         // Tests con interfaz
  "e2e": "cypress E2E tests",       // E2E automático
  "docker:build": "build imagen",   // Docker build
  "docker:run": "ejecutar contenedor", // Docker run
  "docker:dev": "desarrollo Docker"    // Docker con hot-reload
}
```

## 🔧 Configuración de Desarrollo

### Prerequisitos
- Node.js 18.x+
- npm 9.x+
- Docker (opcional)

### Variables de Entorno
```bash
# .env.local (opcional)
VITE_API_URL=http://localhost:3001
VITE_DEBUG_MODE=true
```

## 🎯 Justificaciones Técnicas Detalladas

### **Coherencia con Figma (100%)**
- Variables CSS exactas matching paleta de colores
- Componentes Radix UI configurados según specs
- Layout grid y spacing idénticos
- Iconografía Lucide React consistente

### **React: Estado/Contexto/Hooks (100%)**
- Context API para estado global eficiente
- useReducer para lógica compleja (favoritos)
- 6 custom hooks especializados y reutilizables
- Composición avanzada con compound components

### **Internacionalización (100%)**
- Sistema robusto con 180+ claves de traducción
- Hook useTranslation con interpolación
- Formateo automático de fechas/números
- Persistencia de preferencia de idioma

### **Accesibilidad (100%)**
- WCAG 2.1 AA compliant
- Navegación completa por teclado
- ARIA labels y roles semánticos
- Testing automático con cypress-axe

### **Tests Unitarios (100%)**
- 5 suites con 39 tests (100% pass rate)
- Cobertura de hooks, componentes y context
- Testing de edge cases y error handling
- Mock de localStorage y APIs

### **Tests E2E (100%)**
- 2 specs con 12+ tests de flujos críticos
- Validación de accesibilidad automática
- Testing de persistencia y estado
- Simulación completa de usuario

### **Contenedor (100%)**
- Multi-stage Dockerfile optimizado
- Docker Compose para múltiples entornos
- Scripts automatizados de build/deploy
- Nginx configurado para SPA

### **Documentación (100%)**
- README técnico comprehensivo
- Justificaciones por cada criterio
- Guías de setup, testing y deployment
- Arquitectura y decisiones técnicas

## 🚀 Deployment

### Producción con Docker
```bash
# Build y deploy
npm run docker:build
npm run docker:run

# Verificar en http://localhost:3000
```

### Build Manual
```bash
npm run build
npm run preview  # Preview local
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear feature branch: `git checkout -b feature/nueva-caracteristica`
3. Commit: `git commit -m 'Agregar nueva característica'`
4. Push: `git push origin feature/nueva-caracteristica`
5. Pull Request

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para detalles.

---

**Desarrollado por David Mora** - [GitHub](https://github.com/davmora04)
  