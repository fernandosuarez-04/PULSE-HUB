# 🧪 Plan de Testing - Sistema de Voz en Móviles (v2.0)

## 📋 Objetivo

Validar que el sistema de reconocimiento de voz funciona correctamente en dispositivos móviles después de implementar la solución v2.0.

---

## 🎯 Alcance del Testing

### Plataformas a Probar:

#### Desktop (Control):
- ✅ Chrome 120+ (Windows/Mac)
- ✅ Edge 120+ (Windows)
- ⚠️ Safari (Mac) - Soporte básico

#### Móvil (Foco principal):
- ✅ Chrome Android (versión 90+)
- ✅ Safari iOS (iOS 14.5+)
- ℹ️ Firefox móvil (soporte limitado, no prioritario)

### Escenarios a Validar:

1. **Permisos de micrófono**
2. **Detección de voz**
3. **Transcripción precisa**
4. **Auto-submit de mensajes**
5. **Comportamiento single-shot (móvil) vs continuous (desktop)**
6. **Manejo de errores**
7. **Rendimiento y consumo de batería**

---

## 🧪 Casos de Prueba

### Test Suite 1: Verificación de Configuración Inicial

#### TC-001: Verificar configuración por plataforma
**Objetivo**: Confirmar que la configuración se aplica correctamente según el dispositivo

**Pasos (Desktop)**:
1. Abrir el chat en Chrome desktop
2. Abrir la consola del navegador (F12)
3. Observar logs de inicialización

**Resultado esperado**:
```
🔧 Speech Recognition configured for DESKTOP:
  continuous: true
  interimResults: true
  lang: "es-ES"
  device: "Desktop"
  note: "Continuous mode enabled"
```

**Pasos (Móvil)**:
1. Abrir el chat en Chrome móvil
2. Conectar Remote Debugging (ver guía en MOBILE-VOICE-TROUBLESHOOTING.md)
3. Observar logs de inicialización en consola del PC

**Resultado esperado**:
```
🔧 Speech Recognition configured for MOBILE:
  continuous: false
  interimResults: true
  lang: "es-ES"
  device: "Mobile"
  note: "Single-shot mode for better stability"
```

**Criterio de aceptación**: ✅ Configuración correcta por plataforma

---

#### TC-002: Verificar que getUserMedia se omite en móviles
**Objetivo**: Confirmar que no se solicita getUserMedia en dispositivos móviles

**Pasos (Móvil)**:
1. Abrir el chat en Chrome móvil con Remote Debugging activo
2. Hacer clic en el botón del micrófono
3. Observar logs en consola

**Resultado esperado**:
```
📱 Mobile mode: Skipping getUserMedia, SpeechRecognition will handle permissions
💡 TIP: Accept microphone permission when prompted by the browser
🎙️ Voice recognition started (MOBILE - single-shot mode)
```

**NO debe aparecer**:
```
🎤 Requesting microphone (MOBILE mode)...
✅ Microphone permissions granted
🎙️ Audio tracks: 1
```

**Criterio de aceptación**: ✅ No hay logs de getUserMedia en móviles

---

### Test Suite 2: Funcionalidad de Permisos

#### TC-003: Primera solicitud de permisos (móvil)
**Objetivo**: Verificar que solo se solicita permiso una vez

**Pasos**:
1. Usar dispositivo móvil sin permisos previos
2. Abrir el chat por primera vez
3. Hacer clic en el botón del micrófono
4. Contar cuántas veces aparece el popup de permisos

**Resultado esperado**:
- 1 solicitud de permisos
- Popup nativo del navegador

**Criterio de aceptación**: ✅ Solo 1 solicitud de permisos

---

#### TC-004: Permisos denegados
**Objetivo**: Verificar manejo de permisos denegados

**Pasos**:
1. Denegar permisos cuando se soliciten
2. Observar mensaje de error

