# Guía de Reconocimiento de Voz en Móviles

## 🎤 Mejoras Implementadas para Dispositivos Móviles

### Cambios Técnicos

1. **Modo Continuo Activado** (`continuous: true`)
   - El reconocimiento permanece activo mientras el usuario habla
   - Mejor detección de voz en entornos móviles

2. **Resultados Parciales** (`interimResults: true`)
   - Muestra el texto transcrito en tiempo real mientras hablas
   - Feedback visual instantáneo de que el sistema está detectando la voz

3. **Timer de Silencio Inteligente**
   - Detecta automáticamente cuando dejas de hablar
   - Espera 1.5 segundos de silencio antes de enviar el mensaje
   - Se reinicia si vuelves a hablar

4. **Indicador Visual Mejorado**
   - Barras animadas que muestran que el sistema está escuchando
   - Mensaje claro: "🎤 Escuchando... Habla ahora"
   - Mayor contraste y tamaño para mejor visibilidad en móviles

5. **Tooltips en Botones**
   - Botón de micrófono: "Modo de voz"
   - Botón de enviar: "Enviar pregunta"

## 📱 Compatibilidad de Navegadores Móviles

### ✅ Soportados
- **Safari en iOS** (iPhone/iPad) - Soporte completo
- **Chrome en Android** - Soporte completo
- **Samsung Internet en Android** - Soporte completo

### ❌ No Soportados
- **Chrome en iOS** - No soporta Web Speech API (usa WebKit)
- **Firefox en iOS** - No soporta Web Speech API (usa WebKit)
- **Firefox en Android** - Soporte limitado

### 💡 Recomendación
En iOS, usar **Safari** para la mejor experiencia de reconocimiento de voz.

## 🔧 Cómo Usar el Modo de Voz en Móviles

### Paso 1: Activar el Modo de Voz
1. Abre el chat del agente IA
2. Toca el botón del micrófono (icono de ecualizador)
3. El navegador pedirá permisos de micrófono - **ACEPTA**

### Paso 2: Hablar
1. Verás el indicador "🎤 Escuchando... Habla ahora"
2. Habla claramente cerca del micrófono
3. Verás tu texto aparecer en tiempo real en el campo de entrada

### Paso 3: Envío Automático
1. Deja de hablar
2. Espera 1.5 segundos
3. El mensaje se enviará automáticamente

### Opción Manual
- Puedes tocar el botón del micrófono nuevamente para detener y enviar inmediatamente

## 🐛 Solución de Problemas Comunes

### "No se detecta voz"

**Posibles causas:**
1. **Permisos de micrófono denegados**
   - Ve a Configuración del navegador → Permisos → Busca el sitio → Activa Micrófono

2. **Micrófono bloqueado por otra app**
   - Cierra otras aplicaciones que usen el micrófono (Zoom, WhatsApp, etc.)

3. **Navegador no compatible**
   - Verifica que estés usando Safari en iOS o Chrome en Android

4. **Conexión a internet lenta**
   - El reconocimiento de voz requiere conexión a internet
   - Intenta conectarte a WiFi si estás en datos móviles

5. **Volumen bajo o ruido ambiental**
   - Habla más cerca del micrófono
   - Busca un lugar más silencioso

### "Error de reconocimiento de voz"

**Soluciones:**
1. Recarga la página web
2. Limpia el caché del navegador
3. Verifica tu conexión a internet
4. Intenta en modo incógnito/privado

### "El botón de micrófono no aparece"

**Soluciones:**
1. Verifica que estés en HTTPS (el reconocimiento de voz requiere conexión segura)
2. Tu navegador no soporta Web Speech API - prueba con Safari (iOS) o Chrome (Android)

## 🎯 Mejores Prácticas

### Para Mejor Precisión:
1. **Habla claramente** y a ritmo normal (ni muy rápido ni muy lento)
2. **Evita ruido de fondo** - busca un lugar tranquilo
3. **Mantén el teléfono cerca** de tu boca (10-20 cm)
4. **Usa frases completas** en lugar de palabras sueltas
5. **Espera el indicador** "🎤 Escuchando..." antes de hablar

### Para Mejor Experiencia:
1. **Usa auriculares con micrófono** para mayor calidad de audio
2. **Conecta a WiFi** para mejor velocidad de procesamiento
3. **Cierra apps en segundo plano** que puedan usar el micrófono
4. **Actualiza tu navegador** a la última versión disponible

## 🔍 Diagnóstico Técnico

### Consola del Navegador
Abre la consola del navegador (DevTools) para ver mensajes técnicos:

- `🎤 Microphone permissions granted` - Permisos otorgados correctamente
- `🎙️ Voice recognition started` - Reconocimiento iniciado
- `📝 Interim transcription: "..."` - Texto parcial detectado
- `📝 Final transcription: "..."` - Texto final confirmado
- `🔇 Silence detected` - Silencio detectado, enviando mensaje
- `❌ Voice recognition error` - Error en el reconocimiento

### Códigos de Error Comunes

| Error | Significado | Solución |
|-------|------------|----------|
| `not-allowed` | Permisos denegados | Activa permisos de micrófono |
| `no-speech` | No se detectó voz | Habla más alto o cerca del micrófono |
| `audio-capture` | Error de captura | Verifica que el micrófono funcione |
| `network` | Error de red | Verifica tu conexión a internet |
| `aborted` | Usuario canceló | Normal, no es un error |

## 📊 Configuración Técnica Actual

```typescript
// Configuración optimizada para móviles
recognition.continuous = true;        // Mantiene escucha activa
recognition.interimResults = true;    // Muestra resultados parciales
recognition.lang = 'es-ES';          // Español (España)
recognition.maxAlternatives = 1;      // Una alternativa de transcripción

// Constraints de audio
audio: {
  echoCancellation: true,    // Reduce eco
  noiseSuppression: true,    // Filtra ruido de fondo
  autoGainControl: true,     // Normaliza volumen
}

// Timer de silencio
silenceTimeout = 1500ms    // 1.5 segundos de silencio antes de enviar
```

## 🚀 Próximas Mejoras Planificadas

1. **Detección de idioma automática** - Soporte para inglés y español
2. **Ajuste de sensibilidad** - Usuario puede ajustar el timer de silencio
3. **Modo offline** - Reconocimiento básico sin internet
4. **Comandos de voz** - "enviar", "cancelar", etc.
5. **Visualización de volumen** - Indicador visual del nivel de audio
6. **Grabación de audio** - Opción para enviar audio en lugar de texto

## 📞 Soporte

Si continúas teniendo problemas con el reconocimiento de voz en móviles:

1. Verifica la compatibilidad de tu navegador
2. Revisa los logs en la consola del navegador
3. Prueba con diferentes navegadores (Safari en iOS, Chrome en Android)
4. Contacta al equipo de desarrollo con los detalles del error

---

**Última actualización**: Enero 2025
