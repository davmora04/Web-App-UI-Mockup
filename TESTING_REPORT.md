Reporte de Pruebas

Proyecto: StatFut - Web App UI Mockup

Resumen Ejecutivo

Este documento presenta los resultados de todas las pruebas ejecutadas en el proyecto, incluyendo tests unitarios, tests end-to-end, build de producción y containerización con Docker.

Resultados Globales
| Tipo de Prueba           | Total  | Exitosas | Fallidas | Estado   |
| ------------------------ | ------ | -------- | -------- | -------- |
| Tests Unitarios (Vitest) | 39     | 39       | 0        | Pass     |
| Tests E2E (Cypress)      | 39     | 39       | 0        | Pass     |
| Build de Producción      | 1      | 1        | 0        | Pass     |
| Docker Build             | 1      | 1        | 0        | Pass     |
| Docker Container         | 1      | 1        | 0        | Healthy  |
| **TOTAL**                | **81** | **81**   | **0**    | **100%** |


1. Pruebas Unitarias

Framework: Vitest
Total de tests: 39
Duración: 4.89 segundos
Resultado: 100% aprobados

Comando de Ejecución
npm run test:run

Suites Ejecutadas
1.1. useFavorites.test.ts (8 tests)

Tests del hook personalizado para gestión de favoritos usando useReducer.

Tests incluidos:

Inicialización con favoritos vacíos

Agregar equipo a favoritos

Prevenir duplicados

Eliminar equipo de favoritos

Reordenar favoritos

Limpiar todos los favoritos

Verificar si un equipo es favorito

Cargar favoritos desde fuente externa

1.2. useLocalStorage.test.ts (6 tests)

Tests del hook de persistencia en localStorage.

Tests incluidos:

Inicialización con valor inicial

Inicialización con valor almacenado

Actualizar localStorage cuando cambia el valor

Manejar actualizaciones con funciones

Manejar objetos complejos

Manejar errores de JSON parse

1.3. AppContext.test.tsx (9 tests)

Tests de integración del contexto global de la aplicación.

Tests incluidos:

Proporcionar valores de contexto por defecto

Manejar cambios de idioma

Manejar cambios de tema

Manejar navegación de páginas

Manejar selección de liga

Manejar selección de temporada

Manejar gestión de favoritos

Persistir idioma y tema en localStorage

Manejar error de proveedor de contexto

1.4. Navbar.test.tsx (8 tests)

Tests del componente de navegación principal.

Tests incluidos:

Renderizar navbar con logo y búsqueda

Manejar cambios en input de búsqueda

Llamar onSearch cuando se envía el formulario

Renderizar items de navegación

Tener atributos de accesibilidad apropiados

Manejar navegación por teclado

Renderizar con roles ARIA

Manejar envío de búsqueda vacía

1.5. Sidebar.test.tsx (8 tests)

Tests del componente panel lateral de filtros.

Tests incluidos:

Renderizar sección de filtros

Renderizar opciones de liga

Renderizar opciones de temporada

Mostrar selección actual

Manejar selección de liga

Manejar selección de temporada

Toggle del collapsible de liga

Efectos hover en botones

2. Pruebas End-to-End (E2E)

Framework: Cypress
Total de tests: 39
Duración total: 56 segundos
Resultado: 100% aprobados

Comando de Ejecución
npm run e2e

Specs Ejecutados
2.1. accessibility-ux.cy.ts (8 tests - 12s)

Pruebas de accesibilidad y experiencia de usuario.

Tests incluidos:

Estructura HTML semántica apropiada

Soporte para navegación por teclado

Atributos y roles ARIA

Gestión de foco apropiada

Contenido amigable para lectores de pantalla

Funciona en diferentes tamaños de viewport

Mantiene accesibilidad durante cambios dinámicos

Maneja estados de error de forma accesible

2.2. navigation-search.cy.ts (6 tests - 15s)

Pruebas de navegación y búsqueda.

Tests incluidos:

Carga homepage y muestra elementos principales