**Resultado esperado**:
- Mensaje: "Permisos de micrófono denegados. Revisa configuración del navegador."
- Botón del micrófono deshabilitado o con error visible

**Criterio de aceptación**: ✅ Mensaje de error claro y específico

---

### Test Suite 3: Detección de Voz

#### TC-005: Detección básica de voz (móvil)
**Objetivo**: Verificar que el micrófono detecta y transcribe voz

**Pasos**:
1. Hacer clic en el botón del micrófono
2. Esperar indicador "🎤 Escuchando..."
3. Hablar claramente: "Hola, ¿cómo estás?"
4. Observar transcripción en el input

**Resultado esperado**:
- Indicador "🎤 Escuchando..." visible
- Transcripción aparece en tiempo real (interim results)
- Transcripción final: "Hola, ¿cómo estás?"
- Reconocimiento se detiene automáticamente
- Mensaje se envía automáticamente

**Logs esperados**:
```
🎤 Voice recognition started - Microphone is active
📝 Interim transcription: "hola" (confidence: 0%)
📝 Final transcription: "Hola, ¿cómo estás?" (confidence: 95%+)
📱 Mobile: Final result received, recognition will stop automatically
🔄 Voice recognition ended (MOBILE)
```

**Criterio de aceptación**: ✅ Detección exitosa y auto-submit

---

#### TC-006: Múltiples mensajes consecutivos (móvil)
**Objetivo**: Verificar que se pueden enviar múltiples mensajes por voz

**Pasos**:
1. Enviar mensaje por voz: "Hola"
2. Esperar respuesta del agente
3. Enviar segundo mensaje por voz: "¿Qué tal?"
4. Repetir 3 veces más

**Resultado esperado**:
- Cada mensaje se transcribe correctamente
- Cada mensaje se envía automáticamente
- No hay degradación de rendimiento
- Los permisos NO se solicitan de nuevo

**Criterio de aceptación**: ✅ 5 mensajes consecutivos exitosos

---

#### TC-007: Voz con ruido de fondo (móvil)
**Objetivo**: Verificar robustez ante ruido ambiente

**Pasos**:
1. Activar micrófono
2. Hablar con ruido moderado de fondo (música, tráfico)
3. Decir: "Háblame sobre inteligencia artificial"

**Resultado esperado**:
- Transcripción con al menos 80% de precisión
- Sistema no se detiene por ruido

**Criterio de aceptación**: ✅ Transcripción aceptable con ruido moderado

---

### Test Suite 4: Modo Single-shot vs Continuous

#### TC-008: Modo single-shot en móvil
**Objetivo**: Verificar que en móvil se detiene después de una frase

**Pasos**:
1. Activar micrófono en móvil
2. Hablar: "Primera frase"
3. Esperar 2 segundos en silencio
4. Hablar: "Segunda frase"

**Resultado esperado**:
- Primera frase se transcribe y envía
- Reconocimiento se detiene automáticamente
- Segunda frase NO se transcribe (micrófono ya está detenido)
- Usuario debe presionar micrófono de nuevo para segunda frase

**Criterio de aceptación**: ✅ Se detiene después de primera frase (single-shot)

---

#### TC-009: Modo continuous en desktop
**Objetivo**: Verificar que en desktop continúa escuchando

**Pasos**:
1. Activar micrófono en desktop
2. Hablar: "Primera frase"
3. Esperar 1 segundo en silencio
4. Hablar: "Segunda frase"

**Resultado esperado**:
- Primera frase se transcribe
- Sistema sigue escuchando (no se detiene)
- Segunda frase también se transcribe
- Se detiene después de 1.5s de silencio final

**Criterio de aceptación**: ✅ Escucha múltiples frases (continuous)

---

### Test Suite 5: Manejo de Errores

#### TC-010: Micrófono en uso por otra app (móvil)
**Objetivo**: Verificar error cuando micrófono está ocupado

**Pasos**:
1. Abrir app de grabación de voz y comenzar a grabar
2. Sin cerrar la app, abrir el chat
3. Intentar usar el micrófono del chat

