# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

**PULSE HUB** is a B2B web platform for **Ecos de Liderazgo**, designed as a human-technological ecosystem for ethical and effective AI adoption in enterprises. The platform focuses on three core pillars: AI Training (Capacitación IA), Daily Adoption (Adopción Diaria), and High-Impact Automation (Automatización).

**Key Features**:
- Marketing website with 8 pages (homepage, about, 3 pillars, case studies, resources, contact)
- Voice-enabled conversational AI agent with WebSocket backend
- Monorepo architecture with separate web and API applications
- Screaming Architecture pattern (organized by business features, not technical layers)

## 🏗️ Architecture

### Monorepo Structure

This is a **monorepo** using npm workspaces:

```
PULSE-HUB/
├── apps/
│   ├── web/                    # Next.js 15 frontend (App Router)
│   └── api/                    # Express.js backend
├── packages/
│   ├── shared/                 # Shared code between apps
│   └── ui/                     # Reusable UI components (future)
├── agente-ia-conversacional-main/  # Standalone voice AI agent
└── docs/                       # Comprehensive documentation
```

### Screaming Architecture Pattern

The codebase follows **Screaming Architecture** (Robert C. Martin):
- Structure "screams" about business domain (auth, users, ai-chat), not framework
- Features are self-contained with their own controllers, services, types, and routes
- Dependencies flow one direction: `features/` → `core/` → `shared/`

**Frontend Structure (`apps/web/src/`)**:
```
├── app/                    # Next.js App Router pages
├── features/               # Business features (auth, users, dashboard)
├── core/                   # Business logic (services, stores)
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
│   ├── users/
│   ├── contact/
│   └── ai-chat/           # WebSocket AI chat integration
├── core/                   # Middleware, config, utils
└── shared/                 # Shared types and constants
```

**Key Rule**: Business domain knowledge → `features/`. Generic infrastructure → `shared/`.

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
# Run both apps concurrently
npm run dev

# Manual (requires 2 terminals)
cd apps/web && npm run dev
cd apps/api && npm run dev
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

**IMPORTANT**: The shared package must be built before running dev mode. The `predev` script handles this automatically when running `npm run dev`.

### Working with the Voice AI Agent

The `agente-ia-conversacional-main/` directory is a separate Node.js/TypeScript project:

```bash
cd agente-ia-conversacional-main

npm install
npm start          # Start voice agent server
npm run evals      # Run evaluations
npm run tracing:demo
```

See `agente-ia-conversacional-main/CLAUDE.md` for detailed guidance.

## 🎨 Design System

### Color Palette

Colors are defined as CSS variables in `apps/web/src/app/globals.css`:

**Primary (Blue)**:
- `--primary-600: #1F5AF6` - Primary buttons, links, CTAs
- `--primary-100: #E8EFFD` - Soft backgrounds, hover states

**Neutral (Grays)**:
- `--neutral-900: #0A1633` - Main text, dark footer
- `--neutral-600: #5B6472` - Secondary text
- `--neutral-200: #E3E8F0` - Borders, dividers
- `--neutral-100: #F7F9FB` - Subtle backgrounds

**Accent Colors**:
- `--accent-orange: #FF7A45` - Key CTAs, urgency (Pilar 2)
- `--accent-green: #10B981` - Success, positive metrics (Pilar 3)
- `--accent-red: #EF4444` - Errors, alerts
- `--accent-yellow: #F59E0B` - Warnings

**Always use CSS variables, not hardcoded hex values**:
```tsx
// ✅ Good - uses design system
<div className="bg-[var(--primary-600)] text-[var(--neutral-900)]">

// ❌ Avoid - hardcoded colors
<div className="bg-[#1F5AF6] text-[#0A1633]">
```

### Typography

- **Font**: Inter (Google Fonts, loaded in `layout.tsx`)
- **Scales**: 12/14/16/18/24/32/40px
- **Line Height**: 1.25 (headings), 1.45 (body)

### Component Library

**Reusable Components** (`apps/web/src/shared/components/`):

- **Button** - 3 variants (primary, secondary, tertiary), 3 sizes (sm, md, lg)
- **Card** - Shadow, radius, hover effects, glass variant
- **Navbar** - Sticky with scroll-triggered background transition
- **Footer** - 4-section layout with social links
- **WavesSVG** - Animated wave graphics for hero sections
- **AnimatedSection** - Scroll-triggered animations with variants
- **AnnouncementBanner** - Top banner for announcements
- **AIChat** - Floating chat bubble with voice recognition and WebSocket integration

**Component Pattern**:
```
ComponentName/
├── ComponentName.tsx       # Main component
├── index.ts               # Barrel export
└── [optional files].tsx   # Additional utilities
```

### Animations

- **Framer Motion** for all animations
- **AnimatedSection Component**:
  - Props: `variant` (NOT `animation`), `delay`, `duration`, `threshold`
  - Variants: `'fade' | 'slide' | 'scale' | 'slideUp'`
  - Uses Intersection Observer for scroll-triggered animations
