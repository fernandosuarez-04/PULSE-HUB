# 🧪 Sistema de Evaluaciones Automáticas (Evals)

Este directorio contiene las evaluaciones automáticas para medir la calidad del agente conversacional.

> 📖 **[Ver Guía Completa](./GUIA_EVALUACIONES.md)** - Instrucciones detalladas sobre cómo usar el sistema de evaluaciones, configurar GitHub Actions, y entender los resultados.

## 📊 Métricas Evaluadas

### 1. **Exactitud (Accuracy)**
- Respuestas correctas a consultas meteorológicas
- Reconocimiento preciso de intenciones
- Extracción correcta de entidades (ciudades)

### 2. **Tono Conversacional (Tone)**
- Respuestas amigables y naturales
- Consistencia en el estilo conversacional
- Manejo apropiado de diferentes tipos de mensajes

### 3. **Latencia (Latency)**
- Tiempo de respuesta del agente
- Tiempo de procesamiento de consultas
- Rendimiento general del sistema

## 🏗️ Estructura

```
evals/
├── README.md              # Esta documentación
├── evaluator.ts           # Motor principal de evaluaciones
├── test-cases/           # Casos de prueba
│   ├── weather-tests.json
│   ├── conversation-tests.json
│   └── performance-tests.json
├── metrics/              # Métricas y reportes
│   ├── accuracy.ts
│   ├── tone.ts
│   └── latency.ts
└── reports/              # Reportes generados
    └── latest-report.json
```

## 🚀 Uso Rápido

```bash
# Ejecutar todas las evaluaciones (requiere API key)
npm run evals

# Ejecutar evaluaciones específicas
npm run evals:accuracy  # Requiere OPENWEATHER_API_KEY
npm run evals:tone      # No requiere API key
npm run evals:latency   # No requiere API key
```

## 🔄 GitHub Actions

Las evaluaciones se ejecutan automáticamente en:
- ✅ Pull Requests a `main` o `develop`
- ✅ Pushes a `main` o `develop`
- 💬 Comentarios automáticos en PRs con resultados
- ⚠️ Alertas si puntuación < 75%

**Configuración requerida:** Secret `OPENWEATHER_API_KEY` en GitHub Settings

## 📊 Resultados Actuales

| Métrica | Puntuación | Estado |
|---------|-----------|--------|
| 🎯 Exactitud | 86.0% | 🟢 Bueno |
| 🎭 Tono | 80.0% | 🟢 Bueno |
| ⚡ Latencia | 100.0% | 🟢 Excelente |
| **📊 General** | **88.1%** | **🟢 Listo** |

## 📖 Documentación

- **[Guía Completa de Evaluaciones](./GUIA_EVALUACIONES.md)** - Instrucciones detalladas
- **[Config del Workflow](./../.github/workflows/evals.yml)** - Configuración de CI/CD
- **[Casos de Prueba](./test-cases/)** - Tests utilizados
