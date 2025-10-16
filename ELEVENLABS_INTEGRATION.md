# Integración de ElevenLabs Text-to-Speech

## Resumen de Implementación

Se ha implementado exitosamente la integración de ElevenLabs para proporcionar síntesis de voz de alta calidad en el agente de chat web, reemplazando el SpeechSynthesis del navegador.

## Arquitectura del Flujo

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────────┐
│   Usuario   │──1──>│  WebSocket   │──2──>│   OpenAI    │──3──>│ ElevenLabs   │
│  (Frontend) │      │   Backend    │      │ GPT-4o-mini │      │   TTS API    │
└─────────────┘      └──────────────┘      └─────────────┘      └──────────────┘
       ^                    |                      |                     |
       |                    |                      |                     |
       └────────5───────────┘                      └──────────4──────────┘

Flujo:
1. Usuario envía mensaje por WebSocket
2. Backend procesa con OpenAI
3. OpenAI genera respuesta de texto
4. ElevenLabs convierte texto → audio MP3
5. Audio en Base64 enviado al frontend
6. Frontend reproduce audio automáticamente
```

## Cambios Realizados

### Backend (`apps/api/`)

#### 1. **Instalación de Dependencias**
```bash
npm install @elevenlabs/elevenlabs-js
```

#### 2. **Nuevo Servicio: `elevenlabs-service.ts`**
- **Ubicación**: `apps/api/src/features/ai-chat/services/elevenlabs-service.ts`
- **Funcionalidad**:
  - Inicializa cliente de ElevenLabs con API key
  - Convierte texto a voz (MP3)
  - Codifica audio en Base64 para transmisión WebSocket
  - Configuración de voz (estabilidad, similitud, estilo)
  - Gestión de voces disponibles
  - Singleton pattern para instancia global

**Métodos principales**:
- `textToSpeech(text: string): Promise<Buffer>` - Genera audio MP3
- `textToSpeechBase64(text: string): Promise<string>` - Audio en Base64
- `getVoices(): Promise<any[]>` - Lista voces disponibles
- `setVoice(voiceId: string): void` - Cambia voz activa
- `updateVoiceSettings(settings)` - Ajusta parámetros de síntesis

#### 3. **Modificaciones en `ai-chat.service.ts`**
- **Nuevo método**: `handleMessageWithAudio()` - Genera respuesta con audio
- **Método actualizado**: `handleMessage()` - Wrapper para compatibilidad
- **Nueva función privada**: `generateAudio()` - Genera audio con ElevenLabs
- **Inicialización**: Intenta cargar ElevenLabs (fallback a texto si falla)

**Interfaz nueva**:
```typescript
export interface ChatResponse {
  text: string;
  audio?: string; // Base64-encoded audio
}
```

#### 4. **Actualización de `ai-chat.types.ts`**
```typescript
export interface ServerMessage {
  type: WebSocketMessageType;
  text?: string;
  audio?: string; // ← NUEVO: Audio en Base64 de ElevenLabs
  error?: string;
  sessionId?: string;
}
```

#### 5. **Modificaciones en `server.ts`**
- Cambia `handleMessage()` por `handleMessageWithAudio()`
- Incluye campo `audio` en mensajes WebSocket enviados al frontend
- Logs mejorados para rastrear generación de audio

#### 6. **Variables de Entorno**
**Nuevo en `.env.example`**:
```bash
# ElevenLabs Configuration (Required for Voice Output)
ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM  # Rachel (default)
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
```

### Frontend (`apps/web/`)

#### 1. **Nuevo Hook: `useElevenLabsAudio.ts`**
- **Ubicación**: `apps/web/src/shared/components/AIChat/useElevenLabsAudio.ts`
- **Funcionalidad**:
  - Reproduce audio desde Base64
  - Manejo de interrupciones (barge-in)
  - Limpieza de memoria (revoke Object URLs)
  - Estados: `isPlaying`, `error`
  - Métodos: `playAudio()`, `stopAudio()`

**Proceso de reproducción**:
1. Decodifica Base64 → Binary
2. Crea Blob (audio/mpeg)
3. Genera Object URL
4. Reproduce con HTMLAudioElement
5. Limpia recursos al finalizar

#### 2. **Nuevo Hook: `useAIChatWebSocket.ts`**
- **Reemplaza**: `useAIChat.ts` (REST API)
- **Características**:
  - Conexión WebSocket persistente
  - Reconexión automática con backoff exponencial
  - Integra `useElevenLabsAudio` para reproducción
  - Auto-play de audio cuando llega del backend
  - Detiene audio cuando usuario envía mensaje (barge-in)

**Estados expuestos**:
```typescript
{
  messages: ChatMessage[],
  isConnected: boolean,
  isTyping: boolean,
  error: string | null,
  sendMessage: (text: string) => void,
  clearMessages: () => void,
  reconnect: () => void,
  isPlayingAudio: boolean,  // ← NUEVO
  audioError: string | null  // ← NUEVO
}
```

#### 3. **Modificaciones en `AIChat.tsx`**
```typescript
// ANTES:
import { useAIChat } from './useAIChat';
const chat = useAIChat();

