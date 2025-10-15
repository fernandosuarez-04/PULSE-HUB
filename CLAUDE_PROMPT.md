# 🤖 Prompt para Claude - Análisis e Implementación de Voz en PULSE-HUB

## 📋 Contexto del Proyecto

Tu tarea es **analizar el proyecto de voz** ubicado en `agente-ia-conversacional-main/` e **implementarlo en PULSE-HUB**, una plataforma B2B desarrollada para **Ecos de Liderazgo** - un ecosistema humano-tecnológico para la adopción de IA ética y efectiva en empresas.

**IMPORTANTE**: El asistente de IA se implementará posteriormente con un MCP de OpenAI. Tu rol es analizar y adaptar las funcionalidades de voz existentes.

### 🎯 Objetivo de la Tarea
Analizar las funcionalidades de voz del proyecto `agente-ia-conversacional-main/` e implementarlas en PULSE-HUB, respetando la arquitectura existente y adaptándolas a los tres pilares de la plataforma:

1. **🎓 Capacitación IA** - Formación escalonada y especializada
2. **📈 Adopción Diaria** - Rituales y herramientas para uso cotidiano  
3. **⚡ Automatización de Alto Impacto** - Procesos automatizados con ROI medible

### 🏗️ Arquitectura del Sistema
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Monorepo**: npm workspaces con packages compartidos
- **Design System**: Colores, tipografía y componentes estandarizados

---

## 🎙️ Análisis del Proyecto de Voz

### 📁 Proyecto a Analizar: `agente-ia-conversacional-main/`

Este proyecto contiene un sistema completo de conversación por voz que debes **analizar y adaptar** para PULSE-HUB:

#### 🔧 Componentes de Voz Disponibles

**1. Reconocimiento de Voz en Tiempo Real**
```javascript
// Configuración optimizada para español
recognition.lang = "es-ES";
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
```

**2. Síntesis de Voz Natural**
```javascript
// Voz española de alta calidad (Google/Microsoft)
utterance.rate = 0.9;    // Velocidad optimizada para claridad
utterance.pitch = 1.05;  // Tono cálido y profesional
utterance.volume = 1.0;  // Volumen completo
```

**3. Filtros de Audio Profesionales**
```javascript
// Stream de audio con filtros avanzados
audio: {
  echoCancellation: true,      // Elimina eco del altavoz
  noiseSuppression: true,       // Reduce ruido ambiental
  autoGainControl: true,        // Normaliza volumen automáticamente
  sampleRate: 48000,            // Calidad profesional (48kHz)
  channelCount: 1               // Mono optimizado para voz
}
```

**4. Interrupción "Barge-in" Robusta**
```javascript
// Detección inmediata cuando usuario habla
if (isAgentSpeaking) {
  speechSynthesis.cancel();
  isAgentSpeaking = false;
  // Feedback visual de interrupción
}
```

**5. Limpieza de Markdown para Voz**
```javascript
// Función que elimina caracteres de formato para síntesis natural
function cleanTextForSpeech(text) {
  // Elimina **negrita**, *cursiva*, # encabezados, 1. listas, etc.
  // Mantiene formato visual en chat, limpia para voz
}
```

#### 🧠 Componentes de IA (Para Análisis)
- **OpenAI GPT-4o-mini** con function calling automático
- **Base de conocimiento en Coda** para consultas especializadas
- **Memoria conversacional** (últimos 10 mensajes)
- **Sistema de trazas** para análisis y debugging

**NOTA**: Estos componentes de IA se reemplazarán posteriormente con el MCP de OpenAI. Tu tarea es analizar cómo se integran con las funcionalidades de voz.

---

## 🎯 Instrucciones Específicas para Claude

### 1. **Análisis del Proyecto de Voz**

Tu primera tarea es **analizar completamente** el proyecto `agente-ia-conversacional-main/`:

**a) Examinar la Estructura:**
- Revisar todos los archivos del proyecto
- Identificar componentes de voz (reconocimiento, síntesis, filtros)
- Analizar la integración con WebSocket y backend
- Documentar las dependencias y configuraciones

