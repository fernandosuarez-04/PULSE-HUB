# 🔌 Conectores Priorizados - Análisis de Riesgo/Esfuerzo

**Proyecto**: Agente IA Conversacional
**Fecha**: 2025-10-08
**Versión**: 1.0

---

## 📋 Resumen Ejecutivo

Evaluación de **5 conectores** para extender las capacidades del agente IA conversacional, con análisis de riesgo, esfuerzo y ROI.

**Recomendación Inicial**: Empezar con **Coda** (bajo riesgo, alto valor) seguido de **Google Calendar** (alto impacto en UX).

---

## 🎯 Conectores Evaluados

| # | Conector | Prioridad | Riesgo | Esfuerzo | ROI | Estado Recomendado |
|---|----------|-----------|--------|----------|-----|-------------------|
| 1 | **Coda** | 🔴 Alta | 🟢 Bajo | 🟢 Bajo (8h) | 🟢 Alto | ✅ IMPLEMENTAR |
| 2 | **Google Calendar** | 🔴 Alta | 🟡 Medio | 🟡 Medio (12h) | 🟢 Alto | ✅ IMPLEMENTAR |
| 3 | **Notion** | 🟡 Media | 🟡 Medio | 🟡 Medio (10h) | 🟡 Medio | 🟡 CONSIDERAR |
| 4 | **Slack** | 🟡 Media | 🟢 Bajo | 🟢 Bajo (6h) | 🟡 Medio | 🟡 CONSIDERAR |
| 5 | **Airtable** | 🔵 Baja | 🟡 Medio | 🟡 Medio (10h) | 🔵 Bajo | 🚫 BACKLOG |

---

## 1️⃣ Coda - Base de Conocimiento y Datos Estructurados

### 📊 Evaluación

| Criterio | Rating | Detalle |
|----------|--------|---------|
| **Prioridad** | 🔴 Alta | Expandir capacidades más allá del clima |
| **Riesgo Técnico** | 🟢 Bajo | API bien documentada, SDKs disponibles |
| **Riesgo de Negocio** | 🟢 Bajo | Pricing predecible, free tier disponible |
| **Esfuerzo Implementación** | 🟢 Bajo | 8 horas |
| **Esfuerzo Mantenimiento** | 🟢 Bajo | API estable |
| **ROI** | 🟢 Alto | Múltiples casos de uso |

### 🎯 Casos de Uso

#### Caso 1: Base de Conocimiento de Cursos
```
Usuario: "¿Qué curso de IA recomiendan para principiantes?"
Agente: [Consulta tabla Coda "Cursos"]
        "Te recomiendo el curso 'Fundamentos de IA'..."
```

#### Caso 2: FAQ Dinámico
```
Usuario: "¿Cuáles son los horarios de atención?"
Agente: [Lee doc Coda "Información General"]
        "Estamos disponibles de lunes a viernes..."
```

#### Caso 3: Registro de Leads
```
Usuario: "Quiero más información sobre el curso"
Agente: [Guarda en tabla Coda "Leads"]
        "Perfecto, he registrado tu interés..."
```

### 🛠️ Implementación Propuesta

```typescript
// server/tools/coda.ts
import { Coda } from 'coda-js';

interface CodaConfig {
  apiToken: string;
  docId: string;
}

export class CodaConnector {
  private client: Coda;
  private docId: string;

  constructor(config: CodaConfig) {
    this.client = new Coda(config.apiToken);
    this.docId = config.docId;
  }

  // Leer tabla
  async getTableData(tableId: string, filters?: any): Promise<any[]> {
    const rows = await this.client.listRows(this.docId, tableId, {
      query: filters
    });
    return rows.items;
  }

  // Escribir fila
  async addRow(tableId: string, data: Record<string, any>): Promise<void> {
    await this.client.insertRows(this.docId, tableId, {
      rows: [{ cells: data }]
    });
  }

  // Buscar en documento
  async searchDoc(query: string): Promise<any> {
    const pages = await this.client.listPages(this.docId);
    // Buscar en contenido de páginas
    return pages.items.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
```

### 📦 Dependencias

```json
{
  "dependencies": {
    "coda-js": "^3.3.0"
  }
}
```

### 🔧 Configuración

```env
CODA_API_TOKEN=your_token_here
CODA_DOC_ID=your_doc_id_here
CODA_COURSES_TABLE=table-123
CODA_LEADS_TABLE=table-456
```

### ⚠️ Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| **Rate Limiting** | 🟡 Media | 🟡 Medio | Implementar caché local |
| **API Changes** | 🟢 Baja | 🟡 Medio | Versionar API calls |
| **Costo Excesivo** | 🟢 Baja | 🟢 Bajo | Free tier suficiente inicialmente |
| **Data Sync Issues** | 🟡 Media | 🟡 Medio | Implementar retry logic |

### 💰 Análisis de Costos

**Coda Pricing**:
- **Free**: 0 USD/mes - 1,000 API calls/día (suficiente para MVP)
- **Pro**: 10 USD/mes/usuario - 10,000 API calls/día
- **Team**: 30 USD/mes/usuario - 100,000 API calls/día

**Estimación para MVP**: Free tier (0 USD/mes)

### 📈 Métricas de Éxito

- ✅ Reducir tiempo de respuesta a preguntas de FAQ en 80%
- ✅ Capturar 100% de leads en Coda automáticamente
- ✅ Consultas a base de conocimiento <500ms

### ⏱️ Timeline de Implementación

**Total: 8 horas**

```
Día 1 (4h):
├── Setup cuenta Coda y API token (30min)
├── Crear doc demo con tablas (1h)
├── Implementar CodaConnector class (2h)
└── Tests unitarios (30min)

Día 2 (4h):
├── Integrar con agente (2h)
├── Implementar casos de uso (1h)
├── Testing E2E (30min)
└── Documentación (30min)
```

### ✅ Recomendación

**🟢 IMPLEMENTAR** - Alta prioridad, bajo riesgo, alto ROI

---

## 2️⃣ Google Calendar - Agendamiento de Demos/Reuniones

### 📊 Evaluación

| Criterio | Rating | Detalle |
|----------|--------|---------|
| **Prioridad** | 🔴 Alta | Mejorar conversión con demos personalizadas |
| **Riesgo Técnico** | 🟡 Medio | OAuth complejo |
| **Riesgo de Negocio** | 🟢 Bajo | Gratuito, ampliamente usado |
| **Esfuerzo Implementación** | 🟡 Medio | 12 horas |
| **Esfuerzo Mantenimiento** | 🟡 Medio | Tokens expiran |
| **ROI** | 🟢 Alto | Incrementa conversión significativamente |

### 🎯 Casos de Uso

#### Caso 1: Agendar Demo Personalizada
```
Usuario: "Quiero agendar una demo del curso de IA"
Agente: [Consulta disponibilidad en Calendar]
        "Tengo disponibilidad mañana a las 3pm o el jueves a las 10am.
         ¿Cuál prefieres?"
Usuario: "Mañana a las 3pm"
Agente: [Crea evento en Calendar + envía invitación]
        "Perfecto! Te he enviado la invitación por email."
```

#### Caso 2: Consultar Horarios Disponibles
```
Usuario: "¿Cuándo tienen disponibilidad para asesoría?"
Agente: [Lee calendario del asesor]
        "Tenemos espacios disponibles el lunes a las 2pm,
         martes a las 11am y jueves a las 4pm."
```

### 🛠️ Implementación Propuesta

```typescript
// server/tools/google-calendar.ts
import { google } from 'googleapis';

export class GoogleCalendarConnector {
  private calendar;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  // Ver disponibilidad
  async getAvailableSlots(
    calendarId: string,
    days: number = 7
  ): Promise<Array<{start: Date, end: Date}>> {
    const now = new Date();
    const end = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const response = await this.calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: end.toISOString(),
        items: [{ id: calendarId }]
      }
    });

    // Procesar slots disponibles
    return this.processFreeBusy(response.data);
  }

  // Crear evento
  async createEvent(event: {
    summary: string;
    description: string;
    start: Date;
    end: Date;
    attendees: string[];
  }): Promise<string> {
    const response = await this.calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.summary,
        description: event.description,
        start: { dateTime: event.start.toISOString() },
        end: { dateTime: event.end.toISOString() },
        attendees: event.attendees.map(email => ({ email })),
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 }
          ]
        }
      },
      sendUpdates: 'all'
    });

    return response.data.id!;
  }

  // Cancelar evento
  async cancelEvent(eventId: string): Promise<void> {
    await this.calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
      sendUpdates: 'all'
    });
  }
}
```

