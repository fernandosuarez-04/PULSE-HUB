# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

**PULSE HUB** is a B2B web platform for **Ecos de Liderazgo**, designed as a human-technological ecosystem for ethical and effective AI adoption in enterprises. The platform focuses on three core pillars: AI Training (Capacitación IA), Daily Adoption (Adopción Diaria), and High-Impact Automation (Automatización).

**Key Features**:
- Marketing website with 8 pages (homepage, about, 3 pillars, case studies, resources, contact)
- Voice-enabled conversational AI agent with REST API backend
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
│   └── ai-chat/           # REST API AI chat integration
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

**Port Issues (Windows)**:
If ports are already in use:
```bash
# Kill specific port processes
.\kill-ports.bat
# or
.\kill-ports.ps1

# Or manually with netstat
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

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

The `agente-ia-conversacional-main/` directory is a separate Node.js/TypeScript project (standalone voice agent):

```bash
cd agente-ia-conversacional-main

npm install
npm start          # Start voice agent server on port 3000
npm run evals      # Run evaluations
npm run tracing:demo
```

**Note**: The standalone agent is separate from the web app's integrated AI chat. The web app (`apps/web`) has its own AI chat feature using REST API connections to the backend.

See `agente-ia-conversacional-main/CLAUDE.md` for detailed guidance on the standalone agent.

### Working with Git LFS

Large files (like `Video.mp4`) are tracked with Git LFS:

```bash
# Install Git LFS (if not already)
git lfs install

# Track large files (already configured in .gitattributes)
git lfs track "*.mp4"

# Check LFS status
git lfs status

# Pull LFS files
git lfs pull
```

**Important**: When cloning the repository, ensure Git LFS is installed first to properly download large files.

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
- **AIChat** - Floating chat bubble with voice recognition and REST API integration

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
- **OpenAI API** - AI chat capabilities (GPT-4o-mini)
- **ElevenLabs API** - Text-to-speech for voice responses
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

The AI chat feature uses a **REST API architecture** connecting the Next.js frontend to the Express backend:

**Backend** (`apps/api/src/features/ai-chat/`):
- `ai-chat.controller.ts` - REST API controller for message handling
- `ai-chat.routes.ts` - Express routes definition
- `ai-chat.service.ts` - Main service managing conversations and voice synthesis
- `services/openai-service.ts` - OpenAI API integration with function calling (GPT-4o-mini)
- `services/elevenlabs-service.ts` - **ElevenLabs TTS integration** for high-quality voice output
- `tools/coda.ts` - Coda API integration for saving inquiries

**Frontend** (`apps/web/src/shared/components/AIChat/`):
- `AIChat.tsx` - Main container component with state management
- `ChatBubble.tsx` - Floating action button (bottom-right)
- `ChatWindow.tsx` - Chat interface with voice controls
- `ChatMessage.tsx` - Individual message rendering
- `useAIChat.ts` - REST API hook with ElevenLabs audio support
- `useHybridVoice.ts` - Hybrid audio playback (ElevenLabs + Web Speech API fallback)
- `useVoiceRecognition.ts` - Browser Web Speech API for voice input (Spanish)

### Key Features

- **Voice Input**: Browser-based speech recognition with auto-submit (Web Speech API)
- **Voice Output**: High-quality text-to-speech using **ElevenLabs** AI voices
  - Natural Spanish voice synthesis
  - Automatic audio playback with agent responses
  - Base64-encoded audio transmitted via REST API
  - Fallback to Web Speech API if ElevenLabs not configured
- **REST API Communication**: HTTP requests for reliable message exchange
- **Function Calling**: OpenAI automatically calls tools (e.g., save to Coda, search knowledge base)
- **Session Management**: Each chat session has a unique ID (UUID)
- **Conversation History**: Maintains context across messages (last 10 messages)
- **Persistent UI**: Floating bubble accessible from all pages

### REST API Message Flow

```typescript
// Client → Server (POST request)
POST /api/v1/ai-chat/message
{
  message: "¿Qué es PULSE HUB?",
  sessionId: "session-123"
}

