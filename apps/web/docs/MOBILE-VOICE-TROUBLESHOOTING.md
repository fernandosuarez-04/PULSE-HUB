# 📱 Guía de Troubleshooting: Reconocimiento de Voz en Móviles

Esta guía te ayudará a diagnosticar y resolver problemas con el reconocimiento de voz del Agente IA en dispositivos móviles (iOS y Android).

## 🔍 Problemas Comunes y Soluciones

### 1. El micrófono no detecta la voz

**Síntomas:**
- El indicador "🎤 Escuchando..." aparece pero no transcribe
- La consola muestra "🎤 Voice recognition started" pero no hay eventos de voz

**Causas posibles:**
- Permisos de micrófono denegados
- Micrófono en uso por otra aplicación
- Configuración incorrecta del navegador

**Soluciones:**

#### En iOS (Safari/Chrome):
1. **Verifica permisos del sistema:**
   - Ve a **Configuración** → **Safari** → **Permisos de sitios web**
   - Asegúrate de que el micrófono esté permitido para tu sitio

2. **Recarga la página:**
   - El Web Speech API en iOS requiere interacción del usuario
   - Cierra y abre la página de nuevo

3. **Usa HTTPS:**
   - El micrófono SOLO funciona en conexiones HTTPS
   - Localhost está exento en desarrollo

4. **Actualiza iOS:**
   - El Web Speech API solo está disponible desde iOS 14.5+
   - Actualiza a la versión más reciente

#### En Android (Chrome/Firefox):
1. **Verifica permisos del navegador:**
   - Toca el icono de candado en la barra de direcciones
   - Ve a **Permisos** → **Micrófono** → **Permitir**

2. **Cierra apps que usen el micrófono:**
   - Asistentes de voz (Google Assistant, etc.)
   - Apps de grabación
   - Otras pestañas del navegador con audio activo

3. **Prueba en modo incógnito:**
   - Abre una ventana de incógnito
   - Esto descarta problemas con extensiones o caché

### 2. La transcripción se detiene demasiado pronto

**Síntomas:**
- Solo transcribe las primeras palabras
- Se detiene después de 1-2 segundos

**Solución aplicada (v1.2):**
- ✅ Ahora `continuous: true` está habilitado para todos los dispositivos
- ✅ La detección de silencio espera 1.5 segundos antes de detenerse

### 3. Audio de mala calidad / Ruido de fondo

**Síntomas:**
- Transcripciones incorrectas
- No detecta palabras claramente pronunciadas

**Solución aplicada (v1.2):**
- ✅ `noiseSuppression: true` ahora habilitado para móviles
- ✅ `echoCancellation: true` para reducir eco
- ✅ `autoGainControl: true` para normalizar volumen

**Recomendaciones adicionales:**
- Habla cerca del micrófono (10-15 cm)
- Reduce ruido de fondo
- Habla de manera clara y pausada

### 4. Error "NotAllowedError" o "PermissionDeniedError"

**Mensaje de error:**
```
Permisos de micrófono denegados. Por favor, permite el acceso al micrófono.
En móvil, revisa la configuración del navegador y permisos del sistema.
```

**Soluciones:**

#### iOS:
1. **Configuración del sistema:**
   - **Configuración** → **Safari** → **Permisos**
   - Activa "Preguntar" o "Permitir" para Micrófono

2. **Por sitio específico:**
   - En Safari, toca **aA** en la barra de direcciones
   - Toca **Configuración del sitio web**
   - Cambia **Micrófono** a **Permitir**

#### Android:
1. **Configuración del navegador:**
   - Chrome: **⋮** → **Configuración** → **Configuración de sitios** → **Micrófono**
   - Asegúrate de que el sitio tenga permiso

2. **Permisos de la app:**
   - **Configuración** → **Apps** → **Chrome** → **Permisos**
   - Activa **Micrófono**

### 5. Error "NotReadableError"

**Mensaje de error:**
```
El micrófono está en uso por otra app. Cierra otras apps y vuelve a intentar.
```

**Causas:**
- Otra app está usando el micrófono exclusivamente
- El micrófono está bloqueado por el sistema

**Soluciones:**
1. Cierra todas las apps que puedan usar el micrófono
2. Cierra otras pestañas del navegador con audio activo
3. Reinicia el navegador
4. Como último recurso, reinicia el dispositivo