**b) Identificar Funcionalidades Clave:**
- Sistema de reconocimiento de voz en tiempo real
- Síntesis de voz natural en español
- Filtros de audio profesionales
- Interrupción "barge-in" robusta
- Limpieza de markdown para voz natural

**c) Analizar Integración con IA:**
- Cómo se comunica con OpenAI GPT-4o-mini
- Sistema de memoria conversacional
- Base de conocimiento en Coda
- Sistema de trazas y debugging

### 2. **Adaptación para PULSE-HUB**

Una vez analizado, adaptar las funcionalidades para PULSE-HUB:

**a) Adaptar Componentes de Voz:**
- Extraer y adaptar el código de voz de `agente-ia-conversacional-main/client/index.html`
- Implementar en la estructura de PULSE-HUB (`apps/web/src/`)
- Mantener el design system existente (colores, tipografía, componentes)
- Crear componentes React/TypeScript reutilizables

**b) Adaptar Backend:**
- Analizar `server/agent.ts` y `server/main.ts` del proyecto original
- Adaptar para la arquitectura de PULSE-HUB (Express + TypeScript)
- Mantener compatibilidad con el sistema de autenticación existente
- Preparar para integración futura con MCP de OpenAI

**c) Personalizar para PULSE-HUB:**
- Adaptar el contexto de "estrategias de IA" a los tres pilares de PULSE-HUB
- Preparar estructura para respuestas del asistente (que se implementará con MCP)
- Integrar con la base de conocimiento específica de Ecos de Liderazgo
- Mantener compatibilidad con el sistema de diseño existente

### 3. **Estructura de Archivos Recomendada**

```
apps/web/src/
├── features/
│   └── ai-chat/
│       ├── components/
│       │   ├── ChatInterface.tsx      # Interfaz principal del chat del asistente
│       │   ├── VoiceConversation.tsx  # Nuevo Frontend de conversación por voz
│       │   ├── VoiceControls.tsx      # Botón de micrófono (barras) y controles
│       │   ├── MessageList.tsx        # Lista de mensajes del chat
│       │   └── VoiceIndicator.tsx     # Indicadores de estado de voz
│       ├── hooks/
│       │   ├── useVoiceRecognition.ts # Hook para reconocimiento de voz
│       │   ├── useVoiceSynthesis.ts   # Hook para síntesis de voz
│       │   ├── useWebSocket.ts        # Hook para comunicación WebSocket
│       │   └── useVoiceConversation.ts # Hook para manejar interfaz persistente
│       ├── services/
│       │   └── voiceService.ts        # Servicio de limpieza de texto para voz
│       └── types/
│           └── voice.types.ts         # Tipos TypeScript para voz

apps/api/src/
├── features/
│   └── ai-chat/
│       ├── voiceAgent.ts              # Agente conversacional adaptado
│       ├── voiceRoutes.ts             # Rutas para chat con voz
│       └── voiceService.ts            # Servicio de procesamiento
```

**ENFOQUE**: 
- **VoiceConversation.tsx**: Nuevo Frontend que se abre dentro del chat
- **Interfaz persistente**: No se cierra automáticamente, solo cuando el usuario lo decide
- **Botón de micrófono (barras)**: Indica que el agente está escuchando
- **Control total del usuario**: Sobre cuándo abrir/cerrar la interfaz de voz

### 4. **Configuración de Variables de Entorno**

```env
# WebSocket (para comunicación en tiempo real)
WEBSOCKET_PORT=3001

# OpenAI (Para integración futura con MCP)
# OPENAI_API_KEY=tu_openai_api_key_aqui
# OPENAI_MODEL=gpt-4o-mini
# OPENAI_MAX_TOKENS=1000

# Coda (Para base de conocimiento - opcional)
# CODA_API_KEY=tu_coda_api_key_aqui
# CODA_DOC_ID=tu_doc_id_aqui
# CODA_TABLE_ID=tu_table_id_aqui
```

**NOTA**: Las variables de OpenAI y Coda están comentadas ya que se implementarán posteriormente con el MCP.