### 📦 Dependencias

```json
{
  "dependencies": {
    "googleapis": "^126.0.0"
  }
}
```

### 🔧 Configuración

```env
GOOGLE_CALENDAR_CREDENTIALS=./credentials.json
GOOGLE_CALENDAR_ID=primary
ADVISOR_CALENDAR_ID=advisor@example.com
```

### ⚠️ Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| **OAuth Complexity** | 🟡 Media | 🔴 Alto | Usar service account |
| **Token Expiration** | 🔴 Alta | 🟡 Medio | Implementar refresh automático |
| **Timezone Issues** | 🟡 Media | 🟡 Medio | Usar UTC + conversión |
| **Double Booking** | 🟡 Media | 🔴 Alto | Validar antes de crear |

### 💰 Análisis de Costos

**Google Calendar API**:
- **Gratuito** hasta 1,000,000 requests/día
- Sin costo adicional

### ⏱️ Timeline de Implementación

**Total: 12 horas**

```
Día 1 (4h):
├── Setup Google Cloud Project (1h)
├── Configurar OAuth/Service Account (1h)
├── Implementar GoogleCalendarConnector (1.5h)
└── Tests de autenticación (30min)

Día 2 (4h):
├── Implementar getAvailableSlots (2h)
├── Implementar createEvent (1h)
└── Manejo de timezones (1h)

Día 3 (4h):
├── Integración con agente (2h)
├── Testing E2E (1h)
└── Documentación y refinamiento (1h)
```

### ✅ Recomendación

**🟢 IMPLEMENTAR** - Alta prioridad, impacto significativo en conversión

---

## 3️⃣ Notion - Gestión de Conocimiento

### 📊 Evaluación

| Criterio | Rating | Detalle |
|----------|--------|---------|
| **Prioridad** | 🟡 Media | Similar a Coda, menor urgencia |
| **Riesgo Técnico** | 🟡 Medio | API en evolución |
| **Riesgo de Negocio** | 🟢 Bajo | Pricing accesible |
| **Esfuerzo Implementación** | 🟡 Medio | 10 horas |
| **Esfuerzo Mantenimiento** | 🟡 Medio | API changes frecuentes |
| **ROI** | 🟡 Medio | Solapamiento con Coda |

### 🎯 Casos de Uso

- Base de conocimiento de cursos
- Documentación de procedimientos
- Wiki interna del equipo
- Registro de decisiones

### 💭 Análisis Comparativo con Coda

| Feature | Notion | Coda |
|---------|--------|------|
| **Base de Datos** | ✅ Buena | ✅ Excelente |
| **Fórmulas** | 🟡 Básicas | ✅ Avanzadas |
| **API Calidad** | 🟡 En mejora | ✅ Madura |
| **Documentación** | ✅ Excelente | ✅ Excelente |
| **Precio** | ✅ Más barato | 🟡 Medio |

### ✅ Recomendación

**🟡 CONSIDERAR** - Solo si ya usan Notion internamente, sino preferir Coda

---

## 4️⃣ Slack - Notificaciones y Comunicación

### 📊 Evaluación

| Criterio | Rating | Detalle |
|----------|--------|---------|
| **Prioridad** | 🟡 Media | Útil para alertas internas |
| **Riesgo Técnico** | 🟢 Bajo | API muy estable |
| **Riesgo de Negocio** | 🟢 Bajo | Free tier generoso |
| **Esfuerzo Implementación** | 🟢 Bajo | 6 horas |
| **Esfuerzo Mantenimiento** | 🟢 Bajo | Muy estable |
| **ROI** | 🟡 Medio | Interno, no usuario final |

### 🎯 Casos de Uso

#### Caso 1: Notificar Nuevo Lead
```
[Usuario completa formulario]
→ Agente envía mensaje a #leads en Slack
→ "🎯 Nuevo lead: María González interesada en Curso IA"
```

#### Caso 2: Alertas de Errores
```
[Error en API de clima]
→ Notificación a #tech-alerts
→ "⚠️ API Weather falló 5 veces en última hora"
```

### 🛠️ Implementación Propuesta

```typescript
// server/tools/slack.ts
import { WebClient } from '@slack/web-api';

export class SlackConnector {
  private client: WebClient;

  constructor(token: string) {
    this.client = new WebClient(token);
  }

  async sendMessage(channel: string, message: string): Promise<void> {
    await this.client.chat.postMessage({
      channel: channel,
      text: message
    });
  }

  async sendLeadNotification(lead: {
    name: string;
    course: string;
    source: string;
  }): Promise<void> {
    await this.client.chat.postMessage({
      channel: '#leads',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `🎯 *Nuevo Lead*\n*Nombre:* ${lead.name}\n*Curso:* ${lead.course}\n*Fuente:* ${lead.source}`
          }
        }
      ]
    });
  }
}
```

### ⏱️ Timeline: 6 horas

### ✅ Recomendación

**🟡 CONSIDERAR** - Útil para equipo interno, no crítico para MVP

---

## 5️⃣ Airtable - Base de Datos Estructurados

### 📊 Evaluación

| Criterio | Rating | Detalle |
|----------|--------|---------|
| **Prioridad** | 🔵 Baja | Funcionalidad cubierta por Coda |
| **Riesgo Técnico** | 🟡 Medio | API robusta |
| **Riesgo de Negocio** | 🟡 Medio | Pricing escala rápido |
| **Esfuerzo Implementación** | 🟡 Medio | 10 horas |
| **Esfuerzo Mantenimiento** | 🟢 Bajo | API estable |
| **ROI** | 🔵 Bajo | Solapamiento con Coda |

### ✅ Recomendación

**🚫 BACKLOG** - Solo considerar si hay requisitos específicos que Coda no cubre

---

## 📊 Matriz de Priorización

```
Alto ROI    │ 1. Coda          │ 2. Google        │
            │                  │    Calendar      │
            │                  │                  │
────────────┼──────────────────┼──────────────────┤
            │ 3. Notion        │                  │
Medio ROI   │ 4. Slack         │                  │
            │                  │                  │
────────────┼──────────────────┼──────────────────┤
Bajo ROI    │                  │ 5. Airtable      │
            │                  │                  │
            └──────────────────┴──────────────────┘
              Bajo Esfuerzo      Alto Esfuerzo
              (6-8 horas)        (10-12 horas)
```

---

## 🎯 Recomendación Inicial

### Fase 1 (Sprint Actual) - IMPLEMENTAR
**Conector**: Coda
- **Esfuerzo**: 8 horas
- **Riesgo**: Bajo
- **ROI**: Alto
- **Justificación**: Amplía capacidades del agente significativamente con bajo riesgo

### Fase 2 (Siguiente Sprint) - IMPLEMENTAR
**Conector**: Google Calendar
- **Esfuerzo**: 12 horas
- **Riesgo**: Medio
- **ROI**: Alto
- **Justificación**: Alto impacto en conversión de leads

### Fase 3 (Futuro) - EVALUAR
**Conectores**: Slack, Notion
- Solo si hay necesidad específica
- Slack útil para alertas internas
- Notion solo si ya lo usan

### NO IMPLEMENTAR
**Conector**: Airtable
- Funcionalidad cubierta por Coda
- Solo reconsiderar si hay requisitos muy específicos

---

## 📋 Plan de Implementación Detallado

### Sprint 1: Coda (8h)

**Semana 1**:
```
Día 1-2: Implementación base (4h)
├── Setup y configuración
├── CodaConnector class
└── Tests unitarios

Día 3-4: Integración (4h)
├── Casos de uso
├── Integración con agente
└── Testing E2E
```

