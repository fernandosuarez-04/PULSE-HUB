# 🔍 Guía de Diagnóstico de Voz en Móviles

## Problema: "No detecta mi voz" en dispositivos móviles

### ✅ Checklist de Diagnóstico

Sigue estos pasos **en orden** para identificar el problema:

#### 1. Abre la Consola del Navegador

**En iOS Safari:**
1. Ve a Ajustes → Safari → Avanzado
2. Activa "Inspeccionar web"
3. Conecta tu iPhone al Mac con cable
4. Abre Safari en Mac → Desarrollar → [Tu iPhone] → [La página web]

**En Chrome Android:**
1. En la página web, toca los 3 puntos (menú)
2. Selecciona "Desarrollador" (si no aparece, busca en Chrome flags)
3. O usa `chrome://inspect` desde una computadora

#### 2. Busca estos Mensajes en la Consola

Cuando tocas el botón del micrófono, **DEBES VER** estos mensajes en orden:

```
✅ Mensajes que DEBEN aparecer:
🎤 Requesting microphone (MOBILE mode)...
✅ Microphone permissions granted
🎙️ Audio tracks: 1
🔊 Audio track settings: {...}
🎤 Voice recognition started - Microphone is active
```

**Cuando hablas, DEBES VER:**
```
🔊 Audio capture started - System is receiving audio  ← CRÍTICO
🎵 Sound detected - Microphone is picking up sound      ← CRÍTICO
🗣️ Speech detected - Voice recognition active          ← CRÍTICO
📝 Interim transcription: "..."
📝 Final transcription: "..."
```

#### 3. Identifica el Problema según los Logs

##### Caso A: No aparece "Audio capture started"
**Problema:** El navegador no está recibiendo audio del micrófono

**Soluciones:**
1. Cierra otras apps que usen el micrófono (WhatsApp, Zoom, etc.)
2. Verifica que el micrófono físico funcione (graba un memo de voz)
3. Reinicia el navegador
4. Reinicia el teléfono

##### Caso B: Aparece "Audio capture" pero NO "Sound detected"
**Problema:** El micrófono funciona pero no detecta sonido

**Soluciones:**
1. Habla MÁS FUERTE
2. Acerca el teléfono a tu boca (5-10 cm)
3. Busca un lugar más silencioso
4. Verifica que no tengas auriculares conectados (el micrófono debe ser el del teléfono)

##### Caso C: Aparece "Sound detected" pero NO "Speech detected"
**Problema:** Detecta sonido pero no reconoce como voz

**Soluciones:**
1. Habla más CLARAMENTE
2. Habla en ESPAÑOL (el sistema está configurado para español)
3. Evita palabras muy cortas o murmurar
4. Prueba diciendo frases completas: "Hola, ¿cómo funciona esto?"

##### Caso D: Aparece "Speech detected" pero NO "Transcription"
**Problema:** Reconoce voz pero no logra transcribir

**Soluciones:**
1. Verifica tu conexión a internet (el reconocimiento requiere internet)
2. Cambia a WiFi si estás en datos móviles
3. Prueba recargando la página
4. Tu acento puede ser difícil de reconocer - habla más despacio

#### 4. Verificación de Configuración del Sistema

**iOS:**
1. Ajustes → Safari → Cámara
2. Debe estar en "Preguntar" o "Permitir"
3. Ajustes → Safari → Micrófono
4. Debe estar en "Preguntar" o "Permitir"

**Android:**
1. Ajustes → Apps → Chrome (o tu navegador)
2. Permisos → Micrófono
3. Debe estar en "Permitir"

#### 5. Prueba de Audio del Sistema

Antes de usar el chat, prueba que tu micrófono funcione:

**iOS:**
- Abre "Notas de voz" y graba algo
- Si funciona ahí pero no en el chat, es un problema del navegador

**Android:**
- Abre "Grabadora" y graba algo
- Si funciona ahí pero no en el chat, es un problema del navegador

### 🔧 Configuración Actual del Sistema

El código está configurado así para móviles:

