# 🎯 Tareas Accionables - Basadas en Análisis de Trazas

**Fecha de Análisis**: 2025-10-08
**Sesiones Analizadas**: 3 (session-clima-multiple, session-con-errores, session-exploracion)
**Hallazgos Accionables Encontrados**: 6

---

## 📋 Resumen Ejecutivo

Se analizaron 3 sesiones conversacionales y se identificaron **2 problemas principales recurrentes**:

1. **🔴 CRÍTICO - Errores en API de Clima**: 5 de 5 intentos de consulta climática fallaron
2. **🟡 IMPORTANTE - Clasificación de Intenciones**: 40-60% de mensajes caen en categoría genérica

---

## 🔴 Tarea 1: Mejorar Manejo de Errores en API de Clima

### Problema Identificado
- **Severidad**: Alta 🔴
- **Categoría**: Error Handling
- **Frecuencia**: 5 errores en 3 sesiones
- **Impacto**: 100% de consultas climáticas fallidas

### Evidencia
```
Sesión 1: 2 errores (Madrid, París)
Sesión 2: 1 error (Ciudad Imaginaria XYZ)
Sesión 3: 2 errores (New York, Miami)
```

### Causa Raíz
- La API de OpenWeather requiere nombres de ciudades en inglés sin acentos
- No hay validación previa de nombres de ciudades
- No hay normalización de caracteres especiales
- No hay manejo de ciudades no encontradas

### Solución Propuesta

#### Implementación Inmediata (1-2 horas)
```typescript
// 1. Normalizar nombres de ciudades
function normalizeCityName(city: string): string {
  const cityMap = {
    'madrid': 'Madrid',
    'parís': 'Paris',
    'barcelona': 'Barcelona',
    'londres': 'London',
    'nueva york': 'New York',
    'new york': 'New York'
  };

  const normalized = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return cityMap[normalized] || city;
}

// 2. Validar antes de llamar API
async function getWeatherSafe(city: string): Promise<string> {
  const normalizedCity = normalizeCityName(city);

  try {
    return await getWeather(normalizedCity);
  } catch (error) {
    return `No encontré información sobre "${city}". ¿Puedes intentar con otra ciudad? Por ejemplo: Madrid, Barcelona, Paris, London.`;
  }
}
```

#### Mejora a Mediano Plazo (1 semana)
- Implementar caché de ciudades válidas
- Sugerir ciudades similares cuando hay error
- Agregar fuzzy matching para nombres de ciudades

### Criterio de Aceptación
- ✅ Al menos 80% de consultas climáticas exitosas
- ✅ Mensajes de error informativos con sugerencias
- ✅ Normalización automática de acentos

### Prioridad
**🔴 ALTA** - Afecta funcionalidad core del agente

---

## 🟡 Tarea 2: Mejorar Clasificación de Intenciones

### Problema Identificado
- **Severidad**: Media 🟡
- **Categoría**: Usability / NLU
- **Frecuencia**: 40-67% de mensajes mal clasificados
- **Impacto**: Respuestas genéricas en lugar de específicas

### Evidencia
```
Sesión 1: 4/7 mensajes → "conversación general" (57%)
Sesión 2: 4/6 mensajes → "conversación general" (67%)
Sesión 3: 6/9 mensajes → "conversación general" (67%)
```

### Ejemplos de Mensajes Mal Clasificados
```
❌ "Y en Barcelona?" → clasificado como conversación (debería ser weather_query)
❌ "¿Qué puedes hacer?" → clasificado como conversación (debería ser capabilities)
❌ "¿Puedes ayudarme con el clima?" → clasificado como conversación (debería ser weather_intent)
```

### Causa Raíz
- Patrones regex muy específicos para clima
- No detecta preguntas contextuales ("Y en Barcelona?")
- No reconoce intención de capacidades
- No hay clasificador de intenciones dedicado

### Solución Propuesta

