# AI Chat Integration - Setup Guide

## Overview

The AI Chat feature has been successfully integrated into Pulse Hub! This document provides instructions for configuring and testing the chat widget.

## Architecture

### Backend (Express + WebSocket)
```
apps/api/src/features/ai-chat/
├── ai-chat.types.ts              # TypeScript types
├── ai-chat.service.ts            # Main chat service
├── services/
│   └── openai-service.ts         # OpenAI integration with function calling
└── tools/
    ├── coda.ts                   # Coda API integration
    └── index.ts                  # Tool exports
```

### Frontend (Next.js + React)
```
apps/web/src/shared/components/AIChat/
├── AIChat.tsx                    # Main component
├── ChatBubble.tsx                # Floating button
├── ChatWindow.tsx                # Chat interface
├── ChatMessage.tsx               # Individual messages
├── useAIChat.ts                  # WebSocket hook
└── index.ts                      # Exports
```

### Integration
- WebSocket server running on `ws://localhost:4000/ws/chat`
- AIChat component injected in `apps/web/src/app/layout.tsx`
- Appears on all pages as a floating bubble in bottom-right corner

## Configuration

### 1. Backend Environment Variables

Create `apps/api/.env` file with:

```env
# Server Configuration
PORT=4000
NODE_ENV=development
API_VERSION=v1

# Authentication
JWT_SECRET=your-jwt-secret-key

# CORS
ALLOWED_ORIGINS=http://localhost:3000

# OpenAI Configuration (REQUIRED)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=1000

# Coda API Configuration (REQUIRED)
CODA_API_KEY=your_coda_api_key_here
CODA_DOC_ID=your_coda_doc_id
CODA_TABLE_ID=your_coda_table_id
```

**Get API Keys:**
- OpenAI: https://platform.openai.com/api-keys
- Coda: https://coda.io/account

### 2. Frontend Environment Variables

Create `apps/web/.env.local` file with:

```env
# API URL
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# WebSocket URL (AI Chat)
NEXT_PUBLIC_WS_URL=ws://localhost:4000/ws/chat

# App Name
NEXT_PUBLIC_APP_NAME=PULSE HUB
```

## Running the Application

### Option 1: Using Development Scripts (Windows)

```bash
.\start-dev.bat
# or
.\start-dev.ps1
```

This will open two terminal windows:
- Terminal 1: Frontend (Next.js) on http://localhost:3000
- Terminal 2: Backend (Express + WebSocket) on http://localhost:4000

### Option 2: Manual (2 Terminals)

**Terminal 1 - Backend:**
```bash
cd apps/api
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd apps/web
npm run dev
```

### Option 3: Root Command

```bash
npm run dev
```

## Testing the AI Chat

### 1. Check Backend Connection

Backend should log:
```
🚀 Servidor corriendo en http://localhost:4000
🔌 WebSocket disponible en ws://localhost:4000/ws/chat
✅ OpenAI Service initialized with model: gpt-4o-mini
```

### 2. Open Frontend

Navigate to http://localhost:3000

You should see:
- ✅ Floating chat bubble in bottom-right corner (orange/blue gradient)
- ✅ Pulse animation on the bubble

### 3. Open Chat

Click the floating bubble:
- ✅ Chat window opens (400x600px on desktop, full-screen on mobile)
- ✅ Connection indicator shows "En línea" (green dot)
- ✅ Welcome message appears

### 4. Send a Test Message

Try these test queries:
- "Hola" → Should get greeting response
- "¿Qué es el Pilar 1 de IA?" → Should search Coda and respond
- "¿Cómo capacitar a mi equipo en IA?" → Should use function calling
- "Cuéntame sobre automatización de alto impacto" → Should retrieve from Coda

### 5. Verify Backend Logs

Backend should log:
```
📩 Received message: "tu mensaje"
🔧 OpenAI requested tool: searchInCoda with args: {...}
📊 Search result from Coda: Found (XXX chars)
📤 Sent response: "respuesta del agente..."
```

## Features

### Chat Bubble
- 🎯 Fixed position: `bottom-6 right-6`
- 📱 Responsive: Adjusts for mobile
- 🌊 Pulse animation for attention
- 🎨 Gradient colors from design system

### Chat Window
- 💬 Conversation history
- ⌨️ Real-time typing indicator
- 🔄 Auto-scroll to latest message
- 🔌 Connection status indicator
- ⚡ Auto-reconnect on disconnect
- 📱 Fully responsive (mobile-first)

### AI Capabilities
- 🧠 GPT-4o-mini powered
- 🔧 Automatic function calling
- 📚 Coda knowledge base integration
- 💾 Conversation history (last 10 messages)
- 🌐 Spanish language specialized

## Troubleshooting

### Chat Bubble Not Visible

1. Check console for errors
2. Verify AIChat is imported in `layout.tsx`
3. Check z-index (should be 9998 for bubble, 9999 for window)

### "Connection Error"

1. Verify backend is running on port 4000
2. Check WebSocket URL in `.env.local`
3. Check CORS settings in backend
4. Look for firewall blocking WebSocket

### "OpenAI API Key Not Configured"

1. Verify `OPENAI_API_KEY` in `apps/api/.env`
2. Restart backend server
3. Check console for "✅ OpenAI Service initialized"

### "No relevant content found"

1. Verify Coda credentials in `.env`
2. Check Coda table has data
3. Verify table structure matches expected format
4. Check backend logs for Coda API errors

### TypeScript Errors

Run type check:
```bash
# Frontend
cd apps/web
npm run build

# Backend
cd apps/api
npm run build
```

## Design System Compliance

The chat components follow Pulse Hub design system:

**Colors:**
- Primary: `--primary-600` (#1F5AF6)
- Accent: `--accent-orange` (#FF7A45)
- Neutral: `--neutral-900`, `--neutral-600`, etc.

**Typography:**
- Font: Inter (from layout)
- Sizes: Uses design tokens

**Animations:**
- Framer Motion for smooth transitions
- 200-300ms duration
- Smooth entrance/exit

**Accessibility:**
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus states with ring-2
- Min touch target 44x44px

## Next Steps

### Optional Enhancements

1. **Voice Input**: Add speech recognition (Web Speech API)
2. **File Upload**: Allow users to upload documents
3. **Chat History**: Persist conversations in localStorage
4. **Typing Animations**: Typewriter effect for responses
5. **Markdown Support**: Render markdown in messages
6. **Emoji Support**: Quick emoji reactions
7. **Multi-language**: Support English and other languages

### Production Considerations

1. **Rate Limiting**: Add rate limits for API calls
2. **Error Tracking**: Integrate Sentry or similar
3. **Analytics**: Track chat usage and user queries
4. **Caching**: Cache common queries
5. **Load Balancing**: WebSocket sticky sessions
6. **SSL/TLS**: Secure WebSocket (wss://)

## Support

For issues or questions:
- Check backend logs (`apps/api`)
- Check browser console (F12)
- Review WebSocket network tab
- Verify environment variables

---

**Integration Date**: January 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready
