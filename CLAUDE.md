# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

**PULSE HUB** is a B2B web platform for **Ecos de Liderazgo**, designed as a human-technological ecosystem for ethical and effective AI adoption in enterprises. The platform focuses on three core pillars: AI Training (Capacitación IA), Daily Adoption (Adopción Diaria), and High-Impact Automation (Automatización).

**Current Branch**: `Integracion-agente` (main branch: `main`)

**Key Features**:
- Marketing website with 8 pages (homepage, about, 3 pillars, case studies, resources, contact)
- Voice-enabled conversational AI agent (in `agente-ia-conversacional-main/` subdirectory)
- Monorepo architecture with separate web and API applications
- Screaming Architecture pattern (organized by business features, not technical layers)

## 🏗️ Architecture

### Monorepo Structure

This is a **monorepo** using npm workspaces with the following structure:

```
PULSE-HUB/
├── apps/
│   ├── web/                    # Next.js 15 frontend (App Router)
│   └── api/                    # Express.js backend
├── packages/
│   ├── shared/                 # Shared code between apps (types, constants, utils)
│   └── ui/                     # Reusable UI components (future use)
├── agente-ia-conversacional-main/  # Voice AI agent (separate sub-project)
└── docs/                       # Comprehensive documentation
```

### Screaming Architecture Pattern

The codebase follows **Screaming Architecture** (Robert C. Martin):
- Structure "screams" about business domain (auth, users, dashboard), not framework
- Features are self-contained and organized by business capability
- Dependencies flow one direction: `features/` → `core/` → `shared/`

**Frontend Structure (`apps/web/src/`)**:
```
├── app/                    # Next.js App Router pages
├── features/               # Business features (auth, users, dashboard)
│   ├── auth/
│   ├── users/
│   └── dashboard/
├── core/                   # Business logic (services, stores)
│   ├── services/
│   └── stores/
└── shared/                 # Infrastructure (UI components, hooks, utils)
    ├── components/
    ├── hooks/
    └── utils/
```

**Backend Structure (`apps/api/src/`)**:
```
├── features/               # Business features
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   └── auth.types.ts
│   └── users/
├── core/                   # Middleware, config, utils
└── shared/                 # Shared types and constants
```

**Key Rule**: If a component/function knows about business domain → put in `features/`. If it's generic infrastructure → put in `shared/`.

## 🚀 Development Commands

### Starting Development (Windows)

**Recommended Method** - Use provided scripts to open separate terminal windows:
```bash
.\start-dev.bat
# or
.\start-dev.ps1
```

**Alternative Methods**:
```bash
# Option 1: Run both apps concurrently (requires concurrently package)
npm run dev

# Option 2: Manual (requires 2 terminals)
# Terminal 1:
cd apps/web
npm run dev

# Terminal 2:
cd apps/api
npm run dev
```

**Development URLs**:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Backend Health Check: http://localhost:4000/health

### Building and Testing

```bash
# Build all apps
npm run build

# Build specific app
npm run build:web
npm run build:api

# Linting
npm run lint

# Format code with Prettier
npm run format

# Clean build artifacts
npm run clean
```

### Working with the Voice AI Agent

The `agente-ia-conversacional-main/` directory contains a separate Node.js/TypeScript project:

```bash
cd agente-ia-conversacional-main

# Install dependencies (if not already installed)
npm install

# Start the voice agent server
npm start

# Run evaluations
npm run evals

# Run tracing system
npm run tracing:demo
```

See `agente-ia-conversacional-main/CLAUDE.md` for detailed guidance on that subproject.

## 🎨 Design System

### Color Palette

The design system uses a carefully chosen palette defined in `apps/web/src/app/globals.css`:

**Primary (Blue)**:
- `--primary-600: #1F5AF6` - Primary buttons, links, CTAs
- `--primary-100: #E8EFFD` - Soft backgrounds, hover states

**Neutral (Grays)**:
- `--neutral-900: #0A1633` - Main text, dark footer
- `--neutral-600: #5B6472` - Secondary text
- `--neutral-200: #E3E8F0` - Borders, dividers
- `--neutral-100: #F7F9FB` - Subtle backgrounds

**Accent Colors**:
- `--accent-orange: #FF7A45` - Key CTAs, urgency
- `--accent-green: #10B981` - Success, positive metrics
- `--accent-red: #EF4444` - Errors, alerts
- `--accent-yellow: #F59E0B` - Warnings

### Typography

- **Font**: Inter (Google Fonts, configured in `layout.tsx`)
- **Scales**: 12/14/16/18/24/32/40px
- **Line Height**: 1.25 (headings), 1.45 (body)

### Component Library

**Reusable Components** (`apps/web/src/shared/components/`):

- **Button** - 3 variants (primary, secondary, tertiary), 3 sizes (sm, md, lg)
- **Card** - Shadow, radius, hover effects
- **Navbar** - Sticky with scroll-triggered background transition
- **Footer** - 4-section layout with social links
- **WavesSVG** - Animated wave graphics for hero sections
- **AnimatedSection** - Scroll-triggered fade-in animations
- **AnnouncementBanner** - Top banner for announcements

