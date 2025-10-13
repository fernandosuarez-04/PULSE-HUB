# Arquitectura del Proyecto - Pulse Hub

## 🏛️ Screaming Architecture

Este proyecto sigue los principios de **Screaming Architecture** propuesta por Robert C. Martin (Uncle Bob), donde la estructura de carpetas "grita" sobre el dominio del negocio, no sobre los frameworks técnicos.

> **Principio:** Al ver la estructura de carpetas, deberías saber inmediatamente QUÉ hace la aplicación (autenticación, usuarios, dashboard), no con QUÉ está construida (controllers, services, models).

---

## 📁 Estructura General del Monorepo

```
PULSE-HUB/
├── apps/                    # Aplicaciones principales
│   ├── web/                # Frontend (Next.js)
│   └── api/                # Backend (Express)
│
├── packages/               # Paquetes compartidos
│   ├── shared/            # Lógica compartida entre apps
│   └── ui/                # Componentes UI reutilizables
│
├── docs/                  # 📚 Documentación organizada
│   ├── design/           # Sistema de diseño
│   ├── product/          # PRD y requisitos
│   ├── guides/           # Guías de inicio
│   └── reference/        # Referencia técnica
│
└── [archivos de config]   # package.json, tsconfig, etc.
```

---

## 🎯 Frontend: apps/web/

### Estructura Siguiendo Screaming Architecture

```
apps/web/src/
│
├── app/                        # Next.js App Router (infraestructura)
│   ├── layout.tsx             # Layout raíz
│   ├── page.tsx               # Homepage
│   └── globals.css            # Estilos globales + tokens
│
├── features/                   # 🎯 DOMINIO DEL NEGOCIO (lo que grita)
│   ├── auth/                  # Feature: Autenticación
│   │   ├── hooks/            
│   │   │   └── useAuth.ts    # Hook de autenticación
│   │   ├── types.ts          # Tipos específicos de auth
│   │   └── index.ts          # Barrel export
│   │
│   ├── users/                 # Feature: Gestión de usuarios
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   └── dashboard/             # Feature: Dashboard
│       ├── components/        # Componentes específicos de dashboard
│       └── index.ts
│
├── core/                      # Lógica de negocio transversal
│   ├── services/             
│   │   └── api.ts            # Cliente HTTP configurado
│   │
│   └── stores/               
│       └── authStore.ts      # Estado global de autenticación
│
└── shared/                    # Código compartido (infraestructura)
    ├── components/           # Componentes UI reutilizables
    │   ├── Button/
    │   ├── Card/
    │   ├── Navbar/
    │   └── WavesSVG/
    │
    ├── hooks/                # Hooks genéricos
    │   └── useDebounce.ts
    │
    └── utils/                # Utilidades
        └── cn.ts             # classnames helper
```

### ✅ Por Qué Esta Estructura es "Screaming Architecture"

**❌ NO organizado por tipos técnicos:**
```
❌ components/     (¿componentes de qué?)
❌ hooks/          (¿hooks para qué?)
❌ services/       (¿servicios de qué?)
```

**✅ SÍ organizado por dominio:**
```
✅ features/auth/           (¡Autenticación! Sé que hay login/registro)
✅ features/users/          (¡Usuarios! Sé que hay gestión de usuarios)
✅ features/dashboard/      (¡Dashboard! Sé que hay panel de control)
```

### Reglas de Organización

#### 1. `/features` - Dominio del Negocio
**Qué va aquí:**
- Funcionalidades orientadas al usuario final
- Cada carpeta es una característica independiente
- Autocontenida (todo lo necesario para esa feature)

**Estructura típica de una feature:**
```
features/nombre-feature/
├── components/          # Componentes específicos de esta feature
├── hooks/              # Hooks específicos
├── types.ts            # Tipos TypeScript de esta feature
├── utils.ts            # Utilidades específicas (opcional)
└── index.ts            # Barrel export
```

**Ejemplos:**
- `features/auth/` - Login, registro, recuperación de contraseña
- `features/users/` - CRUD de usuarios, perfil
- `features/pilares/` - Tres pilares de Pulse Hub
- `features/casos-exito/` - Casos de éxito con filtros

#### 2. `/core` - Lógica de Negocio Transversal
**Qué va aquí:**
- Servicios que usan múltiples features
- State management global
- Configuración de librerías