```javascript
// MÓVILES (iOS/Android)
continuous: false           // Modo single-shot
interimResults: true        // Muestra texto mientras hablas
noiseSuppression: false     // Desactivado para mejor detección
sampleRate: 48000           // Alta calidad
channelCount: 1             // Mono

// ESCRITORIO
continuous: true            // Modo continuo
interimResults: true        // Muestra texto mientras hablas
noiseSuppression: true      // Activado
```

### 📊 Logs Esperados (Flujo Completo)

```
1. Usuario toca botón de micrófono:
   🎤 Requesting microphone (MOBILE mode)...

2. Usuario acepta permisos:
   ✅ Microphone permissions granted
   🎙️ Audio tracks: 1
   🔊 Audio track settings: {sampleRate: 48000, ...}

3. Sistema inicia reconocimiento:
   🎤 Voice recognition started - Microphone is active

4. Usuario empieza a hablar:
   🔊 Audio capture started - System is receiving audio
   🎵 Sound detected - Microphone is picking up sound
   🗣️ Speech detected - Voice recognition active

5. Sistema transcribe:
   📝 Interim transcription: "hola" (confidence: 85.5%)
   📝 Interim transcription: "hola cómo" (confidence: 87.2%)
   📝 Final transcription: "hola cómo estás" (confidence: 92.1%)

6. Usuario deja de hablar:
   🔇 Speech ended - No more speech detected
   🔕 Sound ended - No more sound detected
   🔇 Audio capture ended
   🔄 Voice recognition ended

7. Sistema envía mensaje:
   📤 Sending message: "hola cómo estás"
```

### 🚨 Problemas Comunes y Soluciones Rápidas

#### "El botón dice 'Escuchando' pero no aparecen logs"
- El reconocimiento no se inició correctamente
- Solución: Toca el botón rojo de nuevo para detener, luego reinicia

#### "Aparece 'no-speech' error"
- El sistema esperó pero no detectó voz
- Solución: Habla INMEDIATAMENTE después de tocar el botón
- En móviles tienes ~5 segundos para empezar a hablar

#### "Funciona la primera vez pero no después"
- El reconocimiento no se limpió correctamente
- Solución: Recarga la página web completamente

#### "Solo transcribe 1-2 palabras y se detiene"
- En modo móvil (continuous: false) esto es normal
- El sistema detecta una pausa y finaliza
- Solución: Habla sin pausas largas

### 📱 Prueba Específica para Tu Caso

Sigue estos pasos EXACTAMENTE:

1. **Abre la consola del navegador** (instrucciones arriba)

2. **Toca el botón del micrófono** en el chat

3. **Espera 1 segundo** (para que se inicie)

4. **Di en voz alta y clara:** "Hola, esto es una prueba de voz"

5. **Copia TODOS los logs** que aparezcan en la consola

6. **Comparte los logs** - así podemos ver exactamente dónde falla

### 🔄 Últimos Recursos

Si nada funciona:

1. **Prueba en modo incógnito/privado** - puede haber permisos cacheados
2. **Actualiza tu navegador** a la última versión
3. **Prueba otro navegador:**
   - iOS: Safari (recomendado)
   - Android: Chrome o Samsung Internet
4. **Verifica que no tengas VPN activa** - puede bloquear el servicio de Google

### 💡 Contacto con Soporte

Si sigues este diagnóstico completo y no funciona, envía:

1. ✅ Modelo de teléfono y versión del sistema (ej: iPhone 13, iOS 17.2)
2. ✅ Navegador y versión (ej: Safari 17.2)
3. ✅ TODOS los logs de la consola (screenshots)
4. ✅ Confirmación de que el micrófono funciona en otras apps
5. ✅ Pasos exactos que seguiste

---

**Última actualización**: Enero 2025

## 🎯 TL;DR (Resumen Ejecutivo)

**El problema más común:** El navegador no detecta audio del micrófono.

**Solución más efectiva:**
1. Abre consola del navegador
2. Busca el mensaje "🎵 Sound detected"
3. Si NO aparece → Habla más fuerte o acerca el micrófono
4. Si SÍ aparece pero no transcribe → Problema de red, cambia a WiFi
