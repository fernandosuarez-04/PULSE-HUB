# Migración del AI Chat de WebSocket a REST API

## Resumen

Se ha migrado exitosamente el sistema de AI Chat de WebSocket a una arquitectura REST API, manteniendo toda la funcionalidad de ElevenLabs y mejorando la simplicidad y escalabilidad del sistema.

## Cambios Realizados

### Backend (`apps/api/`)

#### 1. Nuevos Archivos Creados

**`src/features/ai-chat/ai-chat.controller.ts`**
- Controlador REST para el chat con AI
- Endpoints:
  - `POST /api/v1/ai-chat/message` - Enviar mensaje y recibir respuesta con audio
  - `DELETE /api/v1/ai-chat/session/:sessionId` - Limpiar historial de sesión
  - `GET /api/v1/ai-chat/health` - Health check del servicio
- Gestión de sesiones con Map para persistencia en memoria
- Limpieza automática de sesiones inactivas (timeout de 1 hora)

**`src/features/ai-chat/ai-chat.routes.ts`**
- Definición de rutas REST para el AI Chat
- Integración con Express Router

#### 2. Archivos Modificados

**`src/server.ts`**
- ❌ Eliminado: Servidor WebSocket completo
- ❌ Eliminado: Imports de `ws`, `WebSocketServer`, `WebSocket`, `createServer`
- ✅ Agregado: Rutas REST del AI Chat (`/api/v1/ai-chat`)
- ✅ Simplificado: Uso directo de `app.listen()` en lugar de `server.listen()`

**`src/features/ai-chat/ai-chat.service.ts`**
- ✅ Sin cambios: Servicio mantiene la misma lógica
- ✅ Sigue generando audio con ElevenLabs
- ✅ Compatible con ambas arquitecturas (REST y WebSocket)

### Frontend (`apps/web/`)

#### 1. Archivos Modificados

**`src/shared/components/AIChat/useAIChat.ts`**
- ✅ Actualizado: De Netlify Functions a REST API del backend
- ✅ Agregado: Soporte completo para audio de ElevenLabs
- ✅ Agregado: Integración con `useHybridVoice` hook
- ✅ Agregado: Auto-reproducción de audio (ElevenLabs o Web Speech API)
- ✅ Agregado: Barge-in (detener audio al enviar mensaje)
- ✅ Mejorado: Manejo de errores y validación de respuestas

**`src/shared/components/AIChat/AIChat.tsx`**
- ✅ Actualizado: Cambiado de `useAIChatWebSocket` a `useAIChat`
- ✅ Simplificado: Menos complejidad al no manejar WebSocket

#### 2. Archivos No Modificados (Reutilizados)

**`src/shared/components/AIChat/useHybridVoice.ts`**
- ✅ Reutilizado: Hook para reproducción de audio (ElevenLabs + Web Speech API)

**`src/shared/components/AIChat/ChatWindow.tsx`**
**`src/shared/components/AIChat/ChatBubble.tsx`**
**`src/shared/components/AIChat/ChatMessage.tsx`**
- ✅ Compatibles: Sin cambios necesarios

## Arquitectura REST

### Flujo de Comunicación

```
1. Usuario escribe mensaje → Frontend
2. Frontend → POST /api/v1/ai-chat/message
   Body: { message: string, sessionId: string }
3. Backend procesa con:
   - OpenAI GPT-4o-mini (respuesta inteligente)
   - ElevenLabs TTS (audio en base64)
4. Backend → Response
   { success: true, data: { text: string, audio?: string, sessionId: string } }
5. Frontend recibe respuesta
6. Frontend reproduce audio automáticamente
7. Usuario escucha respuesta
```

### Endpoint Principal

**URL**: `POST /api/v1/ai-chat/message`

**Request**:
```json
{
  "message": "¿Qué es la adopción de IA?",
  "sessionId": "session-1234567890-abc123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "text": "La adopción de IA es el proceso de integrar...",
    "audio": "base64-encoded-mp3-audio-from-elevenlabs",
    "sessionId": "session-1234567890-abc123"
  }
}
```

## Ventajas de la Migración

### 1. Simplicidad
- ✅ Sin gestión de conexiones WebSocket
- ✅ Sin reconexiones automáticas
- ✅ Sin manejo de estados de conexión
- ✅ Código más simple y fácil de mantener