**Component Pattern**:
```typescript
// Each component has:
ComponentName/
├── ComponentName.tsx       # Main component
├── index.ts               # Barrel export
└── [optional effects].tsx # Additional effects/utilities
```

### Animations

- **Framer Motion** for advanced animations
- **Transition Duration**: 160-300ms with custom easings
- **Scroll Animations**: Intersection Observer-based fade-in/slide-up
- **Hover Effects**: Scale + shadow on cards and buttons
- **Counter Animations**: Number count-up for metrics
- **Carousel**: Automatic testimonial rotation

## 📦 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript 5.9** - Static typing
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion 12** - Advanced animations
- **Lucide React** - Modular icons
- **Zustand 5** - State management
- **Axios** - HTTP client

### Backend
- **Node.js 20 LTS** - JavaScript runtime
- **Express 4** - Web framework
- **TypeScript** - Static typing
- **Zod** - Schema validation
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing

### Development Tools
- **npm workspaces** - Monorepo management
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking and compilation

## 🔧 Common Development Tasks

### Adding a New Page

1. **Create page component**:
```bash
# Client component pattern (recommended for interactivity)
touch apps/web/src/app/new-page/NewPageClient.tsx
touch apps/web/src/app/new-page/page.tsx
```

2. **Implement client component** (`NewPageClient.tsx`):
```typescript
'use client';

import { Navbar, Footer } from '@/shared/components';

export default function NewPageClient() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Your content */}
      </main>
      <Footer />
    </>
  );
}
```

3. **Create page wrapper** (`page.tsx`):
```typescript
import NewPageClient from './NewPageClient';

export default function NewPage() {
  return <NewPageClient />;
}
```

4. **Update Navbar** links in `apps/web/src/shared/components/Navbar/Navbar.tsx`

### Adding a New Feature (Backend)

Following Screaming Architecture:

1. **Create feature directory**:
```bash
mkdir apps/api/src/features/my-feature
```

2. **Create feature files**:
```typescript
// my-feature.types.ts
export interface MyFeatureDTO {
  id: string;
  name: string;
}

// my-feature.service.ts
export class MyFeatureService {
  async getItems(): Promise<MyFeatureDTO[]> {
    // Business logic
  }
}

// my-feature.controller.ts
export class MyFeatureController {
  async getItems(req, res) {
    // Handle HTTP request/response
  }
}

// my-feature.routes.ts
import { Router } from 'express';
export const myFeatureRoutes = Router();
myFeatureRoutes.get('/items', controller.getItems);
```

3. **Register routes** in `apps/api/src/server.ts`:
```typescript
import { myFeatureRoutes } from './features/my-feature/my-feature.routes';
app.use('/api/v1/my-feature', myFeatureRoutes);
```

### Creating a Shared UI Component

1. **Create component directory**:
```bash
mkdir apps/web/src/shared/components/MyComponent
touch apps/web/src/shared/components/MyComponent/MyComponent.tsx
touch apps/web/src/shared/components/MyComponent/index.ts
```

2. **Implement component**:
```typescript
// MyComponent.tsx
'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils';

const myComponentVariants = cva('base-classes', {
  variants: {
    variant: {
      primary: 'primary-classes',
      secondary: 'secondary-classes'
    },
    size: {
      sm: 'small-classes',
      md: 'medium-classes',
      lg: 'large-classes'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});

interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  // Additional props
}

export function MyComponent({
  variant,
  size,
  className,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// index.ts
export { MyComponent } from './MyComponent';
```

3. **Export from barrel** (`apps/web/src/shared/components/index.ts`):
```typescript
export * from './MyComponent';
```

### Adding Animations

Use Framer Motion for animations:

```typescript
'use client';

import { motion } from 'framer-motion';

export function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
}
```

For scroll-triggered animations, use the `AnimatedSection` component:

```typescript
import { AnimatedSection } from '@/shared/components';

<AnimatedSection>
  <h2>This fades in when scrolled into view</h2>
</AnimatedSection>
```

## 📋 Environment Variables

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=PULSE HUB
```

### Backend (`apps/api/.env`)
```env
PORT=4000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
ALLOWED_ORIGINS=http://localhost:3000
API_VERSION=v1
```

### Voice AI Agent (`agente-ia-conversacional-main/.env`)
```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=1000
CODA_API_KEY=your_coda_api_key
CODA_DOC_ID=your_doc_id
CODA_TABLE_ID=your_table_id
```

## 📚 Documentation Structure

The `docs/` directory contains comprehensive documentation:

```
docs/
├── design/             # Design system and UI decisions
│   ├── DESIGN-SYSTEM-PROMPT.md
│   └── DESIGN-DECISIONS.md
├── product/            # Product requirements and strategy
│   ├── PRD-PULSE-HUB.md
│   └── ESTRATEGIA-ADOPCION-IA.md
├── guides/             # Getting started and troubleshooting
│   ├── GETTING_STARTED.md
│   ├── QUICK-START-VISUAL.md
│   ├── SOLUCION-RAPIDA.md
│   └── DONDE-ABRIR.md
└── reference/          # Technical reference
    ├── ARCHITECTURE.md
    ├── COMMANDS.md
    ├── EXAMPLES.md
    ├── STATUS.md
    └── CONTACTO-PAGE.md