// Server → Client (JSON response)
{
  success: true,
  data: {
    text: "PULSE HUB es una plataforma...",
    audio: "base64-encoded-mp3-audio",  // Optional
    sessionId: "session-123"
  }
}
```

### Voice Recognition Setup

The voice interface uses the browser's native Web Speech API:
- Language: Spanish (`es-ES`)
- Auto-submit on speech end
- Visual feedback during recording
- Interrupt capability (stop agent speech)

**Browser Support**: Chrome, Edge, Safari (WebKit-based browsers)

### Usage

The AIChat component is placed in the root layout (`apps/web/src/app/layout.tsx`) and appears on all pages as a floating bubble in the bottom-right corner.

### Deployment Considerations

**Development**:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000/api/v1/ai-chat`

**Production**:
- Update `NEXT_PUBLIC_API_URL` in frontend `.env` to production backend
- Ensure CORS settings allow frontend domain
- Voice API requires HTTPS (except localhost)
- Session management: Consider Redis for production scalability

## 📋 Environment Variables

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=PULSE HUB
```

**Netlify Functions** (if deploying to Netlify):
Environment variables are configured in Netlify dashboard. The web app includes serverless functions in `apps/web/netlify/functions/` for API routes.

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

# OpenAI Configuration (REQUIRED for AI Chat)
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=1000

# Coda Configuration (REQUIRED for AI Chat)
CODA_API_KEY=your-coda-api-key
CODA_DOC_ID=your-doc-id
CODA_TABLE_ID=grid-xxxx

# ElevenLabs Configuration (REQUIRED for Voice Output)
ELEVENLABS_API_KEY=your-elevenlabs-api-key
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM  # Optional: Rachel voice (default)
ELEVENLABS_MODEL_ID=eleven_multilingual_v2  # Optional: Multilingual model for Spanish
```

**Getting API Keys**:
- OpenAI: https://platform.openai.com/api-keys
- Coda: https://coda.io/account (Account Settings → API Settings)
- **ElevenLabs**: https://elevenlabs.io/app/settings/api-keys
  - Free tier: 10,000 characters/month
  - Voice IDs: https://elevenlabs.io/app/voice-lab
  - Recommended voices for Spanish: Rachel, Bella, or any multilingual voice

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
3. **REST API URL**: Frontend connects to `http://localhost:4000/api` (configurable via `NEXT_PUBLIC_API_URL`)
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

**AI Chat REST API not working**:
- Verify backend is running on port 4000
- Check REST API routes are registered in `apps/api/src/server.ts`
- Ensure OPENAI_API_KEY is set in backend `.env`
- Check browser DevTools Network tab for failed requests
- Verify `NEXT_PUBLIC_API_URL` is set correctly in frontend `.env.local`
- Test endpoint directly: `curl http://localhost:4000/api/v1/ai-chat/health`

**Voice recognition not working**:
- Only works in Chrome, Edge, Safari (WebKit-based browsers)
- Requires microphone permissions from browser
- Voice API requires HTTPS in production (HTTP ok for localhost)
- Check browser console for permission errors
- Language is set to Spanish (`es-ES`)

**ElevenLabs audio not playing**:
- Verify `ELEVENLABS_API_KEY` is set in backend `.env`
- Check backend console for "✅ ElevenLabs Service initialized"
- If not configured, system falls back to text-only (no error)
- Free tier limit: 10,000 characters/month
- Check browser console for audio playback errors
- Autoplay may be blocked - user must interact with page first

**ElevenLabs API errors**:
```bash
# Check backend logs for:
✅ ElevenLabs Service initialized
🎙️ ElevenLabs: Generating speech...
✅ ElevenLabs: Audio generated (XXX bytes)

# Common errors:
# - Invalid API key: Check key at https://elevenlabs.io/app/settings/api-keys
# - Quota exceeded: Check usage at https://elevenlabs.io/app/usage
# - Voice ID not found: Verify voice ID exists in your account
```