**Entregables**:
- [ ] CodaConnector funcional
- [ ] 3 casos de uso implementados
- [ ] Tests pasando
- [ ] Documentación

**Métricas de Éxito**:
- ✅ 100% consultas a base de conocimiento exitosas
- ✅ Latencia <500ms
- ✅ 0 errores en primera semana

### Sprint 2: Google Calendar (12h)

**Semana 2**:
```
Día 1-2: Setup OAuth (4h)
├── Google Cloud setup
├── Service account
└── Autenticación

Día 3-4: Implementación (4h)
├── Disponibilidad
├── Crear eventos
└── Manejo timezones

Día 5: Integración (4h)
├── Casos de uso
├── Testing
└── Documentación
```

**Entregables**:
- [ ] GoogleCalendarConnector funcional
- [ ] Agendar demos automáticamente
- [ ] Consultar disponibilidad
- [ ] Tests E2E pasando

**Métricas de Éxito**:
- ✅ +30% conversión a demos
- ✅ 0 double bookings
- ✅ 100% invitaciones enviadas

---

## 📈 ROI Estimado

### Coda

**Inversión**:
- Desarrollo: 8h × $50/h = $400
- Costo mensual: $0 (free tier)
- **Total Año 1**: $400

**Retorno**:
- Reducción 80% tiempo respuestas FAQ → 4h/semana ahorradas
- Captura automática 100% leads → +20 leads/mes
- **Valor Año 1**: ~$5,000

**ROI**: 1,150%

### Google Calendar

**Inversión**:
- Desarrollo: 12h × $50/h = $600
- Costo mensual: $0 (gratis)
- **Total Año 1**: $600

**Retorno**:
- +30% conversión a demos → +15 demos/mes
- Reducción 90% tiempo manual → 6h/semana
- **Valor Año 1**: ~$8,000

**ROI**: 1,233%

---

## ⚠️ Riesgos Consolidados

| Riesgo | Conectores Afectados | Probabilidad | Impacto | Mitigación |
|--------|---------------------|--------------|---------|------------|
| **Rate Limiting** | Coda, Google Cal | 🟡 Media | 🟡 Medio | Caché local + retry logic |
| **API Changes** | Todos | 🟢 Baja | 🟡 Medio | Versionar calls + monitoring |
| **Auth Complexity** | Google Cal | 🟡 Media | 🔴 Alto | Service accounts + docs |
| **Data Sync** | Coda, Airtable | 🟡 Media | 🟡 Medio | Webhooks + polling híbrido |
| **Costos Escalamiento** | Coda, Notion | 🟢 Baja | 🟡 Medio | Monitoring + alertas |

---

## 📚 Recursos y Referencias

### Coda
- [API Documentation](https://coda.io/developers/apis/v1)
- [NPM Package](https://www.npmjs.com/package/coda-js)
- [Pricing](https://coda.io/pricing)

### Google Calendar
- [API Documentation](https://developers.google.com/calendar/api/guides/overview)
- [Node.js Quickstart](https://developers.google.com/calendar/api/quickstart/nodejs)
- [OAuth Setup](https://developers.google.com/workspace/guides/create-credentials)

### Slack
- [API Documentation](https://api.slack.com/)
- [Web API](https://slack.dev/node-slack-sdk/)

---

## ✅ Criterios de Aceptación Cumplidos

### 1. ✅ Lista Priorizada
- 5 conectores evaluados y priorizados
- Orden basado en riesgo/esfuerzo/ROI

### 2. ✅ Evaluación de Riesgo/Esfuerzo
- Riesgo técnico y de negocio identificado
- Esfuerzo en horas estimado
- Riesgos específicos documentados
- Mitigaciones propuestas

### 3. ✅ Recomendación Inicial
- **Fase 1**: Coda (8h, bajo riesgo, alto ROI)
- **Fase 2**: Google Calendar (12h, medio riesgo, alto ROI)
- **Evaluar**: Slack, Notion
- **No implementar**: Airtable

---

**Última actualización**: 2025-10-08
**Preparado por**: Claude Code
**Versión**: 1.0
