# 🎙️ Guía de Troubleshooting - Sistema de Voz

## Sistema de Voz Completo Implementado

### ✅ Características Implementadas

#### **1. Síntesis de Voz (useVoiceSynthesis)**

**Implementación Directa y Simple**:
- ✅ Selección explícita de voz natural en español (Google/Microsoft preferido)
- ✅ Tono cálido y profesional (rate: 0.9, pitch: 1.05)
- ✅ Limpieza de markdown para habla natural
- ✅ Interrupción robusta (barge-in) cuando usuario habla
- ✅ Implementación sin lógica compleja de warm-up

**Prevención de Errores**:
- ✅ Tracking de mensajes con `lastSpokenMessageIdRef`
- ✅ Solo se habla cada mensaje del agente una vez
- ✅ Manejo inteligente de errores de Chrome (ignora not-allowed, canceled, interrupted)
- ✅ Logging detallado para debugging

#### **2. Reconocimiento de Voz (useVoiceRecognition)**

**Optimización de Calidad de Audio**:
- ✅ **Filtros de audio** para sonido limpio:
  - `echoCancellation: true` - Reduce eco de altavoces
  - `noiseSuppression: true` - Filtra ruido de fondo
  - `autoGainControl: true` - Normaliza volumen del micrófono
- ✅ **VAD optimizado** (Voice Activity Detection) para conversación fluida
- ✅ Reconocimiento en español (es-ES)
- ✅ Single-shot recognition (se detiene después de un resultado)
- ✅ Manejo comprehensivo de errores con mensajes amigables

**Nota Técnica Importante**:
La Web Speech API (SpeechRecognition) no acepta directamente un MediaStream como entrada. Sin embargo, solicitamos permisos de micrófono con los filtros de calidad usando `getUserMedia`, lo cual influencia el pipeline de audio del navegador y puede mejorar la precisión del reconocimiento.

#### **3. Integración en ChatWindow**

**Flujo Conversacional Completo**:
- ✅ Auto-speak de respuestas del agente (solo mensajes nuevos)
- ✅ Barge-in: detiene habla del agente cuando usuario empieza a hablar
- ✅ Indicadores visuales: "Hablando..." en header cuando agente habla
- ✅ Estado del micrófono: botón rojo cuando escuchando
- ✅ Limpieza de recursos: MediaStream se detiene apropiadamente

### 🔍 Cómo Verificar que Funciona