```

**Key Documents**:
- **Architecture**: `docs/reference/ARCHITECTURE.md` - Detailed explanation of Screaming Architecture
- **Design System**: `docs/design/DESIGN-SYSTEM-PROMPT.md` - Complete design tokens and guidelines
- **PRD**: `docs/product/PRD-PULSE-HUB.md` - Product requirements and roadmap
- **Commands**: `docs/reference/COMMANDS.md` - Common development commands

## 🎯 Code Quality Standards

### TypeScript Configuration

- **Target**: ES2020 with CommonJS modules (root) / ESNext (Next.js)
- **Strict Mode**: Enabled for all projects
- **Unused Variables**: Error for unused locals and parameters
- **Source Maps**: Enabled for debugging

### ESLint Rules

- **Unused Variables**: Error (except those starting with `_`)
- **Explicit Return Types**: Off (inferred)
- **Any Type**: Warning (avoid when possible)

### Component Standards

When creating components:
1. Use TypeScript with explicit interfaces
2. Use `class-variance-authority` for variants
3. Include default props for common cases
4. Support all states: default, hover, focus, disabled
5. Use the `cn()` utility for className merging
6. Export through barrel files (`index.ts`)

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `AnimatedSection`)
- **Files**: Match component name (e.g., `Button.tsx`)
- **Utilities**: camelCase (e.g., `formatDate`, `cn`)
- **Types/Interfaces**: PascalCase with descriptive names (e.g., `UserDTO`, `AuthResponse`)
- **Routes**: kebab-case (e.g., `/casos-de-exito`, `/capacitacion-ia`)

### Accessibility (WCAG 2.2 AA)

All components must meet:
- ✅ Contrast ratio ≥ 4.5:1
- ✅ Focus visible (ring-2) on interactive elements
- ✅ Full keyboard navigation
- ✅ Target size ≥ 44×44px for touch targets
- ✅ Support for `prefers-reduced-motion`

## 🚨 Important Notes

### Git Workflow

**Main Branches**:
- `main` - Production branch
- `Integracion-agente` - Current integration branch (active)

**Before Committing**:
```bash
npm run lint              # Check for linting errors
npm run format            # Format code with Prettier
npm run build             # Verify builds successfully
```

### Monorepo Package References

When importing from workspace packages:

```typescript
// In apps/web or apps/api
import { UserRole } from '@pulse-hub/shared';
```

Package names are defined in each `package.json`:
- `@pulse-hub/web` - Frontend app
- `@pulse-hub/api` - Backend app
- `@pulse-hub/shared` - Shared code
- `@pulse-hub/ui` - UI components

### Next.js App Router Conventions

- **Server Components**: Default (no `'use client'`)
- **Client Components**: Require `'use client'` directive at top
- **Layouts**: Use `layout.tsx` for shared layouts
- **Loading States**: Use `loading.tsx` in route directories
- **Error Boundaries**: Use `error.tsx` in route directories
- **Metadata**: Export `metadata` object from server components

### Tailwind CSS Usage

Use CSS variables for colors (defined in `globals.css`):

```tsx
// ✅ Good - uses design system
<div className="bg-primary-600 text-neutral-900">

// ❌ Avoid - hardcoded colors
<div className="bg-[#1F5AF6] text-[#0A1633]">
```

## 🔍 Troubleshooting

**"Module not found" errors in monorepo**:
```bash
# Rebuild shared package
npm run build --workspace=packages/shared
```

**Next.js hydration errors**:
- Ensure client components have `'use client'` directive
- Check for mismatched HTML between server and client
- Verify no browser-only APIs in server components

**Port already in use**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill processes on both ports if needed
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

**TypeScript errors after pulling changes**:
```bash
# Reinstall dependencies
npm install

# Clean and rebuild
npm run clean
npm run build
```

**Styling not working**:
- Verify Tailwind classes are in `content` paths in `tailwind.config.ts`
- Check CSS variable definitions in `globals.css`
- Ensure no typos in class names

## 📞 Additional Resources

- **README**: `/README.md` - Project overview and quick start
- **Documentation Index**: `/docs/INDEX.md` - Complete documentation map
- **Architecture Deep Dive**: `/docs/reference/ARCHITECTURE.md`
- **Agent Documentation**: `/agente-ia-conversacional-main/CLAUDE.md`

**Contact**: fernando.suarez@ecosdeliderazgo.com

---

**Last Updated**: January 2025
**Version**: 1.1 - Comprehensive guidance for Claude Code
