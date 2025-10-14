# 🤖 Agente IA Conversacional - Asistente de Estrategias de IA

Un agente de inteligencia artificial conversacional que permite comunicación natural mediante voz, potenciado por **OpenAI GPT-4o-mini** con function calling. Especializado en proporcionar información sobre estrategias de adopción de inteligencia artificial en empresas, consultando una base de conocimiento en Coda y generando respuestas inteligentes y contextuales.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso](#-uso)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [📊 Sistema de Trazas y Análisis](#-sistema-de-trazas-y-análisis)
- [✅ Evaluaciones Automáticas](#-evaluaciones-automáticas)
- [📋 Checklist Responses API](#-checklist-responses-api)
- [🔌 Conectores Priorizados](#-conectores-priorizados)
- [Lecciones Aprendidas](#-lecciones-aprendidas)
- [Estructura de Archivos](#-estructura-de-archivos)
- [API y Servicios](#-api-y-servicios)
- [Contribuir](#-contribuir)

## ✨ Características

### 🎤 **Reconocimiento de Voz en Tiempo Real**
- Escucha continua del micrófono
- Reconocimiento automático de español
- Interrupción inteligente del agente cuando el usuario habla
- Manejo de errores y permisos de micrófono

### 🗣️ **Síntesis de Voz Natural**
- Respuestas habladas en español
- Interrupción automática cuando el usuario habla
- Indicadores visuales del estado de habla
- Velocidad y entonación optimizadas

### 🧠 **IA Potenciada por OpenAI GPT-4o-mini**
- **Comprensión inteligente** del lenguaje natural usando GPT-4o-mini
- **Function calling automático**: OpenAI decide cuándo buscar en Coda
- **Síntesis y resumen** automático de información compleja
- **Memoria conversacional**: Mantiene contexto de últimos 10 mensajes
- **Respuestas adaptativas**: Genera respuestas naturales y contextuales

### 📚 **Base de Conocimiento en Coda**
- Integración con Coda API para acceder información estructurada
- Búsqueda inteligente de estrategias de IA, capacitación y automatización
- Contenido sobre pilares de implementación, KPIs y casos de uso
- OpenAI reformula queries para maximizar relevancia

### 💬 **Conversación Natural**
- Respuestas contextuales y variadas
- Reconocimiento de saludos, preguntas y despedidas
- Sistema de respuestas aleatorias para evitar repetición
- Personalidad conversacional amigable

## 🛠️ Tecnologías Utilizadas

### **Backend**
- **Node.js** - Runtime de JavaScript
- **TypeScript** - Tipado estático y desarrollo escalable
- **Express.js** - Framework web minimalista
- **WebSocket (ws)** - Comunicación bidireccional en tiempo real
- **node-fetch** - Cliente HTTP para llamadas a APIs
- **dotenv** - Gestión de variables de entorno
- **cross-env** - Variables de entorno multiplataforma

### **Frontend**
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con gradientes y animaciones
- **JavaScript ES6+** - Funcionalidades interactivas
- **Web Speech API** - Reconocimiento y síntesis de voz
- **WebSocket API** - Comunicación en tiempo real

### **Herramientas de Desarrollo**
- **tsx** - Ejecutor de TypeScript para desarrollo
- **tsc** - Compilador de TypeScript
- **npm** - Gestor de paquetes

## 🏗️ Arquitectura del Proyecto

```
┌─────────────────┐    WebSocket    ┌─────────────────┐
│   Cliente Web   │◄──────────────►│   Servidor      │
│                 │                 │                 │
│ • HTML/CSS/JS   │                 │ • Express.js    │
│ • Speech API    │                 │ • WebSocket     │
│ • UI/UX         │                 │ • Agent Logic   │
└─────────────────┘                 └─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ OpenAI Service  │
                                    │                 │
                                    │ • GPT-4o-mini   │
                                    │ • Function Call │
                                    │ • Chat Memory   │
                                    └────────┬────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │   Coda API      │
                                    │                 │
                                    │ • Tabla Datos   │
                                    │ • Estrategias IA│
                                    └─────────────────┘
```

### **Flujo de Comunicación**

1. **Usuario habla** → Reconocimiento de voz captura audio
2. **Texto transcrito** → Enviado via WebSocket al servidor
3. **Agente procesa** → Analiza intención y genera respuesta
4. **Respuesta enviada** → Cliente recibe y sintetiza voz
5. **Usuario interrumpe** → Sistema cancela síntesis y procesa nueva entrada

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js (v16 o superior)
- Navegador web con soporte para Web Speech API
- Micrófono y altavoces

### **Pasos de Instalación**

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd agente-ia
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Credenciales**
```bash
# Crear archivo .env con tus credenciales
cat > .env << EOF
# OpenAI (REQUERIDO)
OPENAI_API_KEY=tu_openai_api_key_aqui
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=1000

# Coda (REQUERIDO)
CODA_API_KEY=tu_coda_api_key_aqui
CODA_DOC_ID=tu_doc_id_aqui
CODA_TABLE_ID=tu_table_id_aqui
EOF

# Obtén tu API key de OpenAI en: https://platform.openai.com/api-keys
# Obtén tu API key de Coda en: https://coda.io/account
```

4. **Ejecutar el servidor**
```bash
npm start
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

### **Scripts Disponibles**

```json
{
  "dev": "tsx server/main.ts",     // Modo desarrollo
  "build": "tsc",                  // Compilar TypeScript
  "start": "cross-env OPENWEATHER_API_KEY=xxx tsx server/main.ts"  // Producción
}
```

## 🎮 Uso

### **Interfaz Principal**

1. **Conexión**: El estado de conexión se muestra con indicador visual
2. **Iniciar Escucha**: Botón "🎤 Empezar a Escuchar" para activar micrófono
3. **Conversación**: Área de chat que muestra mensajes del usuario y agente
4. **Indicadores**: Estado de escucha y habla del agente

### **Comandos de Voz**

#### **Consultas sobre Estrategias de IA**
- "¿Qué es el Pilar 1 de estrategias de IA?"
- "¿Cómo implementar IA en mi empresa?"
- "Cuéntame sobre IA para Todos"
- "¿Qué es la automatización de alto impacto?"
- "¿Cómo capacitar a mi equipo en IA?"

#### **Conversación General**
- "Hola" - Saludo inicial
- "¿Quién eres?" - Información sobre el agente
- "Gracias" - Agradecimiento
- "Adiós" - Despedida

### **Funcionalidades Especiales**

- **Interrupción**: Habla mientras el agente responde para interrumpirlo
- **Escucha Continua**: El micrófono permanece activo hasta que lo detengas
- **Indicadores Visuales**: Estado de conexión, escucha y habla

## 🔧 Funcionalidades Implementadas

### **1. Sistema de Reconocimiento de Voz**
```javascript
// Configuración del reconocimiento
recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "es-ES";
recognition.continuous = true;
recognition.interimResults = false;
```

### **2. Interrupción Inteligente**
```javascript
// Detección de interrupción
if (isAgentSpeaking) {
  interruptAgentSpeech();
}
```

### **3. Agente Conversacional**
```typescript
// Procesamiento de mensajes
async handleMessage(input: string): Promise<string> {
  if (this.isGreeting(message)) {
    return this.getGreetingResponse(message);
  }
  // ... más lógica
}
```

### **4. Integración con Coda API**
```typescript
// Consulta a la tabla de Coda para obtener información
const rows = await getTableRows(limit);
const context = await searchInCoda(userQuery);
```

---

## 📊 Sistema de Trazas y Análisis

Sistema completo de logging, trazas y análisis automático de sesiones conversacionales.

### ¿Qué Captura?
- 📝 Input/Output de cada mensaje
- 🎯 Detección de intenciones con confidence
- 🛠️ Llamadas a herramientas (weather API)
- 🔴 Errores con contexto completo
- ⚡ Latencia de respuestas

### Análisis Automático
El sistema analiza sesiones y detecta automáticamente:
- Latencia alta (>2s)
- Errores y su contexto
- Intenciones no reconocidas
- Calidad de respuestas
- Herramientas lentas

### Cómo Usar

```bash
# Generar sesiones de prueba y analizar
npm run tracing:demo

# Ver sesiones capturadas
ls traces/*.json

# Ver reporte de análisis
cat traces/analysis-report.md
```

### Hallazgos Encontrados

**3 sesiones analizadas** → **6 hallazgos accionables** identificados:

1. 🔴 **Errores en API clima** - 100% consultas fallidas
2. 🟡 **Clasificación intenciones** - 40-60% precision
3. 🟢 **Monitoreo continuo** - Sistema preventivo

📖 **Documentación completa**: [traces/README.md](./traces/README.md)
📋 **Tareas accionables**: [TAREAS_ACCIONABLES.md](./TAREAS_ACCIONABLES.md)

---

## ✅ Evaluaciones Automáticas

Sistema de evaluación automática (Evals) para medir la calidad del agente.

### Métricas Evaluadas

| Métrica | Puntuación Actual | Objetivo |
|---------|-------------------|----------|
| 🎯 **Exactitud** | 86.0% | >80% ✅ |
| 🎭 **Tono** | 80.0% | >80% ✅ |
| ⚡ **Latencia** | 100.0% | >90% ✅ |
| **📊 General** | **88.1%** | **>75%** ✅ |

### Ejecución

```bash
# Ejecutar todas las evaluaciones
npm run evals

# Evaluaciones específicas
npm run evals:accuracy   # Exactitud de respuestas
npm run evals:tone       # Tono conversacional
npm run evals:latency    # Tiempo de respuesta
```

### Integración CI/CD

Las evaluaciones se ejecutan automáticamente en:
- ✅ Pull Requests a `main` o `develop`
- ✅ Pushes a branches principales
- 💬 Comentarios automáticos en PRs con resultados

**Configuración**: Agregar secret `OPENWEATHER_API_KEY` en GitHub Settings

📖 **Documentación completa**: [evals/GUIA_EVALUACIONES.md](./evals/GUIA_EVALUACIONES.md)

---

## 📋 Checklist Responses API

Evaluación sistemática de 42 features de Responses API.

### Estado General

| Categoría | Implementadas | En Progreso | No Implementadas |
|-----------|---------------|-------------|------------------|
| **Herramientas** | 1 ✅ | 1 🟡 | 3 ❌ |
| **Salidas Estructuradas** | 1 ✅ | 2 🟡 | 5 ❌ |
| **Contexto** | 1 ✅ | 1 🟡 | 6 ❌ |
| **Analytics** | 3 ✅ | 2 🟡 | 4 ❌ |
| **Seguridad** | 1 ✅ | 0 🟡 | 5 ❌ |

### Top 5 Prioridades

1. 🔴 **Normalización de ciudades** (2h) - Implementar
2. 🔴 **Context window** (3h) - Implementar
3. 🔴 **Follow-up questions** (4h) - Implementar
4. 🟡 **Structured intents** (2h) - Implementar
5. 🟡 **Input validation** (1h) - Implementar

### Decisiones Clave

1. ✅ **Implementar Context Window** - Para mantener contexto conversacional
2. 🚫 **NO Streaming** - Respuestas <100ms, sin UI real-time
3. ✅ **Agregar searchCities tool** - Mejorar UX con sugerencias
4. ✅ **Structured Intent Outputs** - Mejor analítica
5. 🚫 **NO Multi-idioma** - Solo español por ahora

📖 **Checklist completo**: [CHECKLIST_RESPONSES_API.md](./CHECKLIST_RESPONSES_API.md)
📋 **Vista rápida**: [CHECKLIST_RESPONSES_API_RESUMEN.md](./CHECKLIST_RESPONSES_API_RESUMEN.md)
📚 **Guía de revisión**: [docs/GUIA_REVISION_COMPLETA.md](./docs/GUIA_REVISION_COMPLETA.md)

---

## 🔌 Conectores Priorizados

Análisis de 5 conectores externos para extender las capacidades del agente.

### Conectores Evaluados

| Conector | Prioridad | Riesgo | Esfuerzo | ROI | Decisión |
|----------|-----------|--------|----------|-----|----------|
| **Coda** | 🔴 Alta | 🟢 Bajo | 8h | 🟢 1,150% | ✅ Sprint 1 |
| **Google Calendar** | 🔴 Alta | 🟡 Medio | 12h | 🟢 1,233% | ✅ Sprint 2 |
| **Slack** | 🟡 Media | 🟢 Bajo | 6h | 🟡 Medio | 🟡 Evaluar |
| **Notion** | 🟡 Media | 🟡 Medio | 10h | 🟡 Medio | 🟡 Evaluar |
| **Airtable** | 🔵 Baja | 🟡 Medio | 10h | 🔵 Bajo | 🚫 Backlog |

### Recomendación Inicial

#### 1. Coda (8 horas) - IMPLEMENTAR Sprint Actual
**Casos de uso**:
- 📚 Base de conocimiento de cursos
- ❓ FAQ dinámico
- 📝 Registro automático de leads

**Por qué primero**: Bajo riesgo, alto impacto, API sencilla, free tier generoso

#### 2. Google Calendar (12 horas) - IMPLEMENTAR Siguiente Sprint
**Casos de uso**:
- 📅 Agendar demos personalizadas automáticamente
- 🕐 Consultar disponibilidad de asesores
- 📧 Envío automático de invitaciones

**Por qué segundo**: +30% conversión a demos, alto ROI (1,233%)

### Impacto Esperado

**Con Coda**:
- ⚡ -80% tiempo respuestas FAQ
- 📝 100% leads capturados automáticamente

**Con Google Calendar**:
- 📅 +30% conversión a demos
- ⏰ -90% tiempo agendamiento manual

📖 **Análisis completo**: [CONECTORES_PRIORIZADOS.md](./CONECTORES_PRIORIZADOS.md)
📋 **Vista rápida**: [CONECTORES_RESUMEN.md](./CONECTORES_RESUMEN.md)

---

## 📚 Lecciones Aprendidas

### **Desarrollo con TypeScript**
- **Tipado estático**: Mejora la calidad del código y reduce errores
- **Interfaces**: Definición clara de estructuras de datos
- **Módulos ES**: Uso de `import/export` en lugar de `require/module.exports`

### **WebSockets en Tiempo Real**
- **Comunicación bidireccional**: Cliente y servidor pueden enviar datos simultáneamente
- **Conexión persistente**: Mantiene la conexión activa para comunicación fluida
- **Manejo de eventos**: Gestión de conexión, desconexión y errores

### **APIs de Voz del Navegador**
- **Web Speech API**: Reconocimiento y síntesis de voz nativa
- **Permisos del navegador**: Manejo de autorizaciones de micrófono
- **Compatibilidad**: Diferentes implementaciones entre navegadores

### **Gestión de Estado**
- **Estado de aplicación**: Seguimiento de conexión, escucha y habla
- **Sincronización**: Coordinación entre reconocimiento y síntesis de voz
- **Interrupciones**: Manejo elegante de cambios de contexto

### **Diseño de UX/UI**
- **Feedback visual**: Indicadores claros del estado de la aplicación
- **Responsive design**: Adaptación a diferentes tamaños de pantalla
- **Animaciones**: Mejora la experiencia de usuario

### **Integración de APIs Externas**
- **Manejo de errores**: Gestión robusta de fallos de API
- **Variables de entorno**: Seguridad en el manejo de claves API
- **Tipado de respuestas**: Estructura clara de datos de API

## 📁 Estructura de Archivos

```
agente-ia/
├── server/                    # Código del servidor
│   ├── main.ts               # Punto de entrada del servidor
│   ├── agent.ts              # Lógica del agente conversacional
│   └── tools/                # Herramientas del agente
│       └── coda.ts           # Integración con Coda API
├── client/                   # Código del cliente
│   └── index.html           # Interfaz web completa
├── package.json             # Configuración del proyecto y dependencias
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Esta documentación
```

### **Descripción de Archivos**

#### **`server/main.ts`**
- Configuración del servidor Express
- Manejo de WebSockets
- Servicio de archivos estáticos
- Gestión de conexiones de clientes

#### **`server/agent.ts`**
- Lógica conversacional del agente
- Procesamiento de intenciones
- Sistema de respuestas contextuales
- Integración con herramientas externas

#### **`server/tools/coda.ts`**
- Cliente para Coda API
- Búsqueda inteligente de contenido
- Extracción de fragmentos relevantes
- Obtención de filas y columnas de tablas

#### **`client/index.html`**
- Interfaz de usuario completa
- Configuración de Web Speech API
- Manejo de WebSockets
- Estilos CSS integrados

## 🌐 API y Servicios

### **Coda API**
- **Endpoint**: `https://coda.io/apis/v1/docs/{docId}/tables/{tableId}/rows`
- **Autenticación**: Bearer token via API key
- **Funcionalidad**: Consulta de información estructurada, búsqueda por keywords
- **Respuesta**: Filas de tabla con valores de columnas

### **Web Speech API**
- **SpeechRecognition**: Conversión de voz a texto
- **SpeechSynthesis**: Conversión de texto a voz
- **Configuración**: Idioma español, escucha continua

### **WebSocket API**
- **Conexión**: `ws://localhost:3000`
- **Mensajes**: JSON con tipo y contenido
- **Eventos**: Conexión, mensaje, desconexión, error

## 🧪 Sistema de Evaluaciones Automáticas

### **Ejecutar Evaluaciones**
```bash
# Todas las evaluaciones
npm run evals

# Solo exactitud
npm run evals:accuracy

# Solo tono
npm run evals:tone

# Solo latencia
npm run evals:latency
```

### **Métricas Evaluadas**
- **📊 Exactitud (Accuracy)**: Respuestas correctas a consultas meteorológicas
- **🎭 Tono Conversacional (Tone)**: Amabilidad y naturalidad de las respuestas
- **⚡ Latencia (Latency)**: Tiempo de respuesta y rendimiento

### **Reportes**
Los reportes se generan automáticamente en:
- `evals/reports/latest-report.json` - Último reporte
- `evals/reports/report-YYYY-MM-DD.json` - Reportes por fecha

### **CI/CD Pipeline**
- Las evaluaciones se ejecutan automáticamente en cada Pull Request
- Se requieren al menos 75% de puntuación para hacer merge
- Los resultados se comentan automáticamente en el PR

## 🚀 Futuras Mejoras

### **Funcionalidades Adicionales**
- [ ] Soporte para múltiples idiomas
- [ ] Historial de conversaciones
- [ ] Configuración de voz personalizada
- [ ] Integración con más APIs (noticias, calendario, etc.)
- [ ] Modo offline con respuestas predefinidas

### **Mejoras Técnicas**
- [ ] Tests unitarios y de integración
- [ ] Dockerización del proyecto
- [ ] Logging y monitoreo
- [ ] Optimización de rendimiento
- [ ] Soporte para múltiples usuarios simultáneos

### **Mejoras de UX**
- [ ] Temas visuales personalizables
- [ ] Configuración de accesibilidad
- [ ] Soporte para comandos por voz
- [ ] Integración con asistentes existentes

## 🤝 Contribuir

### **Cómo Contribuir**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### **Estándares de Código**

- Usar TypeScript para todo el código del servidor
- Seguir convenciones de naming en inglés
- Documentar funciones complejas
- Mantener tests actualizados

### **Reportar Issues**

- Usar el template de issues
- Incluir pasos para reproducir
- Especificar versión del navegador y sistema operativo
- Agregar logs de consola si es relevante

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Autores

- **Desarrollador Principal** - [Tu Nombre]
- **Contribuidores** - Ver lista de contribuidores

## 🙏 Agradecimientos

- OpenWeatherMap por la API meteorológica gratuita
- MDN Web Docs por la documentación de Web APIs
- Comunidad de TypeScript por las herramientas de desarrollo
- Todos los contribuidores que han mejorado este proyecto

---

**¡Gracias por usar el Agente IA Conversacional!** 🤖✨

Para soporte técnico o preguntas, abre un issue en el repositorio.