#### Paso 1: Abrir la Consola del Navegador
1. Presiona `F12` o `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
2. Ve a la pestaña "Console"

#### Paso 2: Verificar Inicialización del Sistema de Voz
Al abrir el chat, deberías ver:
```
🎤 Available voices: [lista de voces disponibles]
✅ Google voice selected: [nombre]
// o
✅ Microsoft voice selected: [nombre]
// o
✅ Quality voice selected: [nombre]
```

#### Paso 3: Probar Reconocimiento de Voz con Filtros de Audio
1. Haz clic en el botón del micrófono
2. Verás en consola:
```
🎤 Microphone permissions granted with quality filters: {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true
}
🎙️ Voice recognition started with optimized audio settings
```
3. Habla tu mensaje
4. Cuando termines, verás el transcript aparecer en el input

#### Paso 4: Probar Síntesis de Voz
1. Envía un mensaje al agente (escribe o usa voz)
2. Cuando el agente responda, verás:
```
🗣️ Speaking new message: msg-[timestamp]
🗣️ Starting speech: [primeras 50 letras]...
✅ Using voice: Google español de España
🎙️ Agent speaking
✅ Agent finished speaking
```
3. Verás "Hablando..." en el header del chat mientras el agente habla

#### Paso 5: Probar Barge-in (Interrupción)
1. Envía un mensaje que genere una respuesta larga
2. Mientras el agente habla, haz clic en el botón del micrófono
3. Verás en consola:
```
⚡ Barge-in: User started speaking, stopping agent
🔇 Audio stream stopped
```
4. El agente debe detenerse inmediatamente

### 🎤 Filtros de Audio Explicados

#### ¿Qué hacen los filtros de audio?

**echoCancellation (Cancelación de Eco)**:
- Elimina el eco producido cuando el micrófono captura el sonido de los altavoces
- Especialmente útil en laptops donde micrófono y altavoces están cerca
- Mejora significativamente la calidad en conversaciones bidireccionales

**noiseSuppression (Supresión de Ruido)**:
- Filtra ruido de fondo (ventiladores, tráfico, conversaciones lejanas)
- Enfoca en la voz del hablante principal
- Reduce "hiss" y ruido constante del micrófono

**autoGainControl (Control Automático de Ganancia)**:
- Normaliza el volumen del micrófono automáticamente
- Compensa cuando hablas más fuerte o más suave
- Mantiene nivel de audio consistente

#### Limitación Técnica: Web Speech API

⚠️ **Importante**: La Web Speech API (SpeechRecognition) no acepta directamente un MediaStream como entrada. Esto significa que no podemos garantizar al 100% que los filtros de audio se apliquen al reconocimiento de voz.

**Lo que hacemos**:
1. Solicitamos permisos de micrófono con `getUserMedia` usando los filtros de calidad
2. Esto "inicializa" el pipeline de audio del navegador con estos ajustes
3. Luego iniciamos SpeechRecognition, que usa el micrófono del sistema
4. En la mayoría de navegadores, esto influencia positivamente la calidad del reconocimiento

**Resultados esperados**:
- ✅ En Chrome/Edge: Generalmente mejora la calidad notablemente
- ✅ En Firefox: Beneficio moderado, depende de la implementación
- ⚠️ En Safari: Soporte limitado, puede no tener efecto significativo

### ⚠️ Si Aún No Funciona

#### Error: "not-allowed" o permisos denegados (Síntesis de Voz)
**Causa**: El navegador bloqueó la síntesis de voz
**Solución**:
1. Verifica el ícono de candado en la barra de direcciones
2. Asegúrate de que los permisos de micrófono estén permitidos
3. Recarga la página y acepta permisos cuando se soliciten

#### Error: "Permisos de micrófono denegados" (Reconocimiento)
**Causa**: Usuario rechazó permisos de micrófono o navegador bloqueó acceso
**Solución**:
1. Haz clic en el ícono de candado en la barra de direcciones
2. Busca "Micrófono" en la lista de permisos
3. Cambia de "Bloqueado" a "Permitir"
4. Recarga la página
5. Haz clic en el botón del micrófono nuevamente

#### Error: "synthesis-unavailable"
**Causa**: speechSynthesis no está disponible en el navegador
**Solución**:
- Usa Chrome, Edge o navegador basado en Chromium
- Firefox también soporta síntesis de voz
- Safari puede tener soporte limitado

#### Error: "network"
**Causa**: Voces en la nube no disponibles
**Solución**:
1. Verifica conexión a internet
2. El navegador intentará usar voces locales automáticamente
3. Espera unos segundos y reintenta

#### No se escucha nada (sin error)
**Causa**: Volumen del sistema o navegador en silencio
**Solución**:
1. Verifica el volumen del sistema
2. Verifica el volumen de la pestaña del navegador
3. Cierra y abre el chat de nuevo

#### Reconocimiento de voz con mucho ruido o eco
**Causa**: Filtros de audio no se aplican o calidad de micrófono baja
**Solución**:
1. Verifica en consola que ves: "🎤 Microphone permissions granted with quality filters"
2. Prueba con auriculares para reducir eco de altavoces
3. Cierra otras aplicaciones que puedan estar usando el micrófono
4. Verifica configuración de micrófono en sistema operativo:
   - Windows: Configuración → Sistema → Sonido → Propiedades del micrófono
   - Mac: Preferencias → Sonido → Entrada
5. Si el problema persiste, puede ser limitación del hardware del micrófono

#### Audio se corta o no se reconoce voz
**Causa**: VAD (Voice Activity Detection) muy sensible o problema de permisos
**Solución**:
1. Habla más claramente y cerca del micrófono
2. Verifica que el indicador "Escuchando..." aparezca cuando hablas
3. Reduce ruido ambiente
4. Verifica que MediaStream se haya creado correctamente en consola
5. Prueba con otro navegador (Chrome/Edge recomendado)

### 🐛 Errores Específicos y Soluciones

#### Error en consola: `event.error = "canceled"`
**Causa Normal**: El mensaje anterior fue cancelado para hablar uno nuevo
**Acción**: Ninguna, es comportamiento esperado

#### Error en consola: `event.error = "interrupted"`
**Causa Normal**: El usuario empezó a hablar (barge-in)
**Acción**: Ninguna, es comportamiento esperado

#### Error persistente: `event.error = "synthesis-failed"`
**Causa**: Problema con el motor de síntesis
**Solución**:
1. Recarga la página con `Ctrl+F5` (forzar recarga)
2. Cierra todas las pestañas y abre de nuevo
3. Reinicia el navegador
4. Si persiste, verifica actualizaciones del navegador

### 📊 Información de Debug

Para obtener información completa de debug, ejecuta en la consola:

```javascript
// Ver voces disponibles
console.table(speechSynthesis.getVoices().map(v => ({
  name: v.name,
  lang: v.lang,
  local: v.localService
})));

// Verificar si está soportado
console.log('Soportado:', 'speechSynthesis' in window);

// Verificar si está hablando
console.log('Hablando:', window.speechSynthesis.speaking);