**No confundir con `/shared`:**
- `/core` → Lógica de **negocio** (stores, servicios de dominio)
- `/shared` → Infraestructura **técnica** (componentes UI, utils)

#### 3. `/shared` - Infraestructura Técnica
**Qué va aquí:**
- Componentes UI genéricos (Button, Card, Modal)
- Hooks técnicos (useDebounce, useMediaQuery)
- Utilidades puras (formatters, validators)

**Regla:** Si el componente/hook NO sabe del dominio de negocio, va en `/shared`.

#### 4. `/app` - Next.js App Router
**Qué va aquí:**
- Solo infraestructura de Next.js
- Layouts, páginas, metadata
- Loading, error states

**Mantener delgado:** Las páginas importan de `/features`, no implementan lógica.

---

## 🔧 Backend: apps/api/

### Estructura Siguiendo Screaming Architecture

```
apps/api/src/
│
├── features/                   # 🎯 DOMINIO DEL NEGOCIO
│   ├── auth/                  # Feature: Autenticación
│   │   ├── auth.controller.ts # Maneja requests HTTP
│   │   ├── auth.service.ts    # Lógica de negocio
│   │   ├── auth.routes.ts     # Definición de rutas
│   │   └── auth.types.ts      # Tipos y DTOs
│   │
│   └── users/                 # Feature: Gestión de usuarios
│       ├── users.controller.ts
│       ├── users.service.ts
│       ├── users.routes.ts
│       └── users.types.ts
│
├── core/                      # Infraestructura transversal
│   ├── middleware/           
│   │   ├── auth.middleware.ts    # Middleware de autenticación
│   │   ├── errorHandler.ts       # Manejo global de errores
│   │   └── validation.middleware.ts
│   │
│   ├── config/               
│   │   └── index.ts              # Configuración (env vars, etc.)
│   │
│   └── utils/                
│       └── index.ts              # Utilidades genéricas
│
├── shared/                    # Compartido entre features
│   ├── constants/            
│   │   └── index.ts              # Constantes globales
│   │
│   └── types/                
│       └── index.ts              # Tipos compartidos
│
└── server.ts                  # Punto de entrada de la aplicación
```

### Estructura Típica de una Feature (Backend)

```
features/nombre-feature/
├── nombre-feature.controller.ts   # Capa de presentación (HTTP)
├── nombre-feature.service.ts      # Lógica de negocio
├── nombre-feature.routes.ts       # Definición de rutas
├── nombre-feature.types.ts        # DTOs y tipos
└── nombre-feature.middleware.ts   # Middleware específico (opcional)
```

**Flujo de una Request:**
```
HTTP Request 
  → routes.ts (define ruta)
  → middleware (validación, auth)
  → controller.ts (maneja request/response)
  → service.ts (lógica de negocio)
  → (database/external API)
  → service.ts (transforma respuesta)
  → controller.ts (formatea HTTP response)
  → HTTP Response
```

---

## 📦 Packages Compartidos

### packages/shared/

**Código compartido entre frontend y backend**

```
packages/shared/src/
├── types/              # Tipos compartidos (User, Auth, etc.)
├── constants/          # Constantes globales
└── utils/              # Utilidades puras (validators, formatters)
```

**Uso:**
```typescript
// En frontend o backend
import { UserRole } from '@pulse-hub/shared';
```

### packages/ui/

**Componentes UI reutilizables** (futuro)

Actualmente los componentes están en `apps/web/src/shared/components`. Cuando crezca el número de componentes y se necesiten en múltiples apps, se migrarán aquí.

---

## 🎯 Principios Clave

### 1. Feature-First (Dominio Primero)

**❌ Mal - Organización por tipo técnico:**
```
controllers/
  auth.controller.ts
  users.controller.ts
services/
  auth.service.ts
  users.service.ts
```

**✅ Bien - Organización por dominio:**
```
features/
  auth/
    auth.controller.ts
    auth.service.ts
  users/
    users.controller.ts
    users.service.ts
```

### 2. Autocontención

Cada feature debe ser **autocontenida**:
- Todo lo necesario para esa feature está en su carpeta
- Minimiza dependencias entre features
- Facilita eliminar/modificar features sin romper otras

### 3. Dependencias Unidireccionales