### 2. Escalabilidad
- ✅ Stateless: Sesiones en Map (fácilmente migrable a Redis)
- ✅ Load balancing más simple (sin sticky sessions)
- ✅ Cacheable: Posibilidad de cachear respuestas frecuentes
- ✅ Rate limiting más fácil de implementar

### 3. Debugging
- ✅ Requests/responses visibles en DevTools Network
- ✅ Logs más claros en backend
- ✅ Testing más simple con herramientas REST (Postman, curl)
- ✅ Monitoreo más estándar

### 4. Compatibilidad
- ✅ Funciona con cualquier proxy/CDN
- ✅ No requiere soporte WebSocket del hosting
- ✅ Compatible con serverless (con ajustes)
- ✅ CORS más simple de configurar

## Funcionalidades Mantenidas

### ✅ ElevenLabs TTS
- Audio de alta calidad en español
- Base64 encoding para transmisión REST
- Fallback a Web Speech API si no hay audio

### ✅ OpenAI GPT-4o-mini
- Respuestas inteligentes contextuales
- Function calling para herramientas (Coda)
- Historial de conversación por sesión

### ✅ Voice Interface
- Reconocimiento de voz (Web Speech API)
- Reproducción automática de respuestas
- Barge-in: Interrumpir al agente al hablar

### ✅ Session Management
- Sesiones únicas por usuario
- Historial de conversación persistente
- Limpieza automática de sesiones inactivas

## Testing

### Backend

```bash
# Health check
curl http://localhost:4000/health

# AI Chat health check
curl http://localhost:4000/api/v1/ai-chat/health

# Enviar mensaje
curl -X POST http://localhost:4000/api/v1/ai-chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hola, ¿qué es PULSE HUB?",
    "sessionId": "test-session-123"
  }'
```

### Frontend

```bash
# Iniciar desarrollo
cd apps/web
npm run dev

# Abrir http://localhost:3000
# Click en el chat bubble (esquina inferior derecha)
# Escribir mensaje y verificar:
# - Respuesta del agente
# - Audio reproduciéndose automáticamente
# - Barge-in funcional
```

## Variables de Entorno

### Backend (`apps/api/.env`)

```env
# Requeridas para AI Chat
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=1000

# Opcionales (ElevenLabs - si no está, usa Web Speech API)
ELEVENLABS_API_KEY=your-elevenlabs-api-key
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
ELEVENLABS_MODEL_ID=eleven_multilingual_v2

# Opcionales (Coda - para herramientas)
CODA_API_KEY=your-coda-api-key
CODA_DOC_ID=your-doc-id
CODA_TABLE_ID=grid-xxxx
```

### Frontend (`apps/web/.env.local`)

```env
# URL del backend API
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Despliegue

### Consideraciones

1. **Backend**:
   - Desplegar en cualquier proveedor Node.js (Railway, Render, Fly.io)
   - No requiere soporte WebSocket
   - Variables de entorno configuradas
   - Puerto 4000 o variable PORT

2. **Frontend**:
   - Desplegar en Vercel/Netlify
   - Configurar NEXT_PUBLIC_API_URL con URL de producción
   - HTTPS requerido para Web Speech API en producción

3. **Escalabilidad**:
   - Implementar Redis para sesiones en producción
   - Rate limiting con express-rate-limit
   - Caching de respuestas frecuentes

## Próximos Pasos (Opcional)

1. **Redis para Sesiones**: Migrar Map a Redis para escalabilidad
2. **Rate Limiting**: Proteger contra abuso del API
3. **Caching**: Cachear respuestas frecuentes
4. **Metrics**: Implementar métricas (latencia, tasa de éxito, etc.)
5. **Streaming**: Considerar streaming de respuestas largas

## Archivos Eliminables (Obsoletos)

Los siguientes archivos ya no se usan y pueden ser eliminados:

```
apps/web/src/shared/components/AIChat/useAIChatWebSocket.ts
```

## Soporte

Para preguntas o problemas con la migración, contactar a:
- fernando.suarez@ecosdeliderazgo.com

---

**Fecha de Migración**: Enero 2025
**Versión**: 2.0 - REST API Architecture
