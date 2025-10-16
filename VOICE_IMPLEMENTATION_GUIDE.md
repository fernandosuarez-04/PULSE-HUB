# Guía de Implementación de Voz con ElevenLabs

## ✅ Resumen de la Implementación Completa

Se ha completado la integración de ElevenLabs Text-to-Speech con fallback automático a Web Speech API del navegador. El sistema ahora responde con voz humana natural de alta calidad.

## 🎯 Características Implementadas

### ✅ 1. Reproducción Automática de Audio ElevenLabs
- **Backend** genera audio MP3 con ElevenLabs API
- **Audio en Base64** transmitido vía WebSocket junto con el texto
- **Reproducción automática** en el navegador usando `new Audio()`
- **Limpieza de memoria** con `URL.revokeObjectURL()` después de cada reproducción

### ✅ 2. Fallback Automático a Web Speech API
- **Detección inteligente**: Si el backend no envía audio, usa Web Speech API
- **Sin errores**: El usuario siempre recibe respuesta hablada
- **Hook híbrido** (`useHybridVoice.ts`) maneja ambos sistemas
- **Logs claros**: Console muestra qué sistema está en uso

### ✅ 3. Barge-In Completo (Interrupción)
- **Al hablar**: Si el usuario activa el micrófono, detiene la voz del agente
- **Al escribir**: Si el usuario envía un mensaje, detiene la voz inmediatamente
- **Función unificada**: `stopSpeaking()` detiene tanto ElevenLabs como Web Speech API

### ✅ 4. Selección Dinámica de Voz (Backend)
- **Variable de entorno**: `ELEVENLABS_VOICE_ID` configura la voz por defecto
- **Parámetro opcional**: Backend puede recibir `voiceId` en llamadas futuras
- **Cambio en caliente**: Modificar `.env` y reiniciar backend para cambiar voz

### ✅ 5. Integración con UI
- **Estado `isSpeaking`**: Muestra "Hablando..." en el header del chat
- **Indicador de voz**: Muestra el nombre de la voz activa (ElevenLabs/fallback)
- **Errores visibles**: Mensajes de error de voz en la UI
- **Icono animado**: Volume2 animado cuando el agente está hablando

## 📁 Archivos Creados/Modificados

### Nuevos Archivos

1. **`apps/web/src/shared/components/AIChat/useHybridVoice.ts`**
   - Hook híbrido que maneja ElevenLabs + Web Speech API
   - Funciones: `playElevenLabsAudio()`, `speakText()`, `stopSpeaking()`
   - Estado unificado: `isSpeaking`, `error`, `voiceName`

### Archivos Modificados

1. **`apps/web/src/shared/components/AIChat/useAIChatWebSocket.ts`**
   - Integra `useHybridVoice` en lugar de `useElevenLabsAudio`
   - Auto-play de audio cuando llega del backend
   - Fallback a Web Speech API si no hay audio
   - Barge-in al enviar mensaje

2. **`apps/web/src/shared/components/AIChat/ChatWindow.tsx`**
   - Usa `chat.isSpeaking` del hook híbrido
   - Muestra nombre de voz activa en header
   - Barge-in cuando usuario empieza a hablar
   - Mensajes de error de voz

3. **`apps/api/src/features/ai-chat/services/elevenlabs-service.ts`**
   - Parámetro opcional `voiceId` en `textToSpeech()`
   - Método `getDefaultVoiceId()` para consultar voz actual
   - Método `setDefaultVoice()` para cambiar voz en runtime

## 🚀 Cómo Usar

### 1. Configuración Inicial

**Obtener API Key de ElevenLabs**:
1. Ve a https://elevenlabs.io/
2. Crea cuenta o inicia sesión
3. Navega a **Settings → API Keys**
4. Crea nueva API key y cópiala

**Configurar Backend**:

Edita `apps/api/.env`:

```bash
# REQUERIDO
ELEVENLABS_API_KEY=tu-api-key-aqui

# OPCIONAL (valores por defecto)
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM  # Rachel (clara, profesional)
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
```

### 2. Iniciar el Sistema