// DESPUÉS:
import { useAIChatWebSocket } from './useAIChatWebSocket';
const chat = useAIChatWebSocket();
```

#### 4. **Modificaciones en `ChatWindow.tsx`**
- **Deshabilitado**: `useVoiceSynthesis()` del navegador
- **Objeto dummy** para compatibilidad con UI existente
- `synthesis.isSpeaking` ahora mapea a `chat.isPlayingAudio`
- Eliminados efectos de auto-síntesis (ElevenLabs lo hace automáticamente)
- Barge-in manejado por `useAIChatWebSocket`

### Documentación

#### 1. **CLAUDE.md Actualizado**
- Nueva sección: **🎙️ ElevenLabs Voice Integration**
- Arquitectura del flujo de audio
- Configuración de voces
- Gestión de costos
- Troubleshooting específico de ElevenLabs
- Voces recomendadas para español

#### 2. **Nuevo README: `ELEVENLABS_README.md`**
- Guía completa de setup
- Tabla de voces recomendadas
- Referencia de API
- Configuración de voz personalizada
- Mejores prácticas
- Troubleshooting detallado

## Configuración Requerida

### Paso 1: Obtener API Key de ElevenLabs

1. Ve a https://elevenlabs.io/
2. Crea cuenta o inicia sesión
3. Navega a **Settings → API Keys**
4. Crea nueva API key
5. Copia la clave

### Paso 2: Configurar Variables de Entorno

Crea o edita `apps/api/.env`:

```bash
# REQUERIDO
ELEVENLABS_API_KEY=tu-api-key-aqui

# OPCIONAL (valores por defecto)
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
```

### Paso 3: Reiniciar Backend

```bash
# Detener servidor actual (Ctrl+C)
npm run dev

# O usar scripts de inicio
.\start-dev.bat  # Windows
```

### Paso 4: Verificar Configuración

**Backend debe mostrar**:
```
✅ ElevenLabs Service initialized
   - Voice ID: 21m00Tcm4TlvDq8ikWAM
   - Model: eleven_multilingual_v2