#### Implementación Inmediata (2-3 horas)
```typescript
// Mejorar extracción de queries de clima
private extractWeatherQuery(message: string): string | null {
  // Patrón 1: Referencias contextuales
  if (/^y\s+(en|de)\s+([a-záéíóúñ\s]+)/i.test(message)) {
    const match = message.match(/^y\s+(en|de)\s+([a-záéíóúñ\s]+)/i);
    return match ? match[2].trim() : null;
  }

  // Patrón 2: Solo nombre de ciudad después de contexto
  if (this.lastIntent === 'weather_query' &&
      /^[a-záéíóúñ\s]+\?*$/i.test(message) &&
      message.split(' ').length <= 3) {
    return message.replace('?', '').trim();
  }

  // ... patrones existentes
}

// Agregar clasificador de capacidades
private isCapabilityQuestion(message: string): boolean {
  const patterns = [
    '¿qué puedes hacer',
    'qué sabes hacer',
    'cuáles son tus capacidades',
    '¿en qué puedes ayudarme',
    'qué funciones tienes'
  ];
  return patterns.some(p => message.includes(p));
}
```

#### Mejora a Mediano Plazo (2 semanas)
- Implementar clasificador de intenciones con ML
- Mantener contexto conversacional
- Entrenar con más ejemplos de preguntas

### Criterio de Aceptación
- ✅ <30% de mensajes clasificados como "conversación general"
- ✅ Detectar correctamente referencias contextuales
- ✅ Reconocer preguntas sobre capacidades

### Prioridad
**🟡 MEDIA** - Afecta experiencia de usuario pero no bloquea funcionalidad

---

## 🟢 Tarea 3: Implementar Monitoreo Continuo de Trazas

### Problema Identificado
- **Severidad**: Baja 🟢
- **Categoría**: Observability
- **Frecuencia**: N/A (preventivo)
- **Impacto**: Permite detectar problemas temprano

### Solución Propuesta

#### Dashboard de Métricas en Tiempo Real
```bash
# Crear endpoint de métricas
GET /api/metrics/session-summary
{
  "sessionsLast24h": 45,
  "averageLatency": 125,
  "errorRate": 0.23,
  "topIntents": ["weather_query", "greeting", "conversation"],
  "topErrors": ["API_WEATHER_FAILED", "CITY_NOT_FOUND"]
}
```

#### Alertas Automáticas
- Error rate > 15% → Notificación
- Latencia promedio > 2s → Notificación
- Sesiones fallidas > 10% → Notificación

### Criterio de Aceptación
- ✅ Endpoint de métricas funcionando
- ✅ Dashboard básico (puede ser CLI)
- ✅ Alertas configuradas

### Prioridad
**🟢 BAJA** - Nice to have, mejora operaciones

---

## 📊 Plan de Implementación

### Sprint 1 (Esta Semana)
- [ ] **Día 1-2**: Implementar Tarea 1 (Manejo de errores API clima)
- [ ] **Día 3-4**: Implementar Tarea 2 (Mejorar clasificación intenciones)
- [ ] **Día 5**: Testing y validación con nuevas sesiones

### Sprint 2 (Próxima Semana)
- [ ] **Día 1-3**: Implementar Tarea 3 (Monitoreo continuo)
- [ ] **Día 4-5**: Documentación y mejoras finales

---

## ✅ Validación de Resultados

### Cómo Validar las Mejoras

```bash
# 1. Generar nuevas sesiones después de implementar cambios
npm run tracing:generate

# 2. Analizar resultados
npm run tracing:demo

# 3. Comparar métricas
# Antes:
# - Error rate: 100% en consultas clima
# - Intent accuracy: ~40%

# Después (objetivo):
# - Error rate: <20% en consultas clima
# - Intent accuracy: >70%
```

---

## 📝 Notas Adicionales

### Recursos Necesarios
- **Tiempo estimado total**: 8-12 horas desarrollo
- **Herramientas**: TypeScript, OpenWeather API, sistema de trazas existente
- **Testing**: Casos de prueba actuales + 5 nuevos escenarios

### Riesgos
- ⚠️ Cambios en lógica de intenciones pueden afectar comportamiento existente
- ⚠️ Normalización de ciudades puede no cubrir todos los casos
- ✅ Mitigación: Testing exhaustivo antes de deploy

### Enlaces Útiles
- [Sistema de Trazas](./traces/)
- [Reporte de Análisis](./traces/analysis-report.md)
- [Documentación API OpenWeather](https://openweathermap.org/current)