**Git LFS files not downloading**:
```bash
# Install Git LFS first
git lfs install

# Pull LFS files
git lfs pull

# Verify LFS tracking
git lfs ls-files
```

**Video not playing in Home page**:
- Ensure `Video.mp4` is downloaded via Git LFS
- Check file exists at `apps/web/public/Video.mp4`
- File size should be ~22MB (if much smaller, LFS didn't pull it)
- Run `git lfs pull` to download the actual file

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

## 🚢 Deployment

### Frontend Deployment (Next.js)

The frontend can be deployed to Vercel (recommended) or Netlify:

**Vercel** (recommended):
- Automatic deployments from Git
- Zero-config for Next.js 15
- Edge network for optimal performance
- Built-in Analytics and Web Vitals monitoring

**Netlify**:
- Configured via `netlify.toml` in project root
- Serverless functions in `apps/web/netlify/functions/`
- Environment variables set in Netlify dashboard

### Backend Deployment (Express)

**Recommended providers**:
- Railway - PostgreSQL + Node.js hosting
- Render - Automatic deployments from Git
- Fly.io - Edge deployment with global distribution
- Heroku - Simple deployment with managed PostgreSQL

**Requirements**:
- Node.js 20 LTS
- Environment variables configured for OpenAI, ElevenLabs, Coda, email
- Redis (optional) for session management in production

### Database

Currently the project doesn't use a database for the main app. If needed in future:
- Prisma ORM configured for PostgreSQL
- Railway or Neon for serverless PostgreSQL

### CI/CD

The project uses GitHub Actions for the standalone agent evaluations. For the main monorepo:
- Set up deployment workflows per your hosting provider
- Configure secrets for API keys (OPENAI_API_KEY, CODA_API_KEY, etc.)
- Run build and lint checks on pull requests

## 🎙️ ElevenLabs Voice Integration

### Overview

The AI Chat uses **ElevenLabs** for high-quality text-to-speech instead of browser's native SpeechSynthesis API. This provides:
- Natural, human-like Spanish voices
- Consistent quality across all browsers and devices
- Professional voice synthesis for enterprise use
- No reliance on browser TTS support

### Architecture Flow

```
1. User sends message → Backend (REST API POST)
2. OpenAI generates text response
3. ElevenLabs converts text → MP3 audio
4. Audio encoded to Base64
5. Sent to frontend in JSON response
6. Frontend decodes Base64 → Blob
7. Audio plays automatically
```

### Configuration

**Voice Selection**:
- Default: Rachel (`21m00Tcm4TlvDq8ikWAM`) - Natural, clear voice
- Spanish-optimized: Use multilingual voices from voice lab
- Change via `ELEVENLABS_VOICE_ID` environment variable

**Voice Settings** (in `elevenlabs-service.ts`):
- `stability`: 0.5 (balanced)
- `similarityBoost`: 0.75 (natural voice)
- `style`: 0.4 (moderate expressiveness)
- `useSpeakerBoost`: true (enhanced clarity)

### Customization

To change voices, visit https://elevenlabs.io/app/voice-lab and:
1. Find a voice you like
2. Copy its Voice ID
3. Set `ELEVENLABS_VOICE_ID` in backend `.env`
4. Restart backend server

**Popular Spanish voices**:
- Bella (female, warm)
- Antoni (male, professional)
- Rachel (female, clear - default)

### Cost Management

**Free Tier**: 10,000 characters/month
- ~200-250 agent responses
- Upgrade to paid tier for unlimited usage

**Monitoring usage**:
- Check: https://elevenlabs.io/app/usage
- Backend logs show: `✅ Audio generated (XXX bytes)`

---

**Last Updated**: January 2025
**Version**: 2.0 - Migrated from WebSocket to REST API architecture with ElevenLabs TTS integration

For detailed migration information, see: `docs/guides/AI-CHAT-REST-MIGRATION.md`