```

**Al recibir mensaje**:
```
🎙️ ElevenLabs: Generating speech...
✅ ElevenLabs: Audio generated (45232 bytes)
✅ Audio converted to base64 (60310 chars)
```

**Frontend (consola del navegador)**:
```
🎙️ Playing ElevenLabs audio from message
✅ Audio loaded, starting playback
🎙️ Audio playing
✅ Audio finished playing
```

## Características Implementadas

### ✅ Síntesis de Voz de Alta Calidad
- Voces naturales de ElevenLabs (vs. robóticas del navegador)
- Soporte multilingüe optimizado para español
- Calidad profesional y consistente

### ✅ Transmisión por WebSocket
- Audio codificado en Base64
- Transmitido junto con texto en mismo mensaje
- Sin necesidad de endpoints HTTP adicionales

### ✅ Reproducción Automática
- Audio se reproduce automáticamente al recibir respuesta
- Sin necesidad de interacción del usuario
- Limpieza automática de recursos

### ✅ Barge-In (Interrupción)
- Usuario puede interrumpir audio enviando nuevo mensaje
- Audio se detiene automáticamente
- Evita superposición de audio

### ✅ Fallback Graceful
- Si ElevenLabs no está configurado, sistema funciona en modo texto
- Sin errores ni interrupciones
- Logs informativos en consola

### ✅ Gestión de Errores
- Manejo de cuota excedida
- API key inválida
- Errores de red
- Fallback a texto en caso de fallo

## Costos y Límites

### Plan Gratuito
- **10,000 caracteres/mes**
- ~200-250 respuestas del agente
- Perfecto para desarrollo y pruebas

### Monitoreo
- Dashboard: https://elevenlabs.io/app/usage
- Logs del backend: `✅ Audio generated (XXX bytes)`
- Alerta cuando se acerca al límite

### Planes Pagos
- **Starter**: $5/mes - 30,000 caracteres
- **Creator**: $22/mes - 100,000 caracteres
- **Pro**: $99/mes - 500,000 caracteres

## Voces Recomendadas

| Voz | ID | Género | Tono | Mejor Para |
|-----|-----|--------|------|------------|
| **Rachel** | `21m00Tcm4TlvDq8ikWAM` | Femenino | Clara, profesional | Uso general ✅ |
| **Bella** | `EXAVITQu4vr4xnSDxMaL` | Femenino | Cálida, amigable | Servicio al cliente |
| **Antoni** | `ErXwobaYiN019PkySvjV` | Masculino | Profesional | Negocios |
| **Domi** | `AZnzlk1XvdvUeBnXmlld` | Femenino | Confiada | Presentaciones |

**Cambiar voz**: Actualiza `ELEVENLABS_VOICE_ID` en `.env` y reinicia backend.

## Testing

### 1. Iniciar Sistema
```bash
# Terminal 1: Backend
cd apps/api
npm run dev

# Terminal 2: Frontend
cd apps/web
npm run dev

# O usar script unificado
.\start-dev.bat
```

### 2. Abrir Chat
- Ve a http://localhost:3000
- Click en burbuja de chat (esquina inferior derecha)

### 3. Enviar Mensaje
- Escribe: "Hola, ¿qué es la inteligencia artificial?"
- Presiona Enter o click en botón Enviar

### 4. Verificar Audio
- Deberías escuchar la respuesta con voz natural
- Indicador "Hablando..." en header del chat
- Consola del navegador muestra logs de reproducción

## Troubleshooting

### ❌ No se Escucha Audio

**1. Verificar API Key**
```bash
# Backend console debe mostrar:
✅ ElevenLabs Service initialized

# Si muestra:
⚠️ ElevenLabs not configured, audio generation disabled
# → Falta configurar ELEVENLABS_API_KEY en .env
```

**2. Verificar Cuota**
```bash
# Si backend muestra:
❌ ElevenLabs error: Quota exceeded
# → Visita https://elevenlabs.io/app/usage
```

**3. Verificar Autoplay del Navegador**
```bash
# Console del navegador muestra:
Error al reproducir audio
# → Click en cualquier parte de la página para habilitar audio
```

### ❌ Voz Suena Extraña

**Solución**: Cambiar voz
1. Ve a https://elevenlabs.io/app/voice-lab
2. Encuentra voz que te guste
3. Copia Voice ID
4. Actualiza `ELEVENLABS_VOICE_ID` en `.env`
5. Reinicia backend

### ❌ Alta Latencia (Audio Tarda)

**Causas**:
- Respuesta de texto muy larga
- Conexión lenta
- API de ElevenLabs saturada

**Soluciones**:
- Reducir `OPENAI_MAX_TOKENS` en `.env`
- Verificar conexión a internet
- Revisar status: https://status.elevenlabs.io/

## Próximas Mejoras

- [ ] Cache de audio para respuestas comunes
- [ ] Soporte para múltiples idiomas
- [ ] Selector de voz en UI
- [ ] Ajustes de velocidad de voz en UI
- [ ] Modo solo-texto (toggle en UI)
- [ ] Streaming de audio (chunks) para reducir latencia
- [ ] Analytics de uso de audio

## Soporte

- **Documentación ElevenLabs**: https://docs.elevenlabs.io/
- **Voice Lab**: https://elevenlabs.io/app/voice-lab
- **API Reference**: https://docs.elevenlabs.io/api-reference
- **Status Page**: https://status.elevenlabs.io/

---

**Implementado**: Enero 2025
**Versión**: 1.0.0
**Status**: ✅ Funcional en Desarrollo