// Verificar voces cargadas
console.log('Voces cargadas:', window.speechSynthesis.getVoices().length);
```

### 🎯 Casos de Prueba

#### Prueba 1: Voz básica ✅
```
Usuario: "Hola"
Esperado:
- El agente responde con texto
- El agente habla la respuesta en español
- Indicador "🗣️ Hablando..." visible en header
```

#### Prueba 2: Interrupción (barge-in) ✅
```
Usuario: Pregunta larga
Agente: Empieza a responder (hablando)
Usuario: Hace clic en micrófono y habla
Esperado:
- El agente se detiene inmediatamente
- Log en consola: "⚡ Barge-in: User started speaking, stopping agent"
- Nuevo mensaje se procesa
```

#### Prueba 3: Múltiples mensajes rápidos ✅
```
Usuario: "Hola" → "¿Qué tal?" → "Adiós" (rápidamente)
Esperado:
- Solo el último mensaje se habla
- Los anteriores se cancelan automáticamente
- Sin errores en consola
```

#### Prueba 4: Mensaje largo con markdown ✅
```
Usuario: "Dame una lista de 5 pasos"
Esperado:
- El agente responde con lista formateada
- Al hablar, NO pronuncia "asterisco" o "número"
- Habla de forma natural con pausas
```

### 🔧 Parámetros de Configuración

Si quieres ajustar la voz, edita en `useVoiceSynthesis.ts`:

```typescript
const DEFAULT_CONFIG = {
  lang: 'es-ES',    // Idioma (es-ES, es-MX, es-AR, etc.)
  rate: 0.9,        // Velocidad: 0.1 (muy lento) - 10 (muy rápido)
  pitch: 1.05,      // Tono: 0 (grave) - 2 (agudo)
  volume: 1.0,      // Volumen: 0 (silencio) - 1 (máximo)
};
```

**Recomendaciones**:
- `rate: 0.8-1.0` para mayor claridad
- `rate: 1.0-1.2` para conversación natural
- `pitch: 1.0-1.1` para voz profesional
- `pitch: 1.1-1.3` para voz más amigable

### 📞 Soporte Adicional

Si después de seguir estos pasos aún tienes problemas:

1. Captura screenshot de la consola con los errores
2. Indica navegador y versión (Chrome 120, Edge 119, etc.)
3. Copia los logs completos de la consola
4. Describe qué pasos seguiste

---

## 📋 Resumen de Implementación

### Archivos Modificados

**1. `useVoiceSynthesis.ts`** (apps/web/src/shared/components/AIChat/)
- ✅ Implementación directa sin warm-up complejo
- ✅ Selección inteligente de voz española (Google > Microsoft > calidad > cualquiera)
- ✅ Limpieza de markdown para habla natural
- ✅ Manejo de errores que ignora restricciones comunes de Chrome
- ✅ Configuración optimizada: rate 0.9, pitch 1.05, volume 1.0

**2. `useVoiceRecognition.ts`** (apps/web/src/shared/components/AIChat/)
- ✅ Solicitud de permisos con filtros de calidad de audio:
  - echoCancellation: true
  - noiseSuppression: true
  - autoGainControl: true
- ✅ Manejo de MediaStream con limpieza apropiada
- ✅ Logging detallado para verificar filtros aplicados
- ✅ Error handling comprehensivo
- ✅ Reconocimiento en español (es-ES)

**3. `ChatWindow.tsx`** (apps/web/src/shared/components/AIChat/)
- ✅ Integración de useVoiceSynthesis
- ✅ Auto-speak de respuestas del agente (solo mensajes nuevos)
- ✅ Tracking de mensajes hablados con lastSpokenMessageIdRef
- ✅ Barge-in: detiene agente cuando usuario habla
- ✅ Indicadores visuales: "Hablando..." en header
- ✅ Limpieza de recursos en unmount

**4. `index.ts`** (apps/web/src/shared/components/AIChat/)
- ✅ Exports de useVoiceSynthesis y tipos relacionados

### Características Clave

**Sistema de Voz Bidireccional**:
- 🎤 Entrada: Reconocimiento de voz con filtros de audio
- 🔊 Salida: Síntesis de voz en español natural
- ⚡ Interrupción: Barge-in cuando usuario habla
- 📊 Monitoreo: Logging detallado en consola

**Optimizaciones de Audio**:
- Cancelación de eco para conversaciones limpias
- Supresión de ruido de fondo
- Control automático de ganancia
- Voz cálida y profesional (rate: 0.9, pitch: 1.05)

**Manejo de Errores**:
- Ignora errores comunes de Chrome (not-allowed, canceled, interrupted)
- Mensajes de error user-friendly
- Cleanup apropiado de recursos
- Fallback a errores genéricos solo cuando necesario

---

**Última actualización**: Enero 2025
**Versión**: 1.1 - Sistema de voz completo con filtros de audio

**Archivos relacionados**:
- `apps/web/src/shared/components/AIChat/useVoiceSynthesis.ts` - Síntesis de voz
- `apps/web/src/shared/components/AIChat/useVoiceRecognition.ts` - Reconocimiento con filtros
- `apps/web/src/shared/components/AIChat/ChatWindow.tsx` - Integración y UI
- `apps/web/src/shared/components/AIChat/index.ts` - Exports
