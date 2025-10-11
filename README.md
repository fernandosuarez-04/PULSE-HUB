# PULSE HUB

Plataforma web desarrollada para **Ecos de Liderazgo** utilizando tecnologías modernas y arquitectura escalable.

## 🚀 Stack Tecnológico

### Frontend
- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos
- **Zustand** - State Management
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **Zod** - Validación de esquemas

### Arquitectura
- **Monorepo** - Gestión de múltiples proyectos
- **Screaming Architecture** - Organización por features/dominio
- **Workspaces de npm** - Compartir código entre proyectos

## 📁 Estructura del Proyecto

```
PULSE-HUB/
├── apps/
│   ├── web/                    # Aplicación Next.js (Frontend)
│   │   └── src/
│   │       ├── app/            # Next.js App Router
│   │       ├── features/       # Features por dominio
│   │       │   ├── auth/
│   │       │   ├── users/
│   │       │   └── dashboard/
│   │       ├── shared/         # Código compartido del frontend
│   │       │   ├── components/
│   │       │   ├── hooks/
│   │       │   └── utils/
│   │       └── core/           # Lógica de negocio
│   │           ├── services/
│   │           └── stores/
│   │
│   └── api/                    # API Express (Backend)
│       └── src/
│           ├── features/       # Features por dominio
│           │   ├── auth/
│           │   │   ├── auth.controller.ts
│           │   │   ├── auth.service.ts
│           │   │   ├── auth.routes.ts
│           │   │   └── auth.types.ts
│           │   └── users/
│           ├── core/           # Middleware y config
│           │   ├── middleware/
│           │   ├── config/
│           │   └── utils/
│           ├── shared/         # Tipos y constantes
│           └── server.ts
│
└── packages/
    ├── shared/                 # Código compartido entre apps
    │   └── src/
    │       ├── types/
    │       ├── constants/
    │       └── utils/
    └── ui/                     # Componentes UI reutilizables
        └── src/
            └── components/
```

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias de todo el monorepo
npm install
```

## 🚀 Comandos de Desarrollo

### Inicio Rápido (WINDOWS) ⭐

**Opción 1 - Usar scripts (RECOMENDADO):**
```bash
.\start-dev.bat
# O
.\start-dev.ps1
```

Esto abrirá 2 ventanas separadas con Frontend y Backend.

**Opción 2 - Con npm (requiere configuración adicional):**
```bash
npm run dev
```

**Opción 3 - Manual (2 terminales):**
```bash
# Terminal 1
cd apps/web
npm run dev

# Terminal 2 (nueva terminal)
cd apps/api
npm run dev
```

### URLs Activas
- 🎨 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:4000

### Detener
- Scripts: Cierra las ventanas
- npm run dev: `Ctrl + C`
- Manual: `Ctrl + C` en cada terminal

### Build
```bash
# Build completo
npm run build

# Build individual
npm run build:web
npm run build:api
```

### Otros comandos
```bash
# Linting
npm run lint

# Formateo con Prettier
npm run format

# Limpiar builds
npm run clean
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Health Check**: http://localhost:4000/health

## 📝 Variables de Entorno

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=PULSE HUB
```

### Backend (`apps/api/.env`)
```env
PORT=4000
NODE_ENV=development
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000
```

## 🏗️ Principios de Arquitectura

### Screaming Architecture
La estructura de carpetas "grita" sobre las features del dominio del negocio, no sobre los frameworks:
- Cada feature es autocontenida con sus propios controladores, servicios, tipos y rutas
- El código compartido está claramente separado
- Fácil de navegar y mantener

### Monorepo Benefits
- **Código compartido**: Tipos y utilidades reutilizables entre frontend y backend
- **Versionado unificado**: Un solo repositorio para toda la aplicación
- **Desarrollo simplificado**: Cambios sincronizados entre proyectos
- **Build optimizado**: Compila solo lo necesario

## 🔐 Autenticación

El proyecto incluye una estructura base para autenticación JWT con:
- Login y registro de usuarios
- Refresh tokens
- Middleware de autenticación y autorización
- Gestión de estado con Zustand

## 📦 Paquetes Instalados

### Frontend
- `next`, `react`, `react-dom` - Core de Next.js
- `zustand` - State management
- `axios` - HTTP client
- `tailwindcss` - Styling
- `clsx`, `tailwind-merge` - Utilidades para clases CSS
- `@radix-ui/*` - Componentes UI accesibles

### Backend
- `express` - Framework web
- `cors`, `helmet`, `morgan` - Middleware
- `dotenv` - Variables de entorno
- `zod` - Validación
- `nodemon`, `ts-node` - Desarrollo

## 👥 Equipo

Desarrollado por el equipo de **Ecos de Liderazgo**

## 📄 Licencia

Privado - Todos los derechos reservados
Pagina web de PulseHub - Conectando Equipos impulsando ideas
