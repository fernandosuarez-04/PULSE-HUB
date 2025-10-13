# PULSE HUB

Plataforma web B2B desarrollada para **Ecos de Liderazgo** - Ecosistema humano-tecnológico para la adopción de IA ética y efectiva en empresas.

> **Tres Pilares:** Capacitación IA | Adopción Diaria | Automatización de Alto Impacto

## 🎨 Design System & Identidad Visual

### Concepto: "Ecos de Liderazgo"
Ondas de expansión que representan comunidad, diálogo y movimiento. Diseño limpio con geometría modular, blancos generosos e ilustraciones abstractas humano-IA.

### Paleta de Colores

```css
/* Primary - Azul */
--primary-600: #1F5AF6   /* Botones, links, CTAs principales */
--primary-100: #E8EFFD   /* Fondos suaves, hover states */

/* Neutral - Grises */
--neutral-900: #0A1633   /* Texto principal, footer oscuro */
--neutral-600: #5B6472   /* Texto secundario */
--neutral-200: #E3E8F0   /* Bordes, separadores */
--neutral-100: #F7F9FB   /* Fondos sutiles */

/* Accent - Énfasis */
--accent-orange: #FF7A45  /* CTAs clave, urgencia */
--accent-green: #10B981   /* Éxito, métricas positivas */
--accent-red: #EF4444     /* Errores, alertas */
--accent-yellow: #F59E0B  /* Warnings, precaución */
```

### Tipografía
- **Fuente:** Inter (Google Fonts)
- **Escalas:** 12/14/16/18/24/32/40px
- **Line-height:** 1.25 (headings), 1.45 (body)

### Accesibilidad (WCAG 2.2 AA)
- ✅ Contraste ≥ 4.5:1
- ✅ Focus visible (ring-2) en todos los elementos interactivos
- ✅ Navegación por teclado completa
- ✅ Target size ≥ 44×44px
- ✅ Soporte `prefers-reduced-motion`

## 🚀 Stack Tecnológico

### Frontend
- **Next.js 15** - Framework de React con App Router
- **TypeScript 5.9** - Tipado estático
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animaciones avanzadas
- **Lucide React** - Iconos modulares
- **Zustand** - State Management
- **Axios** - Cliente HTTP

### Backend
- **Node.js 20 LTS** - Runtime
- **Express 4** - Framework web
- **TypeScript** - Tipado estático
- **Zod** - Validación de esquemas

### Arquitectura
- **Monorepo** - npm workspaces
- **Screaming Architecture** - Organización por features/dominio
- **Component-driven** - UI reutilizable y escalable

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

## 🎯 Homepage Implementada

### Secciones Principales

1. **Hero con Ondas Animadas**
   - Badge flotante "Ecosistema de Adopción de IA"
   - Título principal con "liderazgo humano" destacado
   - 2 CTAs: "Evaluar mi madurez" + "Ver casos de éxito"
   - 3 métricas inline con iconos
   - Background con ondas SVG animadas (concepto "Ecos")

2. **Tres Pilares**
   - Cards con iconos diferenciados por color
   - **Pilar 1 (Capacitación)** - Azul: IA para Todos
   - **Pilar 2 (Adopción Diaria)** - Naranja: IA en el Día a Día
   - **Pilar 3 (Automatización)** - Verde: Alto Impacto
   - Bullets informativos y links de exploración

3. **Resultados Medibles**
   - Fondo azul intenso con métricas destacadas
   - Counter animations en números
   - 4 tiles: +38% eficiencia, –20% tiempo, <12 meses ROI, 95% adopción

4. **Cómo Funciona**
   - Metodología "Ecos" en 3 fases
   - Cards numeradas: 01 Descubrir, 02 Diseñar, 03 Desplegar
   - Iconos: lupa, paleta, cohete

5. **Testimonios**
   - Carousel automatizado (cada 5s)
   - Navegación con flechas y dots
   - Transiciones suaves entre slides

6. **CTA Final + Footer**
   - Fondo oscuro con llamado a la acción
   - Footer con 4 columnas: Logo, Pilares, Recursos, Contacto
   - Links legales y redes sociales