```bash
# Opción 1: Script automático (recomendado)
.\start-dev.bat  # Windows

# Opción 2: Manual
# Terminal 1 - Backend
cd apps/api
npm run dev

# Terminal 2 - Frontend
cd apps/web
npm run dev
```

### 3. Verificar Funcionamiento

**Backend debe mostrar**:
```
✅ ElevenLabs Service initialized
   - Default Voice ID: 21m00Tcm4TlvDq8ikWAM
   - Model: eleven_multilingual_v2
```

**Al recibir mensaje**:
```
🎙️ ElevenLabs: Generating speech...
   Text: "Hola, ¿cómo estás?"
   Voice: 21m00Tcm4TlvDq8ikWAM
✅ ElevenLabs: Audio generated (45232 bytes)
✅ Audio converted to base64 (60310 chars)
```

**Frontend (consola navegador)**:
```
🎙️ Playing ElevenLabs audio from backend
✅ ElevenLabs audio loaded
🎙️ ElevenLabs audio playing
✅ ElevenLabs audio finished
```

### 4. Probar Fallback a Web Speech API

**Simular fallo de ElevenLabs**:
1. Detén el backend temporalmente
2. Envía un mensaje en el chat
3. Frontend debe usar Web Speech API automáticamente:
   ```
   ⚠️ No audio from backend, using Web Speech API fallback
   🗣️ Using Web Speech API fallback
   ```

## 🎛️ Cambiar Voz de ElevenLabs

### Método 1: Variable de Entorno (Recomendado)

1. **Encuentra voice ID** en https://elevenlabs.io/app/voice-lab
2. **Edita `.env`** en `apps/api/`:
   ```bash
   ELEVENLABS_VOICE_ID=nuevo-voice-id-aqui
   ```
3. **Reinicia backend**:
   ```bash
   # Ctrl+C para detener
   npm run dev
   ```

### Voces Recomendadas para Español

| Voz | Voice ID | Género | Tono | Mejor Para |
|-----|----------|--------|------|------------|
| **Rachel** | `21m00Tcm4TlvDq8ikWAM` | Femenino | Clara, profesional | Uso general (default) |
| **Bella** | `EXAVITQu4vr4xnSDxMaL` | Femenino | Cálida, amigable | Servicio al cliente |
| **Antoni** | `ErXwobaYiN019PkySvjV` | Masculino | Profesional | Negocios |
| **Domi** | `AZnzlk1XvdvUeBnXmlld` | Femenino | Confiada | Presentaciones |

### Método 2: Programáticamente (Futuro)

El backend ahora acepta `voiceId` como parámetro opcional. En el futuro se puede:
- Enviar `voiceId` desde el frontend en cada mensaje
- Permitir al usuario seleccionar voz en la UI
- Cambiar voz sin reiniciar el backend

## 🐛 Troubleshooting

### ❌ No se escucha voz

**1. Verificar que ElevenLabs está configurado**:
```bash
# Backend debe mostrar:
✅ ElevenLabs Service initialized

# Si muestra:
⚠️ ElevenLabs not configured, audio generation disabled
# → Falta ELEVENLABS_API_KEY en .env
```

**2. Verificar que hay fallback**:
```bash
# Frontend console debe mostrar:
⚠️ No audio from backend, using Web Speech API fallback
🗣️ Using Web Speech API fallback

# Si no muestra nada → Revisar ChatWindow.tsx
```

**3. Verificar autoplay del navegador**:
```bash
# Si console muestra:
Audio bloqueado por el navegador. Haz clic para habilitar.

# → Haz clic en cualquier parte de la página
```

### ❌ Error de ElevenLabs API

**Quota excedida**:
```bash
❌ ElevenLabs error: Quota exceeded
```
**Solución**:
- Revisar uso en https://elevenlabs.io/app/usage
- Esperar reset mensual o upgrade plan

**API Key inválida**:
```bash
❌ ElevenLabs error: Invalid API key
```
**Solución**:
- Verificar key en https://elevenlabs.io/app/settings/api-keys
- Copiar key correctamente en `.env`

### ❌ Voz se corta o no interrumpe