### 5. **Preparación para Integración con MCP**

**Estructura Preparada para MCP:**
```typescript
// Interfaces preparadas para integración con MCP de OpenAI
interface VoiceMessage {
  type: 'user_message' | 'assistant_message';
  text: string;
  timestamp: Date;
  sessionId: string;
}

interface VoiceResponse {
  text: string;
  shouldSpeak: boolean;
  metadata?: {
    confidence?: number;
    intent?: string;
    context?: string;
  };
}

// Estado de la interfaz de conversación por voz
interface VoiceConversationState {
  isOpen: boolean;           // Si la interfaz está abierta
  isListening: boolean;      // Si el agente está escuchando
  isSpeaking: boolean;       // Si el agente está hablando
  messages: VoiceMessage[];  // Historial de mensajes
}

// Servicio preparado para MCP
class VoiceService {
  async processMessage(message: string): Promise<VoiceResponse> {
    // Aquí se integrará con el MCP de OpenAI
    // Por ahora, estructura preparada
  }
}
```

**Contexto Preparado para PULSE-HUB:**
- Estructura de respuestas enfocada en los tres pilares
- Interfaces para casos de uso empresariales específicos
- Referencias a la metodología "Ecos de Liderazgo"
- Preparación para métricas y KPIs de adopción

### 6. **Integración con Design System**

**Colores del Sistema:**
```css
/* Usar los colores establecidos de PULSE-HUB */
--primary-600: #1F5AF6   /* Botones principales */
--primary-100: #E8EFFD   /* Fondos suaves */
--accent-orange: #FF7A45 /* CTAs clave */
--neutral-900: #0A1633   /* Texto principal */
```

**Componentes Reutilizables:**
- Usar `Button` component existente con variantes
- Integrar con `Card` component para el chat
- Mantener consistencia con `Navbar` y `Footer`

### 7. **Funcionalidades de Voz a Implementar**

**OBJETIVO ESPECÍFICO**: Implementar funcionalidades de voz **únicamente dentro del asistente de IA**, no en otras partes de la página.

**a) Interfaz de Conversación por Voz:**
- **Nuevo Frontend que se abre dentro del chat** del asistente
- **Botón de micrófono (barras)** que indica que el agente está escuchando
- **Interfaz persistente** que permanece abierta hasta que el usuario la cierre
- **No se cierra automáticamente** - control total del usuario

**b) Flujo de Conversación:**
- Usuario abre la interfaz de conversación por voz
- Presiona el botón de micrófono (barras) para activar escucha
- El agente escucha y procesa el mensaje del usuario
- El agente responde con voz natural en español
- La interfaz permanece abierta para continuar la conversación
- Usuario puede cerrar la interfaz cuando decida

**c) Integración con MCP de OpenAI:**
- Las respuestas del asistente (via MCP) se reproducen con voz
- El usuario puede interactuar por voz con el asistente
- Mantener funcionalidad de chat por texto como alternativa

**NOTA**: La voz se implementa SOLO en el chat del asistente, no en otras secciones de la página.

### 8. **Consideraciones Técnicas**

**Compatibilidad de Navegadores:**
- Chrome/Edge: Soporte completo
- Firefox: Soporte básico
- Safari: Limitaciones conocidas
- Mobile: Funcionalidad reducida

**Optimizaciones de Rendimiento:**
- Lazy loading del módulo de voz
- Compresión de audio streams
- Caché de respuestas frecuentes
- Debounce en reconocimiento de voz

**Accesibilidad:**
- Indicadores visuales claros
- Navegación por teclado
- Transcripción de conversaciones
- Controles de volumen y velocidad

### 9. **Testing y Validación**

**Casos de Prueba Esenciales:**
1. **Selección de Voz**: Verificar que se selecciona voz española de calidad
2. **Filtros de Audio**: Probar con ruido ambiental
3. **Barge-in**: Interrumpir al agente mientras habla
4. **Limpieza de Markdown**: Verificar que no pronuncia asteriscos
5. **Integración WebSocket**: Comunicación en tiempo real
6. **Responsive Design**: Funcionalidad en mobile
7. **Preparación para MCP**: Estructura lista para integración futura

