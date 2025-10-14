# 📊 Sistema de Trazas y Visualización

Sistema completo de logging, trazas y análisis de sesiones conversacionales para el agente de IA.

---

## 🎯 ¿Qué es esto?

Un sistema que **captura**, **almacena** y **analiza** todas las interacciones del agente con usuarios para:

- 📝 **Trazabilidad**: Ver exactamente qué pasó en cada conversación
- 🔍 **Debugging**: Identificar problemas y errores rápidamente
- 📊 **Analytics**: Entender patrones de uso y comportamiento
- 🎯 **Mejora Continua**: Detectar hallazgos accionables automáticamente

---

## 🚀 Inicio Rápido

### Generar y Analizar Sesiones de Prueba

```bash
# Ejecutar demo completo (genera 3 sesiones + análisis + reporte)
npm run tracing:demo

# Solo generar sesiones de prueba
npm run tracing:generate
```

### Ver Resultados

```bash
# Archivos generados:
traces/
├── session-clima-multiple.json      # Sesión 1: Consultas de clima
├── session-con-errores.json         # Sesión 2: Con errores
├── session-exploracion.json         # Sesión 3: Usuario explorando
└── analysis-report.md               # Reporte de análisis completo
```

---

## 📋 ¿Qué se Captura?

Cada sesión registra:

### 1. **Eventos de Input**
```json
{
  "timestamp": "2025-10-08T18:22:16.070Z",
  "type": "input",
  "data": {
    "message": "¿Qué clima hace en Madrid?"
  }
}
```

### 2. **Eventos de Output**
```json
{
  "timestamp": "2025-10-08T18:22:16.185Z",
  "type": "output",
  "data": {
    "message": "Lo siento, no pude obtener...",
    "latency": 115
  }
}
```

### 3. **Detección de Intenciones**
```json
{
  "timestamp": "2025-10-08T18:22:16.071Z",
  "type": "intent",
  "data": {
    "intent": "weather_query",
    "confidence": 1.0
  }
}
```

### 4. **Llamadas a Herramientas**
```json
{
  "timestamp": "2025-10-08T18:22:16.072Z",
  "type": "tool_call",
  "data": {
    "toolName": "getWeather",
    "params": { "city": "Madrid" },
    "result": "...",
    "duration": 113
  }
}
```

### 5. **Errores**
```json
{
  "timestamp": "2025-10-08T18:22:16.185Z",
  "type": "error",
  "data": {
    "error": "City not found",
    "context": { "city": "Madrid" }
  }
}
```

---

## 📊 Análisis Automático

El sistema analiza automáticamente **5 aspectos**:

### 1. ⚡ Análisis de Latencia
- Detecta respuestas lentas (>2s)
- Calcula latencia promedio
- Identifica picos de latencia

### 2. 🔴 Análisis de Errores
- Cuenta errores por sesión
- Clasifica tipos de errores
- Provee contexto de cada error

### 3. 🎯 Análisis de Intenciones
- Detecta intenciones no reconocidas
- Calcula precisión de clasificación
- Identifica patrones de confusión

### 4. ✍️ Análisis de Calidad de Respuestas
- Detecta respuestas muy cortas
- Verifica coherencia
- Evalúa utilidad

### 5. 🛠️ Análisis de Uso de Herramientas
- Mide tiempos de ejecución
- Detecta herramientas lentas
- Identifica cuellos de botella

---

## 🔍 Hallazgos Accionables

El sistema identifica automáticamente **hallazgos accionables** con:

- **Severidad**: Alta 🔴, Media 🟡, Baja 🟢
- **Categoría**: performance, error, usability, quality
- **Evidencia**: Datos que respaldan el hallazgo
- **Recomendación**: Qué hacer para mejorar

### Ejemplo de Hallazgo
```
🔴 2 error(es) durante la sesión
Severidad: high
Categoría: error
Descripción: Se detectaron errores que afectaron la experiencia del usuario
Recomendación: Implementar manejo de errores más robusto, validar ciudades antes de llamar API
Accionable: Sí ✅
```

---

## 📁 Estructura de Archivos