## 🧪 Modo de Diagnóstico

Para ver logs detallados del reconocimiento de voz:

1. **Abre la consola del navegador:**
   - **iOS Safari:** No disponible directamente en el dispositivo (usa Remote Debugging)
   - **Android Chrome:** No disponible directamente (usa Remote Debugging)
   - **Desktop:** Presiona F12

2. **Remote Debugging (recomendado para móviles):**

   ### iOS:
   1. Conecta tu iPhone a tu Mac vía cable
   2. En iPhone: **Configuración** → **Safari** → **Avanzado** → Activa **Inspector web**
   3. En Mac: Abre Safari → **Desarrollo** → [Tu dispositivo] → [Tu página]

   ### Android:
   1. Activa **Opciones de desarrollador** en Android
   2. Activa **Depuración USB**
   3. Conecta tu dispositivo a la PC
   4. En Chrome PC: Ve a `chrome://inspect`
   5. Selecciona tu dispositivo y página

3. **Logs esperados:**
```
🔧 Speech Recognition configured for MOBILE:
  continuous: true
  interimResults: true
  lang: "es-ES"
  device: "Mobile"

🎤 Requesting microphone (MOBILE mode)...

✅ Microphone permissions granted
🎙️ Audio tracks: 1

📱 Mobile audio configuration:
  - Sample rate: 48000
  - Echo cancellation: true
  - Noise suppression: true
  - Auto gain control: true

🎤 Voice recognition started - Microphone is active
🔊 Audio capture started - System is receiving audio
🎵 Sound detected - Microphone is picking up sound
🗣️ Speech detected - Voice recognition active

📝 Interim transcription: "hola" (confidence: 0%)
📝 Final transcription: "hola cómo estás" (confidence: 95.3%)

🔇 Silence detected, stopping recognition
```

## 📋 Checklist de Troubleshooting

Antes de reportar un problema, verifica:

- [ ] Estás usando HTTPS (requerido para getUserMedia)
- [ ] Los permisos del micrófono están activos en el sistema
- [ ] Los permisos del navegador permiten acceso al micrófono
- [ ] No hay otras apps usando el micrófono
- [ ] Tu navegador soporta Web Speech API
- [ ] Tienes conexión a internet (requerido para Speech API)
- [ ] Hablas en español (el sistema está configurado para `es-ES`)
- [ ] El volumen del micrófono es adecuado

## 🔧 Información Técnica

### Configuración del Web Speech API

```typescript
// Configuración actual (v1.2)
recognition.lang = 'es-ES';
recognition.continuous = true;  // ✅ Siempre continuo
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// Audio constraints
audio: {
  echoCancellation: true,      // ✅ Activo en móviles
  noiseSuppression: true,      // ✅ Activo en móviles
  autoGainControl: true,
  sampleRate: { ideal: 48000 }, // Móvil: Alta calidad
  channelCount: 1,              // Mono
  latency: { ideal: 0 }         // Baja latencia
}
```

### Navegadores Compatibles

| Navegador | iOS | Android | Notas |
|-----------|-----|---------|-------|
| Safari | ✅ 14.5+ | N/A | Requiere HTTPS |
| Chrome | ✅ | ✅ | Mejor soporte |
| Firefox | ❌ | ⚠️ Parcial | Soporte limitado |
| Edge | ✅ | ✅ | Basado en Chromium |

## 📞 Soporte Adicional

Si después de seguir esta guía el problema persiste:

1. Anota el modelo de tu dispositivo y versión del SO
2. Anota el navegador y versión exacta
3. Copia los logs de la consola (ver sección de Remote Debugging)
4. Describe exactamente qué sucede vs. qué esperabas
5. Contacta al equipo de desarrollo con esta información

## 🔄 Historial de Cambios

### v1.2 (2025-01-17)
- ✅ Habilitado `noiseSuppression: true` para móviles
- ✅ Habilitado `continuous: true` para todos los dispositivos
- ✅ Mejorado manejo de errores con mensajes específicos para móviles
- ✅ Agregado diagnóstico detallado en consola
- ✅ Mejorado feedback visual en la UI

### v1.1
- Configuración inicial con soporte móvil básico

---

**Última actualización:** 17 de Enero de 2025