- **Transition Duration**: 160-300ms with `ease: 'easeOut'`

**IMPORTANT**: When using `AnimatedSection`, the prop is `variant`, not `animation`:
```tsx
// ✅ Correct
<AnimatedSection variant="slideUp" delay={0.1}>

// ❌ Wrong - will cause TypeScript errors
<AnimatedSection animation="slideUp" delay={0.1}>
```

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
- **WebSocket (ws)** - Real-time AI chat
- **OpenAI API** - AI chat capabilities
- **Nodemailer** - Email notifications
- **Zod** - Schema validation
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing

### Development Tools
- **npm workspaces** - Monorepo management
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **nodemon** - Auto-restart for API development

## 🤖 AI Chat Integration

### Architecture

The AI chat feature uses a WebSocket-based architecture:

**Backend** (`apps/api/src/features/ai-chat/`):
- `ai-chat.service.ts` - Main service managing conversations
- `services/openai-service.ts` - OpenAI API integration with function calling
- `tools/coda.ts` - Coda API integration for saving inquiries
- WebSocket server in `server.ts` for real-time communication

**Frontend** (`apps/web/src/shared/components/AIChat/`):
- `AIChat.tsx` - Main container component
- `ChatBubble.tsx` - Floating action button
- `ChatWindow.tsx` - Chat interface with voice controls
- `useAIChat.ts` - WebSocket hook for real-time messaging
- `useVoiceRecognition.ts` - Browser Speech Recognition API

### Key Features

- **Voice Input**: Browser-based speech recognition with auto-submit
- **Real-time Messaging**: WebSocket connection for instant responses
- **Function Calling**: OpenAI automatically calls tools (e.g., save to Coda)
- **Session Management**: Each chat session has a unique ID
- **Conversation History**: Maintains context across messages

### Usage

The AIChat component is placed in the root layout (`apps/web/src/app/layout.tsx`) and appears on all pages.

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

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@pulsehub.com

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini

# Coda Configuration
CODA_API_KEY=your-coda-api-key
CODA_DOC_ID=your-doc-id
CODA_TABLE_ID=grid-xxxx
```

## 🎯 Code Quality Standards

### TypeScript Configuration

- **Target**: ES2020 (root), ESNext (Next.js)
- **Strict Mode**: Enabled for all projects
- **Unused Variables**: Error for unused locals and parameters
- **Source Maps**: Enabled for debugging

### Component Standards

1. Use TypeScript with explicit interfaces
2. Use `class-variance-authority` for component variants
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

### Monorepo Package References

When importing from workspace packages:

```typescript
// In apps/web or apps/api
import { UserRole } from '@pulse-hub/shared';
```

Package names:
- `@pulse-hub/web` - Frontend app
- `@pulse-hub/api` - Backend app
- `@pulse-hub/shared` - Shared code
- `@pulse-hub/ui` - UI components

### Next.js App Router Conventions

- **Server Components**: Default (no `'use client'`)
- **Client Components**: Require `'use client'` directive at top
- **Page Pattern**: Use `PageClient.tsx` for client components, `page.tsx` as wrapper
- **Layouts**: Use `layout.tsx` for shared layouts
- **Metadata**: Export `metadata` object from server components

### Common Gotchas

1. **AnimatedSection Prop**: Use `variant` not `animation`
2. **Shared Package**: Must be built before running dev mode (handled by `predev`)
3. **WebSocket URL**: Frontend connects to `ws://localhost:4000` (not `/api`)
4. **CSS Variables**: Always use `var(--variable-name)` syntax
5. **Barrel Exports**: Update `index.ts` when adding new components

## 🔍 Troubleshooting

**"Module not found" errors in monorepo**:
```bash
npm run build --workspace=packages/shared
```

**Next.js hydration errors**:
- Ensure client components have `'use client'` directive
- Check for mismatched HTML between server and client
- Verify no browser-only APIs in server components

**Port already in use** (Windows):
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**TypeScript errors after pulling changes**:
```bash
npm install
npm run clean
npm run build
```

**AI Chat WebSocket not connecting**:
- Verify backend is running on port 4000
- Check WebSocket server is initialized in `apps/api/src/server.ts`
- Ensure OPENAI_API_KEY is set in backend `.env`

## 📚 Documentation

The `docs/` directory contains comprehensive documentation:

```
docs/
├── design/             # Design system and UI decisions
├── product/            # Product requirements and strategy
├── guides/             # Getting started and troubleshooting
└── reference/          # Technical reference
```

**Key Documents**:
- **Architecture**: `docs/reference/ARCHITECTURE.md`
- **Design System**: `docs/design/DESIGN-SYSTEM-PROMPT.md`
- **PRD**: `docs/product/PRD-PULSE-HUB.md`
- **Email Setup**: `docs/guides/EMAIL-SETUP.md`

## 📞 Contact

fernando.suarez@ecosdeliderazgo.com

---

**Last Updated**: January 2025
**Version**: 1.2 - Enhanced with AI Chat architecture and critical gotchas