**Métricas de Calidad:**
- Latencia de respuesta < 2 segundos
- Precisión de reconocimiento > 90%
- Tasa de interrupciones exitosas > 95%
- Satisfacción del usuario > 8/10

---

## 🚀 Comandos de Implementación

### Paso 1: Analizar Proyecto Original
```bash
# Examinar estructura del proyecto de voz
cd agente-ia-conversacional-main/
ls -la
cat README.md
cat package.json
```

### Paso 2: Configurar Dependencias
```bash
# En apps/web
npm install ws @types/ws

# En apps/api  
npm install ws @types/ws
```

### Paso 3: Crear Estructura Base
```bash
# Crear directorios
mkdir -p apps/web/src/features/ai-chat/{components,hooks,services,types}
mkdir -p apps/api/src/features/ai-chat
```

### Paso 4: Analizar y Adaptar Componentes de Voz
- Analizar código de `agente-ia-conversacional-main/client/index.html`
- Extraer funcionalidades de voz (reconocimiento, síntesis, filtros)
- Crear **VoiceConversation.tsx** - nuevo Frontend que se abre dentro del chat
- Implementar **interfaz persistente** que no se cierra automáticamente
- Adaptar **botón de micrófono (barras)** para indicar escucha del agente
- Integrar con design system de PULSE-HUB
- **ENFOQUE**: Interfaz de voz persistente dentro del chat del asistente

### Paso 5: Adaptar Backend
- Analizar `server/agent.ts` y `server/main.ts`
- Adaptar para arquitectura de PULSE-HUB
- Configurar WebSocket server
- Preparar estructura para MCP de OpenAI

### Paso 6: Testing y Validación
- Probar funcionalidades de voz
- Validar integración con PULSE-HUB
- Verificar preparación para MCP
- Documentar implementación

---

## 📚 Recursos de Referencia

### Archivos Clave del Proyecto Base:
- `agente-ia-conversacional-main/client/index.html` - Interfaz completa de voz
- `agente-ia-conversacional-main/server/agent.ts` - Lógica del agente
- `agente-ia-conversacional-main/server/main.ts` - Servidor WebSocket
- `agente-ia-conversacional-main/MEJORAS_VOZ_IMPLEMENTADAS.md` - Documentación técnica

### Documentación PULSE-HUB:
- `README.md` - Arquitectura y estructura del proyecto
- `docs/design/DESIGN-SYSTEM-PROMPT.md` - Sistema de diseño
- `docs/product/PRD-PULSE-HUB.md` - Requisitos del producto

---

## 🎯 Objetivo Final

Crear un sistema de voz integrado **únicamente en el chat del asistente de IA** de PULSE-HUB que:

✅ **Analice completamente** el proyecto `agente-ia-conversacional-main/`
✅ **Adapte las funcionalidades de voz** a la arquitectura de PULSE-HUB
✅ **Implemente voz SOLO en el chat del asistente**, no en otras partes de la página
✅ **Mantenga la identidad visual** y experiencia de usuario de la plataforma
✅ **Proporcione conversación natural** en español con calidad profesional  
✅ **Se integre perfectamente** con la arquitectura existente
✅ **Prepare la estructura** para integración futura con MCP de OpenAI
✅ **Sea accesible y responsive** en todos los dispositivos
✅ **Mantenga altos estándares** de calidad y rendimiento

**Resultado esperado**: Un chat de asistente con un nuevo Frontend de conversación por voz que:
- Se abre dentro del chat del asistente
- Permanece abierto hasta que el usuario decida cerrarlo
- Incluye un botón de micrófono (barras) que indica cuando el agente está escuchando
- Permite conversación continua por voz sin cerrarse automáticamente
- Mantiene el control total del usuario sobre la interfaz

---

*Este prompt está diseñado para guiar el análisis y adaptación del proyecto de voz, manteniendo la coherencia con PULSE-HUB y preparando la estructura para la integración futura del asistente de IA mediante MCP de OpenAI.*