**Resultado esperado**:
- Error: "El micrófono está en uso por otra app. Cierra otras apps y vuelve a intentar."
- Indicación clara del problema

**Criterio de aceptación**: ✅ Error descriptivo y solución sugerida

---

#### TC-011: Pérdida de conexión a internet
**Objetivo**: Verificar error cuando no hay internet

**Pasos**:
1. Activar modo avión en el dispositivo móvil
2. Intentar usar reconocimiento de voz

**Resultado esperado**:
- Error: "Error de red. Verifica tu conexión a internet."
- Sistema no se congela

**Criterio de aceptación**: ✅ Error de red detectado y manejado

---

### Test Suite 6: Rendimiento y UX

#### TC-012: Latencia de reconocimiento (móvil)
**Objetivo**: Medir tiempo de respuesta

**Pasos**:
1. Activar micrófono
2. Hablar: "Hola"
3. Medir tiempo desde que se termina de hablar hasta que aparece transcripción final

**Resultado esperado**:
- Latencia < 2 segundos
- Interim results aparecen inmediatamente

**Criterio de aceptación**: ✅ Latencia aceptable (< 2s)

---

#### TC-013: Consumo de batería (móvil)
**Objetivo**: Verificar que no hay consumo excesivo

**Pasos**:
1. Cargar dispositivo al 100%
2. Usar reconocimiento de voz durante 10 minutos (20 mensajes)
3. Medir porcentaje de batería restante

**Resultado esperado**:
- Consumo < 5% en 10 minutos de uso intensivo
- Dispositivo no se calienta excesivamente

**Criterio de aceptación**: ✅ Consumo de batería razonable

---

#### TC-014: Feedback visual claro (móvil)
**Objetivo**: Verificar que el usuario sabe qué está pasando

**Pasos**:
1. Activar micrófono
2. Observar indicadores visuales

**Resultado esperado**:
- Indicador "🎤 Escuchando... Habla ahora" visible
- Animación pulsante en el botón
- Mensaje de ayuda: "Habla claramente cerca del micrófono"
- Indicador desaparece cuando se detiene

**Criterio de aceptación**: ✅ Feedback visual claro en todo momento

---

## 📊 Matriz de Compatibilidad

### Dispositivos Recomendados para Testing:

| Dispositivo | OS | Navegador | Prioridad |
|-------------|-----|-----------|-----------|
| iPhone 12+ | iOS 14.5+ | Safari | 🔴 Alta |
| iPhone XR | iOS 14.5+ | Safari | 🟠 Media |
| Samsung Galaxy S21 | Android 11+ | Chrome | 🔴 Alta |
| Google Pixel 5 | Android 11+ | Chrome | 🟠 Media |
| Xiaomi Redmi Note 10 | Android 11+ | Chrome | 🟢 Baja |
| iPad Pro | iPadOS 14.5+ | Safari | 🟢 Baja |

### Navegadores Desktop (Control):

| Navegador | Versión | Prioridad |
|-----------|---------|-----------|
| Chrome | 120+ | 🔴 Alta |
| Edge | 120+ | 🟠 Media |
| Safari | 16+ | 🟢 Baja |

---

## ✅ Criterios de Éxito Global

### Móviles (Foco Principal):
- [ ] ✅ **TC-001 a TC-003**: Configuración correcta por plataforma
- [ ] ✅ **TC-004**: Manejo de permisos robusto
- [ ] ✅ **TC-005 a TC-007**: Detección de voz funcional (3/3 casos)
- [ ] ✅ **TC-008**: Modo single-shot funciona correctamente
- [ ] ✅ **TC-010 a TC-011**: Errores manejados apropiadamente
- [ ] ✅ **TC-012 a TC-014**: UX y rendimiento aceptables

### Desktop (Control):
- [ ] ✅ **TC-009**: Modo continuous funciona como antes
- [ ] ✅ No se introdujeron regresiones