**Barge-in no funciona**:
1. Verificar que `chat.stopVoice()` está disponible
2. Revisar console logs:
   ```
   ⚡ Barge-in: User sent message, stopping voice output
   ⚡ Barge-in: User started speaking, stopping agent voice
   ```
3. Si no aparecen → Problema en `useHybridVoice` o `ChatWindow`

## 📊 Flujo de Datos Completo

```
┌─────────────┐
│   Usuario   │
│  (Frontend) │
└──────┬──────┘
       │ 1. Envía mensaje
       ↓
┌──────────────────────┐
│  useAIChatWebSocket  │  ← Hook principal
│   (Chat Manager)     │
└──────────┬───────────┘
           │ 2. WebSocket → Backend
           ↓
    ┌─────────────┐
    │   Backend   │
    │  (Express)  │
    └──────┬──────┘
           │ 3. OpenAI genera texto
           ↓
    ┌──────────────────┐
    │ ElevenLabs API   │
    │ (Text-to-Speech) │
    └──────┬───────────┘
           │ 4. Genera audio MP3
           ↓
    ┌─────────────┐
    │  Backend    │
    │ Base64 Encode│
    └──────┬──────┘
           │ 5. WebSocket → Frontend
           ↓
┌──────────────────────┐
│  useHybridVoice      │  ← Audio Manager
└──────────┬───────────┘
           │
      ┌────┴─────┐
      ↓          ↓
┌──────────┐  ┌─────────────────┐
│ElevenLabs│  │ Web Speech API  │
│  Audio   │  │   (Fallback)    │
└────┬─────┘  └────┬────────────┘
     │             │
     └─────┬───────┘
           │ 6. Reproducción automática
           ↓
      ┌─────────┐
      │ Usuario │
      │ Escucha │
      └─────────┘
```

## 🎨 Estados de la UI

### Indicadores Visuales

1. **"Hablando..."** (header del chat)
   - Se muestra cuando `chat.isSpeaking === true`
   - Icono Volume2 animado con pulse

2. **Nombre de voz** (bajo "Hablando...")
   - Muestra `chat.voiceName`
   - Ejemplos: "ElevenLabs", "Navegador (fallback)", "Microsoft Sabina"

3. **Error de voz** (área de input)
   - Se muestra cuando `chat.voiceError !== null`
   - Color amarillo (warning)

## 💰 Costos de ElevenLabs

### Plan Gratuito
- **10,000 caracteres/mes**
- ~200-250 respuestas del agente
- Perfecto para desarrollo y pruebas

### Monitoreo
1. Dashboard: https://elevenlabs.io/app/usage
2. Logs del backend: `✅ Audio generated (XXX bytes)`
3. Alerta cuando se acerca al límite

### Planes Pagos
- **Starter**: $5/mes - 30,000 caracteres
- **Creator**: $22/mes - 100,000 caracteres
- **Pro**: $99/mes - 500,000 caracteres

## 🔒 Consideraciones de Seguridad

1. **API Key**: Nunca exponer en frontend, solo en backend `.env`
2. **HTTPS**: Voz requiere HTTPS en producción (HTTP ok para localhost)
3. **Autoplay**: Navegadores modernos bloquean autoplay hasta que usuario interactúa
4. **Rate Limiting**: ElevenLabs tiene límites de API, implementar throttling si necesario

## 📝 Próximas Mejoras (Opcional)

- [ ] Selector de voz en la UI
- [ ] Cache de audio para respuestas comunes
- [ ] Ajuste de velocidad de voz (rate)
- [ ] Modo solo-texto (desactivar voz)
- [ ] Streaming de audio (chunks) para reducir latencia
- [ ] Soporte multiidioma
- [ ] Analytics de uso de voz

## 📞 Soporte

- **ElevenLabs Docs**: https://docs.elevenlabs.io/
- **Voice Lab**: https://elevenlabs.io/app/voice-lab
- **API Reference**: https://docs.elevenlabs.io/api-reference
- **Status**: https://status.elevenlabs.io/

---

**Implementado**: Enero 2025
**Versión**: 1.0.0
**Estado**: ✅ Producción Lista