```
features/ 
  ↓ puede importar
core/
  ↓ puede importar
shared/

❌ shared/ NO debe importar de features/
❌ core/ NO debe importar de features/
```

### 4. Screaming vs. Framework

**La estructura debe gritar sobre:**
- ✅ ¿Qué hace la aplicación? (auth, users, dashboard)
- ✅ ¿Qué problemas resuelve? (capacitación IA, casos de éxito)

**No sobre:**
- ❌ ¿Con qué framework? (Next.js, Express)
- ❌ ¿Qué patrones técnicos? (MVC, Repository)

---

## 🆕 Cómo Agregar una Nueva Feature

### Ejemplo: Agregar "Casos de Éxito"

#### Frontend

1. **Crear carpeta de feature:**
```bash
mkdir apps/web/src/features/casos-exito
```

2. **Estructura mínima:**
```
features/casos-exito/
├── components/
│   ├── CasoCard.tsx
│   ├── CasoModal.tsx
│   └── CasoFilters.tsx
├── hooks/
│   └── useCasos.ts
├── types.ts
└── index.ts
```

3. **Implementar:**
```typescript
// types.ts
export interface Caso {
  id: string;
  titulo: string;
  industria: string;
  metricas: Metrica[];
}

// hooks/useCasos.ts
export function useCasos() {
  // Lógica para obtener casos
}

// index.ts (barrel export)
export * from './types';
export * from './hooks/useCasos';
export { CasoCard } from './components/CasoCard';
```

4. **Usar en página:**
```typescript
// app/casos/page.tsx
import { CasoCard, useCasos } from '@/features/casos-exito';
```

#### Backend

1. **Crear carpeta de feature:**
```bash
mkdir apps/api/src/features/casos
```

2. **Estructura:**
```
features/casos/
├── casos.controller.ts
├── casos.service.ts
├── casos.routes.ts
└── casos.types.ts
```

3. **Implementar:**
```typescript
// casos.types.ts
export interface CreateCasoDTO {
  titulo: string;
  descripcion: string;
}

// casos.service.ts
export class CasosService {
  async getCasos() { ... }
  async createCaso(data: CreateCasoDTO) { ... }
}

// casos.controller.ts
export class CasosController {
  constructor(private casosService: CasosService) {}
  async getCasos(req, res) { ... }
}

// casos.routes.ts
import { CasosController } from './casos.controller';
export const casosRoutes = Router();
casosRoutes.get('/casos', controller.getCasos);
```

4. **Registrar rutas:**
```typescript
// server.ts
import { casosRoutes } from './features/casos/casos.routes';
app.use('/api', casosRoutes);
```

---

## 🔍 Cuándo Va en Cada Lugar

### ¿Es una Feature o va en Shared?

**Pregunta:** ¿El componente/función conoce el dominio de negocio?

- **SÍ conoce el dominio** → `/features`
  - Ejemplo: `CasoCard`, `PilarSelector`, `TestMaturity`
  
- **NO conoce el dominio** → `/shared`
  - Ejemplo: `Button`, `Modal`, `useDebounce`

### ¿Va en Core o en Shared?

- **`/core`** → Lógica de **negocio** transversal
  - Stores de Zustand (authStore, appStore)
  - Servicios de dominio (API client configurado)
  
- **`/shared`** → Infraestructura **técnica** pura
  - Componentes UI genéricos
  - Hooks técnicos
  - Utilidades puras (no conocen el negocio)

---

## 📚 Referencias

### Screaming Architecture
- [The Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [Screaming Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)

### Feature-Sliced Design (Similar)
- [Feature-Sliced Design](https://feature-sliced.design/)

### Monorepo Best Practices
- [Monorepo Tools](https://monorepo.tools/)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

---

## ✅ Checklist para Nueva Feature

- [ ] Crear carpeta en `/features` con nombre descriptivo del dominio
- [ ] Incluir `index.ts` para barrel exports
- [ ] Tipos en `types.ts` (no dispersos)
- [ ] Componentes en `components/` (si frontend)
- [ ] Lógica de negocio en `service.ts` (si backend)
- [ ] Rutas en `routes.ts` (si backend)
- [ ] Tests en `__tests__/` dentro de la feature
- [ ] Documentar en `reference/STATUS.md`

---

**Última actualización:** Enero 2025  
**Mantenido por:** Equipo de Arquitectura - Pulse Hub