### Cobertura Mínima:
- **Móvil**: 90% de casos exitosos (13/14 tests)
- **Desktop**: 100% de casos existentes funcionan

---

## 🔍 Herramientas de Testing

### Remote Debugging:

#### iOS:
1. Conecta iPhone a Mac vía cable
2. En iPhone: Configuración → Safari → Avanzado → Inspector web (ON)
3. En Mac: Safari → Desarrollo → [Tu iPhone] → [Tu página]

#### Android:
1. Activa Opciones de desarrollador
2. Activa Depuración USB
3. Conecta a PC
4. Chrome PC: `chrome://inspect`

### Logging:

Todos los tests deben documentar:
- ✅ Screenshots del indicador visual
- ✅ Logs de consola completos
- ✅ Tiempo de respuesta
- ✅ Errores encontrados

---

## 📝 Reporte de Testing

### Plantilla de Reporte:

```markdown
## Test Case: TC-XXX
**Dispositivo**: [iPhone 12 / Samsung S21 / etc]
**OS**: [iOS 15.2 / Android 12 / etc]
**Navegador**: [Safari / Chrome]

### Resultado: ✅ PASS / ❌ FAIL

**Observaciones**:
- [Lo que funcionó bien]
- [Problemas encontrados]
- [Sugerencias de mejora]

**Logs**:
```
[Pegar logs relevantes]
```

**Screenshots**: [Adjuntar capturas]
```

---

## 🚨 Protocolo de Fallos

### Si un test falla:

1. **Reproducir el error** 3 veces para confirmar
2. **Capturar logs completos** de la consola
3. **Documentar condiciones exactas**:
   - Modelo y versión del dispositivo
   - Versión del navegador
   - Pasos exactos para reproducir
4. **Verificar checklist**:
   - [ ] ¿Permisos concedidos?
   - [ ] ¿HTTPS activo?
   - [ ] ¿Conexión a internet estable?
   - [ ] ¿Otras apps usando micrófono?
5. **Reportar al equipo** con toda la información

---

## 📅 Cronograma Sugerido

### Fase 1: Testing Básico (Día 1)
- ✅ TC-001 a TC-003: Configuración
- ✅ TC-005: Detección básica
- ✅ TC-008: Modo single-shot

### Fase 2: Testing Completo (Día 2)
- ✅ TC-004, TC-006, TC-007: Permisos y robustez
- ✅ TC-009: Desktop control
- ✅ TC-010, TC-011: Manejo de errores

### Fase 3: UX y Rendimiento (Día 3)
- ✅ TC-012 a TC-014: Latencia, batería, feedback
- ✅ Testing en múltiples dispositivos

### Fase 4: Validación Final (Día 4)
- ✅ Revisión de todos los tests
- ✅ Testing de regresión
- ✅ Documentación final

---

## 🎯 Entregables

1. **Reporte de Testing Completo**:
   - Resultados de cada test case
   - Screenshots y logs
   - Métricas de rendimiento

2. **Lista de Issues Encontrados**:
   - Clasificados por prioridad
   - Pasos de reproducción
   - Sugerencias de solución

3. **Documentación Actualizada**:
   - Actualizar MOBILE-VOICE-TROUBLESHOOTING.md
   - Agregar casos edge conocidos

4. **Video Demostrativo**:
   - Grabación de pantalla mostrando funcionamiento en móvil
   - Comparación con desktop

---

## 📞 Contacto

**Si encuentras problemas durante el testing**:
1. Revisa la guía: `MOBILE-VOICE-TROUBLESHOOTING.md`
2. Revisa la solución: `SOLUCION_VOZ_MOVIL_V2.md`
3. Documenta el problema siguiendo el protocolo de fallos
4. Contacta al equipo de desarrollo

---

**Última actualización**: 17 de Enero de 2025
**Versión**: 2.0
**Estado**: 📋 Listo para testing