```
traces/
├── README.md                         # Esta documentación
├── session-{id}.json                 # Sesiones individuales
└── analysis-report.md                # Reporte de análisis

server/tracing/
├── tracer.ts                         # Motor de trazas
├── session-generator.ts              # Generador de sesiones de prueba
└── session-analyzer.ts               # Analizador de hallazgos

tracing-demo.ts                       # Script de demo completo
```

---

## 🧪 Casos de Uso

### 1. Debugging de Producción
```bash
# Usuario reporta problema
# → Buscar su session ID en logs
# → Leer archivo traces/session-{id}.json
# → Ver exactamente qué pasó
```

### 2. Análisis de Rendimiento
```bash
# Ejecutar demo
npm run tracing:demo

# Revisar métricas en reporte
cat traces/analysis-report.md | grep "Latencia promedio"
```

### 3. Mejora Continua
```bash
# Generar sesiones semanalmente
npm run tracing:generate

# Analizar tendencias
# → ¿Están bajando los errores?
# → ¿Está mejorando la latencia?
# → ¿Se reconocen mejor las intenciones?
```

---

## 📈 Métricas Clave

### Por Sesión
- **Total Mensajes**: Interacciones totales
- **Latencia Promedio**: Tiempo de respuesta
- **Total Errores**: Errores capturados
- **Intenciones**: Intenciones detectadas
- **Herramientas Usadas**: Funciones llamadas

### Consolidadas (Multi-sesión)
- **Error Rate**: % de mensajes con errores
- **Intent Accuracy**: % de intenciones correctas
- **Average Latency**: Latencia promedio global
- **Tool Success Rate**: % de herramientas exitosas

---

## 🎯 Próximos Pasos

1. **Revisa el reporte**: `cat traces/analysis-report.md`
2. **Examina sesiones JSON**: Abre archivos en tu editor
3. **Implementa mejoras**: Ver [TAREAS_ACCIONABLES.md](../TAREAS_ACCIONABLES.md)
4. **Re-analiza**: Ejecuta `npm run tracing:demo` después de cambios

---

## 🤝 Integración con Producción

### Habilitar Trazas en Producción

```typescript
// server/main.ts
import { globalTracer } from './tracing/tracer.js';

// Inicializar al arrancar
await globalTracer.initialize();

// Crear sesión por usuario
app.post('/api/chat/start', (req, res) => {
  const sessionId = globalTracer.startSession(req.user.id);
  res.json({ sessionId });
});

// Terminar sesión
app.post('/api/chat/end', async (req, res) => {
  await globalTracer.endSession();
  res.json({ success: true });
});
```

### Consultar Sesiones

```typescript
// Listar todas las sesiones
const sessions = await globalTracer.listSessions();

// Cargar sesión específica
const session = await globalTracer.loadSession('session-123');

// Ver resumen
const summary = globalTracer.getSessionSummary('session-123');
```

---

## 📝 Notas Importantes

### Privacidad
- ⚠️ Las trazas contienen mensajes completos de usuarios
- 🔒 No almacenar información sensible (contraseñas, tarjetas, etc.)
- 🗑️ Implementar política de retención (ej: 30 días)

### Rendimiento
- ✅ Overhead mínimo (~1-2ms por mensaje)
- ✅ Escritura asíncrona (no bloquea respuestas)
- ⚠️ Archivos JSON pueden crecer (implementar rotación)

### Escalabilidad
- Para producción: considerar usar base de datos en lugar de JSON
- Implementar indexación por fecha/usuario
- Agregar compresión para sesiones antiguas

---

## 🆘 Troubleshooting

### No se generan archivos JSON
```bash
# Verificar permisos de escritura
ls -la traces/

# Verificar que el directorio existe
mkdir -p traces
```

### Error al analizar sesión
```bash
# Verificar formato JSON
cat traces/session-{id}.json | jq .

# Re-generar sesión si está corrupta
npm run tracing:generate
```

---

## 📚 Referencias

- [Documentación del Tracer](../server/tracing/tracer.ts)
- [Generador de Sesiones](../server/tracing/session-generator.ts)
- [Analizador](../server/tracing/session-analyzer.ts)
- [Tareas Accionables](../TAREAS_ACCIONABLES.md)