### Animaciones Implementadas
- ✨ Ondas animadas con loop infinito en hero
- ✨ Fade-in + slide-up al hacer scroll (intersection observer)
- ✨ Counter animations en métricas
- ✨ Carousel automatizado en testimonios
- ✨ Hover effects en cards y botones (scale + shadow)
- ✨ Transiciones suaves (160-300ms) con easings personalizados

## 🧩 Componentes UI Creados

### Componentes Base (`apps/web/src/shared/components/`)

#### Button
**Ubicación:** `Button/Button.tsx`

Variantes:
- `primary` - Fondo naranja (#FF7A45), texto blanco
- `secondary` - Borde azul (#1F5AF6), texto azul
- `tertiary` - Solo texto azul, sin fondo

Tamaños:
- `sm` - h-9, px-3, text-sm
- `md` - h-11, px-6, text-base
- `lg` - h-13, px-8, text-lg

Estados: hover, focus-visible (ring-2), disabled

#### Card
**Ubicación:** `Card/Card.tsx`

- Shadow base y radius de 12px
- Padding de 24px (p-6)
- Hover opcional con scale 1.02 y shadow-md
- Transiciones suaves (200ms)

#### WavesSVG
**Ubicación:** `WavesSVG/WavesSVG.tsx`

- 3 ondas SVG con gradientes
- Animación infinita con framer-motion
- Opacidades variables (0.3, 0.2, 0.15)
- Duraciones diferentes (8s, 10s, 12s) para efecto orgánico

#### Navbar
**Ubicación:** `Navbar/Navbar.tsx`

- Sticky con transición transparente → blanco al scroll
- Logo Pulse Hub (imagen PNG)
- 7 links de navegación
- Botón CTA "Agendar Demo"
- Menú hamburger responsive en mobile
- Animaciones con framer-motion

## ⚙️ Preferencias de Diseño Establecidas

> **Contexto para futuros desarrollos:** Estas decisiones se tomaron en base a las necesidades del proyecto y deben mantenerse consistentes.

### 1. Iconos e Imágenes
**Selección:** ✅ Combinación de Lucide React + SVGs personalizados
- Lucide React para iconos estándar (UI, navegación)
- SVGs personalizados para elementos únicos (ondas, ilustraciones)

### 2. Nivel de Animaciones
**Selección:** ✅ Intermedias-Avanzadas
- Ondas animadas en hero con loop infinito
- Transiciones suaves entre secciones (fade-in + slide-up)
- Counter animations en métricas numéricas
- Carousel automatizado en testimonios
- Parallax sutil (a implementar en versiones futuras)

### 3. Navegación
**Selección:** ✅ Sticky (fijo al hacer scroll)
- Navbar siempre visible
- Transición suave: transparente arriba → fondo blanco + sombra al scroll
- Mejora la accesibilidad y navegación

### 4. Estructura de Componentes
**Selección:** ✅ Híbrido
- Página principal (`page.tsx`) con secciones inline para facilitar iteraciones
- Componentes UI reutilizables (`Button`, `Card`, `Navbar`, etc.) separados en `/shared/components`
- Balance entre velocidad de desarrollo y reutilización

### 5. Responsive Design
**Selección:** ✅ Mobile-first con optimizaciones para desktop
- Diseño base desde 360px
- Breakpoints: Mobile (360-767px), Tablet (768-1023px), Desktop (1024px+)
- Grid adaptativo en secciones (1 col → 2 col → 3 col)
- Hamburger menu en mobile

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
- `framer-motion` - Animaciones avanzadas
- `lucide-react` - Librería de iconos
- `clsx`, `tailwind-merge` - Utilidades para clases CSS
- `class-variance-authority` - Variantes de componentes
- `@radix-ui/*` - Componentes UI accesibles

### Backend
- `express` - Framework web
- `cors`, `helmet`, `morgan` - Middleware
- `dotenv` - Variables de entorno
- `zod` - Validación
- `nodemon`, `ts-node` - Desarrollo

## 📚 Documentación Completa

> **Toda la documentación está organizada en `/docs`** - [Ver Índice Completo](./docs/INDEX.md)

### Estructura de Documentación

```
docs/
├── design/          # Sistema de diseño y decisiones UX/UI
│   ├── DESIGN-SYSTEM-PROMPT.md      # Tokens, colores, tipografía
│   └── DESIGN-DECISIONS.md          # Decisiones de diseño documentadas
│
├── product/         # Requisitos de producto y roadmap
│   └── PRD-PULSE-HUB.md            # Product Requirements Document completo
│
├── guides/          # Guías de inicio y configuración
│   ├── GETTING_STARTED.md           # Guía de inicio completa
│   ├── QUICK-START-VISUAL.md        # Guía visual
│   ├── START.md                     # Instrucciones de arranque
│   ├── SOLUCION-RAPIDA.md          # Troubleshooting
│   └── DONDE-ABRIR.md              # Configuración de IDE
│
└── reference/       # Documentación de referencia
    ├── COMMANDS.md                  # Comandos útiles
    ├── EXAMPLES.md                  # Ejemplos de código
    └── STATUS.md                    # Estado del proyecto
```

### Acceso Rápido por Tipo

| Necesitas... | Ve a... |
|--------------|---------|
| 🎨 Colores, tipografía, tokens | [`docs/design/DESIGN-SYSTEM-PROMPT.md`](./docs/design/DESIGN-SYSTEM-PROMPT.md) |
| 🤔 Entender decisiones de diseño | [`docs/design/DESIGN-DECISIONS.md`](./docs/design/DESIGN-DECISIONS.md) |
| 📊 Requisitos funcionales y KPIs | [`docs/product/PRD-PULSE-HUB.md`](./docs/product/PRD-PULSE-HUB.md) |
| 🚀 Empezar a desarrollar | [`docs/guides/GETTING_STARTED.md`](./docs/guides/GETTING_STARTED.md) |
| ⚡ Comandos frecuentes | [`docs/reference/COMMANDS.md`](./docs/reference/COMMANDS.md) |
| 🐛 Solucionar problemas | [`docs/guides/SOLUCION-RAPIDA.md`](./docs/guides/SOLUCION-RAPIDA.md) |

**Ver índice completo:** [`docs/INDEX.md`](./docs/INDEX.md)

### Próximos Pasos (Roadmap V1.1)

#### Páginas Pendientes
- [ ] Página "Sobre Nosotros" (manifiesto, equipo, metodología)
- [ ] Páginas de Pilares individuales (Capacitación, Adopción, Automatización)
- [ ] Casos de Éxito con filtros y modales
- [ ] AI Academy / Recursos
- [ ] Test de Madurez IA (interactivo, 7-9 preguntas)
- [ ] Contacto con formulario + Calendly

#### Funcionalidades
- [ ] Integración Calendly para demos
- [ ] Sistema de analítica (PostHog/Plausible)
- [ ] Biblioteca de prompts con función copiar
- [ ] Formularios con validación Zod
- [ ] SEO on-page completo (Schema.org)
- [ ] Banner de cookies + LFPDPPP

#### Optimizaciones
- [ ] Optimización de imágenes (WebP, lazy loading)
- [ ] Code splitting y optimización de bundle
- [ ] Service Worker para caché (PWA)
- [ ] Testing E2E con Playwright
- [ ] Lighthouse score > 90 en todas las métricas

## 🎓 Buenas Prácticas para Desarrollo

### Al Crear Nuevas Páginas
1. Seguir el design system establecido (tokens de `globals.css`)
2. Usar componentes existentes de `/shared/components`
3. Implementar animaciones con framer-motion
4. Asegurar responsive design (mobile-first)
5. Validar accesibilidad (WCAG 2.2 AA)

### Al Crear Nuevos Componentes
1. TypeScript con interfaces exportadas
2. Variantes con `class-variance-authority`
3. Props con valores por defecto sensatos
4. Estados: default, hover, focus, disabled
5. Documentar uso con comentarios JSDoc

### Control de Calidad
```bash
# Antes de commit
npm run lint              # ESLint
npm run format            # Prettier
npm run build             # Verificar que compila

# Accesibilidad (manual)
- Navegación por teclado (Tab, Enter, Escape)
- Lighthouse en Chrome DevTools
- Lector de pantalla (NVDA/VoiceOver)
```

## 👥 Equipo

Desarrollado por el equipo de **Ecos de Liderazgo**

**Contacto:** fernando.suarez@ecosdeliderazgo.com

## 📄 Licencia

Privado - Todos los derechos reservados  
Página web de Pulse Hub - Conectando equipos, impulsando ideas con IA

---

**Última actualización:** Enero 2025  
**Versión:** 1.0 - Homepage implementada