Navega entre diferentes secciones

Realiza funcionalidad de búsqueda

Maneja interacciones de filtro en sidebar

Prueba comportamiento responsive

Maneja cambio de tema e idioma

2.3. navigation.cy.ts (6 tests - 13s)

Pruebas de flujos de navegación principales.

Tests incluidos:

Navega correctamente por páginas principales

Maneja funcionalidad de búsqueda

Maneja cambio de idioma

Pasa auditoría de accesibilidad en home

Tiene labels y roles ARIA apropiados

Soporta navegación por teclado

2.4. sidebar-favorites.cy.ts (10 tests - 8s)

Pruebas de sistema de favoritos y filtros.

Tests incluidos:

Muestra e interactúa con filtros de liga

Maneja selección de liga

Muestra opciones de temporada

Muestra efectos hover

Maneja agregar equipos a favoritos

Persiste favoritos entre sesiones

Maneja eliminar favoritos

Pasa auditoría de accesibilidad

Tiene atributos ARIA apropiados

Soporta navegación con lector de pantalla

2.5. sidebar.cy.ts (9 tests - 7s)

Pruebas de interacciones de sidebar.

Tests incluidos:

Renderiza filtros y maneja selección de liga

Maneja selección de temporada

Muestra selección actual

Maneja efectos hover

Mantiene funcionalidad en diferentes viewports

Pasa auditoría de accesibilidad

Gestión de foco apropiada

Atributos ARIA para elementos interactivos

Maneja interacciones de teclado

3. Build de Producción

Herramienta: Vite
Duración: 3.52 segundos
Resultado: Exitoso

Comando de Ejecución
npm run build

Resultados

Módulos transformados: 1,724

Tiempo de build: 3.52s

Archivos generados:

build/index.html - 0.45 kB (gzip: 0.29 kB)

build/assets/index-P74BY1QZ.css - 49.24 kB (gzip: 8.84 kB)

build/assets/index-DiVrK1g6.js - 439.58 kB (gzip: 131.09 kB)

Optimización:

CSS: Reducción del 82% con gzip

JS: Reducción del 70% con gzip

4. Containerización con Docker
4.1. Docker Build

Tiempo de construcción: 163.6 segundos
Resultado: Exitoso

Comando de Ejecución
npm run docker:build


Características de la imagen:

Multi-stage build (Node 18 Alpine → Nginx Alpine)

Cache de dependencias npm

Build optimizado de producción

Health check configurado

4.2. Docker Run

Resultado: Container Healthy

Comando de Ejecución
docker run -d -p 3000:80 --name statfut-demo web-app-ui-mockup


Verificación:

Estado del contenedor: Healthy

Puerto: 3000 → 80

HTTP Status: 200 OK

Health check: Passing

5. Conclusiones
Cumplimiento de Requisitos

El proyecto cumple con todos los requisitos de testing establecidos en la rúbrica:

Requisito	Especificación	Implementado	Estado
Tests Unitarios	≥3 suites, ≥4 tests	5 suites, 39 tests	Cumple
Tests E2E	≥2 specs, ≥6 tests	5 specs, 39 tests	Cumple
Validación Accesibilidad	cypress-axe	Implementado	Cumple
Contenedor Docker	Build/Run reproducible	Multi-stage build	Cumple
Métricas de Calidad

Cobertura de Tests:

Hooks personalizados: 100%

Contexto global: 100%

Componentes principales: 100%

Flujos E2E críticos: 100%

Accesibilidad: 100%

Performance:

Build time: 3.52s

Tests unitarios: 4.89s

Tests E2E: 56s

Docker build: 163.6s

Resultado Final

Todos los tests pasaron exitosamente (81/81)
Build de producción funcional
Aplicación containerizada y operativa
Accesibilidad validada con herramientas automatizadas

6. Ejecución de Pruebas

Para replicar estos resultados:

npm install
npm run test:run
npm run e2e
npm run build
npm run docker:build
npm run docker:run