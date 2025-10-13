# Product Requirements Document (PRD)
## Pulse Hub — Plataforma B2B para Adopción de IA

---

| **Campo** | **Valor** |
|-----------|-----------|
| **Versión** | 1.0 |
| **Fecha** | 11 de octubre, 2025 |
| **Propietario del Producto** | Ecos de Liderazgo — Pulse Hub |
| **Contacto** | fernando.suarez@ecosdeliderazgo.com |
| **Estado** | En Desarrollo |
| **Prioridad** | Alta |

---

## 📑 Tabla de Contenidos

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Alcance del Proyecto](#2-alcance-del-proyecto)
3. [Objetivos de Negocio y KPIs](#3-objetivos-de-negocio-y-kpis)
4. [Audiencia y Casos de Uso](#4-audiencia-y-casos-de-uso)
5. [Arquitectura de Contenido](#5-arquitectura-de-contenido)
6. [Requisitos Funcionales](#6-requisitos-funcionales)
7. [Requisitos No Funcionales](#7-requisitos-no-funcionales)
8. [Stack Tecnológico](#8-stack-tecnológico)
9. [Experiencia de Usuario (UX/UI)](#9-experiencia-de-usuario-uxui)
10. [Flujos Críticos y Funnels](#10-flujos-críticos-y-funnels)
11. [Analítica y Medición](#11-analítica-y-medición)
12. [Criterios de Aceptación (UAT)](#12-criterios-de-aceptación-uat)
13. [Plan de Implementación](#13-plan-de-implementación)
14. [Gestión de Riesgos](#14-gestión-de-riesgos)
15. [Dependencias](#15-dependencias)
16. [Anexos](#16-anexos)

---

## 1. Resumen Ejecutivo

### 1.1 Descripción del Producto

**Pulse Hub** es un ecosistema humano-tecnológico diseñado para acelerar la adopción de IA en empresas medianas y grandes. La plataforma se estructura en **Tres Pilares fundamentales**:

1. **IA para Todos** — Capacitación por rol, ética y seguridad
2. **IA en el Día a Día** — Herramientas prácticas y biblioteca de prompts
3. **Automatización de Alto Impacto** — Priorización ROI y gobernanza

### 1.2 Objetivo de Lanzamiento (V1)

Entregar un sitio web B2B navegable con:
- Páginas clave de información y conversión
- Test de Madurez IA interactivo
- Biblioteca de recursos y prompts
- Integración con agenda de demos
- Sistema de analítica end-to-end

### 1.3 Impacto Esperado (12 meses)

| **Métrica** | **Objetivo** |
|-------------|--------------|
| Generación de leads calificados | **+30%** |
| Reducción tiempo ciclo comercial | **–20%** |
| Adopción AI Academy (cuentas activas) | **≥25%** |
| Eficiencia en onboarding | **+38%** |
| ROI documentado | **< 12 meses** |

### 1.4 Stakeholders

- **Dirección** — Visión estratégica y ROI
- **Transformación Digital** — Roadmap de adopción
- **Operaciones** — Automatización y eficiencia
- **RR.HH.** — Capacitación y desarrollo
- **TI/Seguridad** — Cumplimiento y gobernanza
- **Legal** — Cumplimiento LFPDPPP y privacidad

---

## 2. Alcance del Proyecto

### 2.1 En Alcance (V1) ✅

#### Páginas y Secciones
- ✅ Inicio (Hero, Pilares, Métricas, Testimonios, CTA)
- ✅ Sobre (Manifiesto, Equipo, Metodología "Ecos")
- ✅ Estrategia IA — Pilar 1: IA para Todos
- ✅ Estrategia IA — Pilar 2: IA en el Día a Día
- ✅ Estrategia IA — Pilar 3: Automatización de Alto Impacto
- ✅ Casos de Éxito / Demos
- ✅ Recursos / AI Academy
- ✅ Contacto / Alianzas
- ✅ Legal (Aviso Privacidad, Términos, Cookies)

#### Funcionalidades Core
- ✅ Test de Madurez IA (7–9 preguntas, segmentación)
- ✅ Biblioteca de Prompts (copiar 1-clic, tags por área)
- ✅ Agenda de Demo embebida (Calendly u otro)
- ✅ Sistema de analítica (eventos, conversión, funnels)
- ✅ Accesibilidad WCAG 2.2 AA completa
- ✅ Design System con tokens y componentes reutilizables

### 2.2 Fuera de Alcance (V1) ❌

- ❌ SSO y autenticación empresarial
- ❌ Pagos online / e-commerce
- ❌ Dashboards de clientes / portal privado
- ❌ LMS propio (Learning Management System)
- ❌ Integraciones con herramientas internas (excepto agenda)
- ❌ Automatizaciones con CRM/ERP
- ❌ API pública para terceros

> **Nota:** Los elementos fuera de alcance se evaluarán para V2 según métricas de adopción.

---

## 3. Objetivos de Negocio y KPIs

### 3.1 Objetivos Estratégicos

1. **Demostrar Valor y ROI** — Casos documentados con métricas verificables
2. **Reducir Fricción de Adopción** — Recursos accesibles y test de diagnóstico
3. **Activar Oportunidades** — Conversión a demos, leads cualificados y alianzas

### 3.2 KPIs Primarios (Primeros 90 días)

| **KPI** | **Métrica** | **Objetivo** | **Herramienta** |
|---------|-------------|--------------|-----------------|
| **Conversión Hero** | CTR CTA Principal | ≥ 4% | GA4 / Posthog |
| **Test Completado** | % Usuarios que finalizan | ≥ 45% | Custom Events |
| **Test → Demo** | Ratio conversión | ≥ 12% | Funnel Analysis |
| **Engagement Casos** | Tiempo medio en página | ≥ 1:30 min | GA4 |
| **Descargas Guías** | Recursos descargados | ≥ 200/mes | Event Tracking |
| **Demos Agendadas** | Calendly bookings | ≥ 50/mes | Calendly API |

### 3.3 KPIs Técnicos (Performance)

| **KPI** | **Métrica** | **Objetivo** | **Herramienta** |
|---------|-------------|--------------|-----------------|
| **LCP** (móvil) | Largest Contentful Paint | ≤ 2.5 s (p75) | Lighthouse |
| **CLS** | Cumulative Layout Shift | ≤ 0.10 | Lighthouse |
| **INP** | Interaction to Next Paint | ≤ 200 ms | Lighthouse |
| **Accessibility** | Lighthouse Score | ≥ 95/100 | Lighthouse |
| **SEO** | Lighthouse Score | ≥ 90/100 | Lighthouse |

---

## 4. Audiencia y Casos de Uso

### 4.1 Perfiles de Usuario (Personas)

#### Persona 1: Director/a de Transformación Digital
- **Edad:** 38-52 años
- **Objetivo:** Liderar adopción de IA con ROI demostrable
- **Pain Points:** Resistencia al cambio, falta de estrategia clara
- **Necesita:** Casos de éxito, roadmap, métricas de impacto

#### Persona 2: Responsable de Operaciones
- **Edad:** 35-48 años
- **Objetivo:** Automatizar procesos con impacto medible
- **Pain Points:** Priorización, recursos limitados
- **Necesita:** Matriz impacto-esfuerzo, quick wins, gobernanza

#### Persona 3: Director/a de RR.HH.
- **Edad:** 40-55 años
- **Objetivo:** Capacitar equipos con enfoque ético
- **Pain Points:** Miedo a desplazamiento, curva de aprendizaje
- **Necesita:** Rutas de aprendizaje por rol, ética, cumplimiento

#### Persona 4: CIO / Responsable TI
- **Edad:** 42-58 años
- **Objetivo:** Asegurar cumplimiento y seguridad
- **Pain Points:** Privacidad de datos, shadow IA
- **Necesita:** Gobernanza, políticas, integración segura

### 4.2 User Stories (Épicas Principales)

#### Epic 1: Descubrimiento de Valor
```
Como Director de Transformación Digital
Quiero entender los Tres Pilares y ver casos concretos
Para evaluar si Pulse Hub se ajusta a mi estrategia
```

**User Stories:**
- US-1.1: Ver propuesta de valor en Hero con CTAs claros
- US-1.2: Explorar cada Pilar con ejemplos concretos
- US-1.3: Leer casos de éxito filtrados por industria
- US-1.4: Ver métricas de impacto validadas

#### Epic 2: Evaluación de Madurez
```
Como Responsable de Operaciones
Quiero evaluar mi madurez en IA
Para identificar gaps y priorizar acciones
```

**User Stories:**
- US-2.1: Completar test de 7-9 preguntas en < 5 min
- US-2.2: Obtener segmento (Inicial/En marcha/Escalable)
- US-2.3: Recibir recomendaciones personalizadas por pilar
- US-2.4: Opcionalmente guardar resultado vía email

#### Epic 3: Acceso a Recursos
```
Como Director de RR.HH.
Quiero acceder a recursos de capacitación
Para diseñar un programa de adopción ético y efectivo
```

**User Stories:**
- US-3.1: Navegar cursos por nivel y duración
- US-3.2: Descargar guías (LFPDPPP, política IA)
- US-3.3: Copiar prompts por área con 1 clic
- US-3.4: Filtrar contenido por rol y objetivo

#### Epic 4: Agendar Demo
```
Como cualquier usuario calificado
Quiero agendar una demo personalizada
Para profundizar en mi caso específico
```

**User Stories:**
- US-4.1: Acceder a formulario de contacto desde múltiples puntos
- US-4.2: Seleccionar fecha/hora disponible en agenda embebida
- US-4.3: Recibir confirmación por email
- US-4.4: Añadir evento a mi calendario (iCal/Google)

---

## 5. Arquitectura de Contenido

### 5.1 Sitemap

```
Pulse Hub (Home)
│
├── Inicio
│   ├── Hero + CTAs
│   ├── Tres Pilares (cards)
│   ├── Métricas de Impacto
│   ├── Cómo Funciona (3 pasos)
│   ├── Testimonios
│   ├── AI Academy (destacados)
│   └── CTA Final
│
├── Sobre
│   ├── Manifiesto
│   ├── Enfoque Ético
│   ├── Equipo
│   └── Metodología "Ecos"
│
├── Estrategia IA
│   ├── Pilar 1: IA para Todos
│   │   ├── Capacitación por Rol
│   │   ├── Rutas de Aprendizaje
│   │   ├── KPIs Formación
│   │   └── Mini Caso
│   │
│   ├── Pilar 2: IA en el Día a Día
│   │   ├── AI Buddy & Rituales
│   │   ├── Biblioteca de Prompts
│   │   └── Cumplimiento
│   │
│   └── Pilar 3: Automatización Alto Impacto
│       ├── Matriz Impacto-Esfuerzo
│       ├── Casos Tipo
│       ├── Gobernanza
│       └── KPIs/ROI
│
├── Casos de Éxito
│   ├── Filtros (industria/proceso/pilar)
│   ├── Grid de Casos
│   └── Demos (videos)
│
├── Recursos / AI Academy
│   ├── Cursos
│   ├── Guías Descargables
│   └── Biblioteca de Prompts
│
├── Contacto / Alianzas
│   ├── Formulario
│   ├── Agenda Demo
│   └── Programa Partners
│
└── Legal
    ├── Aviso de Privacidad
    ├── Términos y Condiciones
    └── Política de Cookies
```

### 5.2 Navegación Principal

**Desktop:**
```
[Logo] Inicio | Estrategia IA ▼ | Casos | Recursos | Sobre | Contacto [CTA: Evaluar Madurez]
```

**Mobile:**
```
[☰ Menu] [Logo] [Test 🎯]
```

**Estrategia IA (dropdown):**
- Pilar 1: IA para Todos
- Pilar 2: IA en el Día a Día
- Pilar 3: Automatización Alto Impacto

---

## 6. Requisitos Funcionales

### FR-1: Navegación y Layout

**Descripción:** Sistema de navegación responsive con acceso directo a secciones clave.

**Criterios:**
- ✅ Menú principal con dropdown en "Estrategia IA"
- ✅ Breadcrumbs en subpáginas (ej: Inicio > Estrategia IA > Pilar 1)
- ✅ Responsive 360px–1440px, mobile-first
- ✅ Tab order lógico y accesible por teclado
- ✅ Skip to content link para lectores de pantalla

**Prioridad:** Alta  
**Estimación:** 5 días

---

### FR-2: Hero & CTAs

**Descripción:** Sección Hero impactante con llamados a la acción claros.

**Criterios:**
- ✅ Título H1: "IA que impulsa liderazgo humano"
- ✅ Subtítulo con propuesta de valor
- ✅ Dos CTAs: "Evaluar mi madurez" (primario) + "Ver casos" (secundario)
- ✅ Ondas SVG animadas como elemento visual ("Ecos")
- ✅ CTA "Evaluar mi madurez" sticky en mobile (scroll > 300px)
- ✅ Tracking: `hero_cta_click` con propiedad `cta_type`

**Prioridad:** Alta  
**Estimación:** 3 días

---

### FR-3: Test de Madurez IA

**Descripción:** Cuestionario interactivo para evaluar nivel de madurez en IA.

**Criterios:**
- ✅ 7–9 preguntas con tipos: radio, slider, checkbox
- ✅ Dimensiones evaluadas:
  - Estrategia y Visión
  - Capacitación y Cultura
  - Herramientas y Adopción
  - Automatización y ROI
  - Gobernanza y Ética
- ✅ Algoritmo de scoring → segmento:
  - **Inicial** (0-33 pts)
  - **En Marcha** (34-66 pts)
  - **Escalable** (67-100 pts)
- ✅ Página de resultado con:
  - Diagnóstico del segmento
  - 3 recomendaciones por pilar
  - Recursos sugeridos (links)
- ✅ Opción de registro (email) para enviar resultado
- ✅ Persistencia local (localStorage) para reanudar
- ✅ Tracking:
  - `maturity_start`
  - `maturity_question_answered` (prop: question_id)
  - `maturity_complete` (prop: segment, score)
  - `segment_assigned` (prop: segment)
  - `recommendation_click` (prop: pillar, resource_id)

**Prioridad:** Alta  
**Estimación:** 8 días

---

### FR-4: Biblioteca de Prompts

**Descripción:** Colección organizada de prompts listos para usar, organizados por área funcional.

**Criterios:**
- ✅ Grid responsive con cards de prompts
- ✅ Áreas: Operaciones, Ventas, Finanzas, RR.HH., TI
- ✅ Mínimo 9 prompts por área (45 total V1)
- ✅ Cada prompt incluye:
  - Título descriptivo
  - Contexto de uso
  - Prompt completo
  - Tags (área, nivel, caso de uso)
  - Botón "Copiar" → clipboard
- ✅ Búsqueda por texto (filtrado en tiempo real)
- ✅ Filtros por tags (multi-select)
- ✅ Contador de copias (opcional, analítica)
- ✅ Aviso legal: "No incluyas datos personales o confidenciales"
- ✅ Tracking:
  - `prompt_search` (prop: query)
  - `prompt_filter_applied` (prop: tags)
  - `prompt_copy` (prop: prompt_id, area)
  - `prompt_view` (prop: prompt_id)

**Prioridad:** Alta  
**Estimación:** 6 días

---

### FR-5: Casos de Éxito y Demos

**Descripción:** Showcase de casos reales con filtros y modales detallados.

**Criterios:**
- ✅ Grid de casos con imagen, título, industria, pilar
- ✅ Filtros multi-select:
  - Industria (5-7 opciones)
  - Proceso (Operaciones, Ventas, RR.HH., etc.)
  - Pilar (1, 2, 3)
- ✅ Click en card → modal con tabs:
  - **Problema:** contexto y desafío
  - **Solución:** enfoque y herramientas
  - **Métricas:** KPIs antes/después
  - **Lecciones:** aprendizajes clave
- ✅ CTA "Solicitar demo similar" en modal
- ✅ Sección "Demos" con videos:
  - Player accesible (controles nativos)
  - Autoplay desactivado
  - Subtítulos opcionales
- ✅ Tracking:
  - `case_filter_apply` (prop: filters)
  - `case_view` (prop: case_id, industry, pillar)
  - `case_modal_tab_change` (prop: tab_name)
  - `demo_video_play` (prop: video_id, case_id)
  - `request_demo_click` (source: modal)

**Prioridad:** Alta  
**Estimación:** 7 días

---

### FR-6: Contacto y Agenda de Demos

**Descripción:** Formulario de contacto y agenda embebida para reservar demos.

**Criterios:**
- ✅ Formulario con campos:
  1. Nombre completo *
  2. Email corporativo *
  3. Empresa *
  4. Cargo
  5. Teléfono
  6. Industria (select)
  7. Mensaje / Necesidad
  8. Consentimiento LFPDPPP * (checkbox)
- ✅ Validaciones:
  - Email formato válido
  - Campos requeridos
  - Checkbox consentimiento obligatorio
- ✅ Estados:
  - Loading (spinner)
  - Éxito (mensaje + opción agenda)
  - Error (reintento)
- ✅ Agenda embebida (Calendly u otro):
  - Selector fecha/hora
  - Timezone automático
  - Confirmación por email
  - Evento .ics exportable
- ✅ Sección "Programa de Partners":
  - Beneficios
  - Proceso de aplicación
  - CTA "Convertirse en Partner"
- ✅ Tracking:
  - `form_field_focus` (prop: field_name)
  - `form_submit` (prop: source_page)
  - `form_error` (prop: error_type)
  - `form_success`
  - `demo_booked` (prop: date, time, source)
  - `partner_interest_click`

**Prioridad:** Alta  
**Estimación:** 5 días

---

### FR-7: Legal y Privacidad

**Descripción:** Páginas legales cumpliendo con LFPDPPP y normativa vigente.

**Criterios:**
- ✅ Aviso de Privacidad (LFPDPPP conforme):
  - Identidad del responsable
  - Datos personales recabados
  - Finalidades
  - Transferencias (si aplica)
  - Derechos ARCO
  - Revocación de consentimiento
  - Cambios al aviso
- ✅ Términos y Condiciones:
  - Uso del sitio
  - Propiedad intelectual
  - Limitaciones de responsabilidad
  - Jurisdicción
- ✅ Política de Cookies:
  - Tipos de cookies usadas
  - Propósito
  - Opciones de configuración
  - Banner inicial con aceptación
- ✅ Banner de cookies:
  - Visible en primera visita
  - Botones: Aceptar / Configurar / Rechazar
  - Persistencia de preferencias (localStorage)
- ✅ Footer con enlaces a todas las páginas legales
- ✅ Tracking:
  - `cookie_banner_view`
  - `cookie_consent_given` (prop: consent_type)
  - `cookie_settings_changed`
  - `legal_page_view` (prop: page_type)

**Prioridad:** Alta (requisito legal)  
**Estimación:** 4 días

---

### FR-8: Recursos / AI Academy

**Descripción:** Biblioteca de contenidos educativos y recursos descargables.

**Criterios:**
- ✅ Tipos de recursos:
  - **Cursos:** con nivel (básico/intermedio/avanzado) y duración
  - **Guías:** PDFs descargables
  - **Templates:** plantillas y frameworks
  - **Prompts:** enlace a biblioteca (FR-4)
- ✅ Filtros:
  - Tipo de recurso
  - Nivel
  - Pilar relacionado
  - Duración (para cursos)
- ✅ Cards con:
  - Imagen/icono
  - Título
  - Descripción breve
  - Meta info (nivel, duración, tipo)
  - CTA "Ver más" o "Descargar"
- ✅ Recursos destacados en Home
- ✅ Tracking:
  - `resource_view` (prop: resource_id, type)
  - `resource_download` (prop: resource_id, type)
  - `resource_filter_applied` (prop: filters)
  - `course_start` (prop: course_id)

**Prioridad:** Media  
**Estimación:** 5 días

---

## 7. Requisitos No Funcionales

### NFR-1: Accesibilidad (WCAG 2.2 AA)

**Estándar:** Web Content Accessibility Guidelines 2.2, Nivel AA

**Criterios:**

| **Categoría** | **Requisito** | **Criterio WCAG** |
|---------------|---------------|-------------------|
| **Perceptible** | Contraste texto/fondo ≥ 4.5:1 | 1.4.3 |
| | Contraste elementos UI ≥ 3:1 | 1.4.11 |
| | Textos redimensionables hasta 200% | 1.4.4 |
| | Alternativas textuales para imágenes | 1.1.1 |
| **Operable** | Navegable por teclado (Tab/Enter/Space) | 2.1.1 |
| | Foco visible 2px en todos los controles | 2.4.7 |
| | Target size ≥ 24×24 CSS px | 2.5.8 |
| | No trampas de teclado | 2.1.2 |
| | Pausa/stop en contenido en movimiento | 2.2.2 |
| **Comprensible** | Idioma de página declarado (lang="es") | 3.1.1 |
| | Labels y instrucciones claras | 3.3.2 |
| | Mensajes de error específicos | 3.3.3 |
| | Navegación consistente | 3.2.3 |
| **Robusto** | HTML válido y semántico | 4.1.1 |
| | ARIA roles y propiedades correctas | 4.1.2 |

**Recomendaciones UX adicionales (no WCAG):**
- Target size ≥ 44×44 pt en móvil para mejor usabilidad
- Soporte para `prefers-reduced-motion`
- Soporte para `prefers-color-scheme` (V2)

**Prioridad:** Crítica  
**Validación:** Lighthouse, axe DevTools, pruebas con lectores de pantalla

---

### NFR-2: Performance

**Core Web Vitals (móvil, percentil 75):**

| **Métrica** | **Objetivo** | **Estrategia** |
|-------------|--------------|----------------|
| **LCP** | ≤ 2.5 s | - Optimizar imágenes (WebP, lazy loading)<br>- CDN para assets estáticos<br>- Priorizar recursos críticos<br>- Server-side rendering (Next.js) |
| **CLS** | ≤ 0.10 | - Reservar espacio para imágenes/videos<br>- Evitar inserción dinámica de contenido<br>- Fuentes con font-display: swap<br>- Dimensiones explícitas en media |
| **INP** | ≤ 200 ms | - Optimizar JavaScript (code splitting)<br>- Debounce en inputs<br>- Lazy loading de componentes<br>- Minimizar re-renders |

**Optimizaciones adicionales:**
- Bundle size < 200 KB (gzipped)
- Tree-shaking y eliminación de código muerto
- Imágenes responsive con `srcset`
- SVG optimizados (SVGO)
- Fuentes variables para reducir requests
- Service Worker para caché (V1.1)

**Prioridad:** Alta  
**Herramientas:** Lighthouse, WebPageTest, Chrome DevTools, Next.js Analytics

---

### NFR-3: Seguridad y Privacidad

**Medidas de seguridad:**

| **Área** | **Requisito** | **Implementación** |
|----------|---------------|---------------------|
| **Transporte** | HTTPS obligatorio | TLS 1.3, certificado válido |
| **Headers** | Security headers | CSP, X-Frame-Options, HSTS |
| **Datos** | Minimización de datos | Solo campos esenciales en forms |
| **Formularios** | Protección CSRF | Tokens en forms, validación server |
| **APIs** | Rate limiting | Max 100 req/min por IP |
| **Cookies** | Secure, HttpOnly, SameSite | Configuración segura |

**Cumplimiento LFPDPPP:**
- Consentimiento explícito antes de procesar datos
- Aviso de privacidad accesible
- Mecanismo de ejercicio de derechos ARCO
- Registro de consentimientos (audit log)
- Seguridad física, técnica y administrativa
- Plan de respuesta a incidentes

**Prioridad:** Crítica (requisito legal)  
**Revisión:** Auditoría legal trimestral

---

### NFR-4: SEO

**On-Page SEO:**

| **Elemento** | **Especificación** |
|--------------|---------------------|
| **Titles** | Únicos, 50-60 caracteres, keywords principales |
| **Meta Descriptions** | 150-160 caracteres, call-to-action |
| **H1** | Uno por página, keyword principal |
| **H2-H6** | Jerarquía lógica, keywords secundarias |
| **URLs** | Semánticas, lowercase, guiones |
| **Images** | Alt text descriptivo, nombres semánticos |
| **Internal Linking** | Min. 3 links internos por página |
| **Sitemap** | sitemap.xml actualizado automáticamente |
| **Robots.txt** | Configurado para indexación selectiva |

**Structured Data (Schema.org):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Pulse Hub",
  "url": "https://pulsehub.mx",
  "logo": "https://pulsehub.mx/logo.png",
  "description": "Ecosistema para adopción de IA ética y efectiva",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Sales",
    "email": "fernando.suarez@ecosdeliderazgo.com"
  }
}
```

**Keywords objetivo (ejemplo):**
- Adopción de IA
- Inteligencia artificial empresas
- Capacitación IA
- Automatización responsable
- LFPDPPP IA
- ROI inteligencia artificial

**Prioridad:** Media  
**Herramientas:** Google Search Console, Ahrefs, Screaming Frog

---

### NFR-5: Compatibilidad

**Navegadores soportados:**
- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- iOS Safari 14+
- Android Chrome 90+

**Dispositivos:**
- Mobile: 360px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1440px
- Wide: 1441px+

**Prioridad:** Alta  
**Testing:** BrowserStack, real devices

---

## 8. Stack Tecnológico

### 8.1 Frontend

| **Capa** | **Tecnología** | **Versión** | **Justificación** |
|----------|----------------|-------------|-------------------|
| **Framework** | Next.js | 15.x | SSR, SSG, optimización automática, mejor SEO |
| **UI Library** | React | 19.x | Ecosistema maduro, componentes reutilizables |
| **Lenguaje** | TypeScript | 5.x | Type safety, mejor DX, menos bugs |
| **Estilos** | Tailwind CSS | 4.x | Utility-first, consistencia, performance |
| **State** | Zustand | Latest | Simple, sin boilerplate, TypeScript friendly |
| **Forms** | React Hook Form | Latest | Performance, validaciones, accesibilidad |
| **Validación** | Zod | Latest | Type-safe schema validation |
| **Animaciones** | Framer Motion | Latest | Declarativo, accesible (prefers-reduced-motion) |
| **Iconos** | Lucide React | Latest | Tree-shakeable, consistente |
| **Cliente HTTP** | Fetch API | Native | Nativo, suficiente para V1 |

### 8.2 Backend (API)

| **Capa** | **Tecnología** | **Versión** |
|----------|----------------|-------------|
| **Runtime** | Node.js | 20 LTS |
| **Framework** | Express | 4.x |
| **Lenguaje** | TypeScript | 5.x |
| **Base de datos** | PostgreSQL | 15+ |
| **ORM** | Prisma | Latest |
| **Validación** | Zod | Latest |
| **Auth** | JWT | (V2) |

### 8.3 Infraestructura

| **Servicio** | **Proveedor** | **Uso** |
|--------------|---------------|---------|
| **Hosting Frontend** | Vercel | Deploy automático, Edge Network |
| **Hosting Backend** | Railway / Render | API, tareas programadas |
| **Base de datos** | Railway / Neon | PostgreSQL serverless |
| **Assets** | Cloudinary | Imágenes, videos, optimización |
| **Agenda** | Calendly | Booking de demos |
| **Analítica** | PostHog / Plausible | Privacy-friendly analytics |
| **Monitoreo** | Sentry | Error tracking |
| **Email** | Resend / SendGrid | Transaccional |

### 8.4 Desarrollo

| **Herramienta** | **Uso** |
|-----------------|---------|
| **Monorepo** | npm workspaces |
| **Linting** | ESLint + Prettier |
| **Testing** | Vitest + Testing Library |
| **E2E** | Playwright (V1.1) |
| **CI/CD** | GitHub Actions |
| **Versionado** | Git + GitHub |

---

## 9. Experiencia de Usuario (UX/UI)

### 9.1 Principios de Diseño

1. **Claridad sobre Complejidad** — Comunicación directa, sin jerga innecesaria
2. **Guía Progresiva** — Descubrimiento → Comprensión → Acción
3. **Interactividad Útil** — Cada interacción aporta valor (test, filtros, copiar)
4. **Accesibilidad First** — No es una característica, es un requisito base
5. **Performance como UX** — Sitio rápido = mejor experiencia

### 9.2 Design System (Tokens)

#### Colores

```css
/* Primary */
--primary-600: #1F5AF6;  /* Botones, links, estados activos */
--primary-100: #E8EFFD;  /* Fondos suaves, hover states */

/* Neutral */
--neutral-900: #0A1633;  /* Texto principal */
--neutral-600: #5B6472;  /* Texto secundario */
--neutral-200: #E3E8F0;  /* Bordes, separadores */
--neutral-100: #F7F9FB;  /* Fondos sutiles */

/* Accent */
--accent-orange: #FF7A45;  /* CTAs clave, urgencia */
--accent-green: #10B981;   /* Éxito, confirmación */
--accent-red: #EF4444;     /* Error, alerta */
--accent-yellow: #F59E0B;  /* Warning, precaución */
```

#### Tipografía

```css
/* Familia */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Tamaños */
--text-xs: 12px;   /* Meta info, tags */
--text-sm: 14px;   /* Secundario, labels */
--text-base: 16px; /* Cuerpo principal */
--text-lg: 18px;   /* Destacados, intro */
--text-xl: 24px;   /* H3, subtítulos */
--text-2xl: 32px;  /* H2, secciones */
--text-3xl: 40px;  /* H1, hero */

/* Line Height */
--leading-tight: 1.25;   /* Headings */
--leading-normal: 1.45;  /* Párrafos */
--leading-relaxed: 1.6;  /* Texto largo */

/* Peso */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

#### Espaciado

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

#### Bordes y Sombras

```css
/* Radius */
--radius-sm: 8px;
--radius-base: 12px;
--radius-lg: 16px;
--radius-full: 9999px;

/* Sombras */
--shadow-sm: 0 1px 2px rgba(10, 22, 51, 0.05);
--shadow-base: 0 2px 8px rgba(10, 22, 51, 0.08);
--shadow-md: 0 4px 16px rgba(10, 22, 51, 0.12);
--shadow-lg: 0 8px 24px rgba(10, 22, 51, 0.16);
```

#### Animaciones

```css
/* Duración */
--duration-fast: 160ms;
--duration-base: 200ms;
--duration-slow: 300ms;

/* Easing */
--ease: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

### 9.3 Componentes UI (Librería)

#### Button

**Variantes:**
- `primary` — Fondo Primary-600, texto blanco
- `secondary` — Borde Primary-600, texto Primary-600, fondo transparente
- `tertiary` — Solo texto Primary-600, sin borde

**Tamaños:**
- `sm` — Altura 36px, padding 12/20px, texto 14px
- `md` — Altura 44px, padding 16/24px, texto 16px
- `lg` — Altura 52px, padding 18/32px, texto 18px

**Estados:**
- Hover: opacidad 90%, sombra-sm
- Focus: outline 2px Primary-600, offset 2px
- Active: scale 98%
- Disabled: opacidad 50%, cursor not-allowed

#### Card

**Variantes:**
- `Card.Base` — Container genérico con padding y sombra
- `Card.Pilar` — Icono, título, descripción, link "Ver más"
- `Card.Case` — Imagen, meta (industria/pilar), título, extracto
- `Card.Resource` — Tipo, nivel, duración, título, CTA

**Estructura:**
```tsx
<Card>
  <Card.Image />
  <Card.Header>
    <Card.Meta />
    <Card.Title />
  </Card.Header>
  <Card.Body />
  <Card.Footer>
    <Card.Action />
  </Card.Footer>
</Card>
```

#### Tabs

**Uso:** Navegación entre contenidos relacionados (ej: roles, pestañas de caso)

**Accesibilidad:**
- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- `aria-selected="true|false"`
- Navegación con flechas ←→
- `aria-controls` y `aria-labelledby`

#### Accordion

**Uso:** Contenido expandible (gobernanza, rituales AI Buddy)

**Accesibilidad:**
- `<button>` en header
- `aria-expanded="true|false"`
- `aria-controls`
- Icono chevron rotación 180deg

#### Modal / Dialog

**Uso:** Casos de éxito, configuración de cookies

**Accesibilidad:**
- `role="dialog"`, `aria-modal="true"`
- Foco inicial en primer elemento interactivo
- Trap de foco dentro del modal
- Cerrar con Escape
- Overlay con aria-label="Cerrar"

#### Form Controls

**Input, Textarea, Select:**
- Label siempre visible (no placeholder como label)
- Estados: default, focus, error, disabled
- Mensajes de error específicos debajo del campo
- `aria-describedby` para errores
- `aria-required="true"` en campos obligatorios

**Checkbox, Radio:**
- Target size ≥ 24×24 CSS px (recomendado 44×44 pt)
- Estados visuales claros
- Label clickeable

### 9.4 Concepto Visual: "Ecos de Liderazgo"

**Elementos visuales clave:**
1. **Ondas SVG** — Separadores entre secciones, hero background
2. **Grid Modular** — Estructura ordenada, alineación consistente
3. **Blancos Generosos** — Espacio para respirar, no saturación
4. **Ilustraciones Abstractas** — Humano-IA sin clichés (cerebros/robots)
5. **Geometría Limpia** — Formas simples, círculos, líneas

**Restricciones:**
- ❌ No cerebros con circuitos
- ❌ No robots humanoides
- ❌ No "matrix" de código verde
- ❌ No exceso de gradientes iridiscentes

**Sí:**
- ✅ Ondas concéntricas
- ✅ Conexiones de nodos abstractos
- ✅ Formas orgánicas + geometría
- ✅ Ilustraciones de equipos colaborando

---

## 10. Flujos Críticos y Funnels

### 10.1 Flujo 1: Ruta de Valor (Home → Demo)

```
┌─────────┐    ┌──────────┐    ┌──────┐    ┌─────────┐    ┌──────────┐
│  Home   │───▶│ Pilares  │───▶│ Caso │───▶│ Caso    │───▶│ Agendar  │
│  Hero   │    │  Cards   │    │ Grid │    │ Modal   │    │  Demo    │
└─────────┘    └──────────┘    └──────┘    └─────────┘    └──────────┘
    │                                              │
    └──────────────────────────────────────────────┘
              CTA directo "Evaluar madurez"
```

**Eventos:**
1. `page_view` (source: organic/paid/direct)
2. `hero_cta_click` (cta_type: test | cases)
3. `pillar_card_click` (pillar: 1|2|3)
4. `case_filter_apply` (filters: {...})
5. `case_view` (case_id, industry, pillar)
6. `case_modal_tab_change` (tab: problem|solution|metrics|lessons)
7. `request_demo_click` (source: modal|hero|sticky)
8. `demo_booked` (date, time, source)

**Objetivo conversión:** ≥ 8% (Home view → Demo booked)

---

### 10.2 Flujo 2: Test de Madurez (Evaluación → Acción)

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────┐
│ Landing │───▶│ Pregunta │───▶│ Pregunta │───▶│  Resultado  │───▶│ Recursos │
│  Test   │    │   1-3    │    │   4-7    │    │ + Segmento  │    │    o     │
└─────────┘    └──────────┘    └──────────┘    └─────────────┘    │  Demo    │
                                                       │            └──────────┘
                                                       ▼
                                                ┌──────────────┐
                                                │ Email Opt-in │
                                                │  (opcional)  │
                                                └──────────────┘
```

**Eventos:**
1. `maturity_start` (source: hero|menu|sticky)
2. `maturity_question_answered` (question_id, answer)
3. `maturity_complete` (segment, score, duration_seconds)
4. `segment_assigned` (segment: initial|active|scalable)
5. `recommendation_click` (pillar, resource_id)
6. `maturity_result_email` (opt_in: true|false)

**Objetivo conversión:**
- Inicio → Completado: ≥ 45%
- Completado → Acción (demo/recurso): ≥ 25%

---

### 10.3 Flujo 3: Exploración de Recursos (Discovery → Download)

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Home   │───▶│ Recursos │───▶│ Recurso  │───▶│ Descargar│
│ Academy │    │  + Tags  │    │ Detalle  │    │ o Copiar │
└─────────┘    └──────────┘    └──────────┘    └──────────┘
                      │
                      ▼
               ┌──────────────┐
               │   Biblioteca │
               │   de Prompts │
               └──────────────┘
                      │
                      ▼
               ┌──────────────┐
               │ Copiar Prompt│
               └──────────────┘
```

**Eventos:**
1. `resource_landing` (source: home|menu|test_result)
2. `resource_filter_applied` (filters: type|level|pillar)
3. `resource_search` (query)
4. `resource_view` (resource_id, type)
5. `resource_download` (resource_id, type, format)
6. `prompt_copy` (prompt_id, area)

**Objetivo:**
- ≥ 200 descargas/mes
- ≥ 500 copias de prompts/mes

---

## 11. Analítica y Medición

### 11.1 Herramientas

| **Herramienta** | **Uso** | **Prioridad** |
|-----------------|---------|---------------|
| **PostHog** o **Plausible** | Analítica principal, eventos, funnels | Alta |
| **Google Search Console** | SEO, indexación, queries | Media |
| **Hotjar** o **Microsoft Clarity** | Heatmaps, session recordings | Media (V1.1) |
| **Sentry** | Error tracking, performance monitoring | Alta |
| **Vercel Analytics** | Core Web Vitals, real user monitoring | Alta |

### 11.2 Eventos Estándar (Taxonomía)

#### Navegación
- `page_view` (path, referrer, source)
- `section_view` (section_name, scroll_depth)
- `link_click` (destination, link_text, external: bool)

#### Hero & CTAs
- `hero_cta_click` (cta_type: test|cases, position: hero|sticky)
- `pillar_card_click` (pillar: 1|2|3, source: home|menu)

#### Test de Madurez
- `maturity_start` (source)
- `maturity_question_answered` (question_id, answer, time_spent)
- `maturity_complete` (segment, score, total_time)
- `segment_assigned` (segment)
- `recommendation_click` (pillar, resource_id)
- `maturity_result_email` (opt_in)

#### Casos
- `case_filter_apply` (industry, process, pillar)
- `case_view` (case_id, industry, pillar)
- `case_modal_tab_change` (tab, case_id)
- `demo_video_play` (video_id, case_id, source)
- `request_demo_click` (source)

#### Recursos
- `resource_landing` (source)
- `resource_filter_applied` (type, level, pillar)
- `resource_search` (query, results_count)
- `resource_view` (resource_id, type)
- `resource_download` (resource_id, type, format)

#### Prompts
- `prompt_search` (query, results_count)
- `prompt_filter_applied` (area, tags)
- `prompt_view` (prompt_id, area)
- `prompt_copy` (prompt_id, area)

#### Formularios
- `form_start` (form_type, source)
- `form_field_focus` (field_name)
- `form_error` (field_name, error_type)
- `form_submit` (form_type, fields_count)
- `form_success` (form_type)

#### Demo/Agenda
- `demo_booked` (date, time, source, duration)
- `calendar_interaction` (action: open|close|date_select)

#### Legal/Cookies
- `cookie_banner_view`
- `cookie_consent_given` (consent_type: all|necessary|custom)
- `cookie_settings_changed` (preferences)
- `legal_page_view` (page_type)

### 11.3 Dashboards y Reportes

**Dashboard Ejecutivo (Semanal):**
- Visitas únicas y pageviews
- Conversión Hero CTA
- Tests completados y segmentación
- Demos agendadas
- Descargas de recursos
- Core Web Vitals promedio

**Dashboard de Producto (Diario):**
- Funnels de conversión
- Drop-off por paso (test, formulario)
- Heatmaps de CTAs
- Errores frecuentes
- Performance por página

---

## 12. Criterios de Aceptación (UAT)

### 12.1 Checklist Funcional

#### Navegación y Layout
- [ ] Todas las páginas accesibles desde menú principal
- [ ] Breadcrumbs visibles y funcionales en subpáginas
- [ ] Responsive 360px–1440px sin scroll horizontal
- [ ] Tab order lógico y completo por teclado
- [ ] Skip to content link funcional

#### Hero & CTAs
- [ ] CTAs visibles en viewport inicial (no scroll)
- [ ] CTA "Evaluar madurez" sticky en mobile (scroll > 300px)
- [ ] Tracking de clics funcional
- [ ] Enlaces a destinos correctos

#### Test de Madurez
- [ ] 7-9 preguntas con tipos variados (radio, slider, checkbox)
- [ ] Validación: no avanzar sin responder obligatorias
- [ ] Algoritmo de scoring: 3 perfiles diferentes dan 3 segmentos distintos
- [ ] Página resultado muestra:
  - [ ] Segmento asignado
  - [ ] 3 recomendaciones por pilar (9 total)
  - [ ] 3-5 recursos sugeridos con links
- [ ] Email opt-in funcional (envío confirmado)
- [ ] Persistencia local: reanudar test tras salir
- [ ] Tracking completo de eventos

#### Biblioteca de Prompts
- [ ] Mínimo 45 prompts (9×5 áreas)
- [ ] Búsqueda en tiempo real funciona
- [ ] Filtros multi-select activos
- [ ] Botón "Copiar" funciona en desktop y mobile
- [ ] Aviso legal visible
- [ ] Tracking de copias funcional

#### Casos de Éxito
- [ ] Filtros multi-select (industria/proceso/pilar)
- [ ] Mínimo 8 casos publicados
- [ ] Modal abre con 4 tabs navegables
- [ ] Tabs con contenido completo:
  - [ ] Problema (contexto y desafío)
  - [ ] Solución (enfoque y herramientas)
  - [ ] Métricas (KPIs antes/después)
  - [ ] Lecciones (aprendizajes clave)
- [ ] CTA "Solicitar demo" funcional en modal
- [ ] Videos con controles accesibles, autoplay OFF
- [ ] Tracking de vistas y filtros funcional

#### Contacto y Agenda
- [ ] Formulario con 8 campos y validaciones:
  - [ ] Email formato válido
  - [ ] Campos requeridos marcados
  - [ ] Checkbox consentimiento obligatorio
- [ ] Estados visuales: loading, éxito, error
- [ ] Mensaje de éxito con CTA a agenda
- [ ] Agenda embebida carga correctamente
- [ ] Selección fecha/hora funciona
- [ ] Confirmación por email recibida
- [ ] Tracking de envío y booking funcional

#### Legal y Privacidad
- [ ] Aviso de Privacidad conforme a LFPDPPP:
  - [ ] Identidad del responsable
  - [ ] Datos recabados y finalidades
  - [ ] Derechos ARCO explicados
  - [ ] Mecanismo de revocación
- [ ] Términos y Condiciones completos
- [ ] Política de Cookies con tipos y propósitos
- [ ] Banner de cookies:
  - [ ] Visible en primera visita
  - [ ] Botones funcionales: Aceptar / Configurar / Rechazar
  - [ ] Preferencias persisten (no reaparece)
- [ ] Enlaces legales en footer visibles

### 12.2 Checklist Accesibilidad (WCAG 2.2 AA)

#### Perceptible
- [ ] Contraste texto/fondo ≥ 4.5:1 (verificado con herramienta)
- [ ] Contraste elementos UI ≥ 3:1
- [ ] Todas las imágenes tienen alt text descriptivo
- [ ] Videos tienen controles y autoplay desactivado
- [ ] Texto redimensionable hasta 200% sin pérdida de contenido

#### Operable
- [ ] Toda funcionalidad accesible por teclado
- [ ] Tab order lógico en todas las páginas
- [ ] Foco visible 2px en todos los controles interactivos
- [ ] Target size ≥ 24×24 CSS px (verificado)
- [ ] Recomendación: botones ≥ 44×44 pt en móvil
- [ ] No trampas de teclado (puede salir de cualquier elemento)
- [ ] Animaciones respetan `prefers-reduced-motion`

#### Comprensible
- [ ] Atributo `lang="es"` en `<html>`
- [ ] Labels visibles en todos los form controls
- [ ] Mensajes de error específicos y claros
- [ ] Navegación consistente en todas las páginas
- [ ] Instrucciones claras antes de formularios/test

#### Robusto
- [ ] HTML válido (W3C Validator)
- [ ] ARIA roles correctos en componentes complejos:
  - [ ] Tabs: `role="tablist"`, `aria-selected`
  - [ ] Accordion: `aria-expanded`, `aria-controls`
  - [ ] Modal: `role="dialog"`, `aria-modal="true"`
- [ ] Lectores de pantalla funcionan correctamente:
  - [ ] NVDA (Windows)
  - [ ] VoiceOver (macOS/iOS)

### 12.3 Checklist Performance

- [ ] LCP ≤ 2.5 s (p75 móvil) en Inicio
- [ ] CLS ≤ 0.10 en todas las páginas
- [ ] INP ≤ 200 ms en interacciones clave
- [ ] Lighthouse Performance ≥ 85/100
- [ ] Lighthouse Accessibility ≥ 95/100
- [ ] Lighthouse SEO ≥ 90/100
- [ ] Bundle size ≤ 200 KB (gzipped)
- [ ] Todas las imágenes optimizadas (WebP/AVIF)
- [ ] Lazy loading en imágenes y videos
- [ ] Fonts con `font-display: swap`

### 12.4 Checklist SEO

- [ ] Titles únicos en todas las páginas (50-60 caracteres)
- [ ] Meta descriptions únicas (150-160 caracteres)
- [ ] Un solo H1 por página con keyword principal
- [ ] Jerarquía H2-H6 lógica
- [ ] URLs semánticas (lowercase, guiones)
- [ ] Sitemap.xml generado y accesible
- [ ] Robots.txt configurado
- [ ] Schema.org Organization implementado
- [ ] Open Graph tags para redes sociales
- [ ] Canonical URLs configuradas

### 12.5 Checklist Analítica

- [ ] PostHog/Plausible integrado correctamente
- [ ] Eventos personalizados disparando correctamente (spot check 5 eventos)
- [ ] Funnels configurados:
  - [ ] Home → Test → Completado
  - [ ] Home → Casos → Demo
  - [ ] Home → Recursos → Descarga
- [ ] Banner de cookies respeta consentimiento (no tracking sin aceptar)
- [ ] Dashboard ejecutivo accesible
- [ ] Sentry capturando errores

---

## 13. Plan de Implementación

### 13.1 Fases y Entregables

| **Fase** | **Duración** | **Entregables** | **Responsable** |
|----------|--------------|-----------------|-----------------|
| **Fase 0: Preparación** | 3 días | - Repositorio configurado<br>- Stack instalado<br>- Design tokens implementados<br>- Componentes base | Frontend Lead |
| **Fase 1: Páginas Core** | 8 días | - Inicio (completo)<br>- Sobre<br>- Páginas de Pilares (estructura)<br>- Legal/Privacidad | Frontend Team |
| **Fase 2: Test de Madurez** | 8 días | - UI completa<br>- Lógica de scoring<br>- Página de resultado<br>- Email opt-in | Full-stack |
| **Fase 3: Casos y Prompts** | 7 días | - Casos con filtros<br>- Modal detallado<br>- Biblioteca de prompts<br>- Sistema de copiar | Frontend Team |
| **Fase 4: Formularios y Agenda** | 5 días | - Formulario contacto<br>- Integracion Calendly<br>- Emails transaccionales | Full-stack |
| **Fase 5: Contenido** | 5 días | - Copy final<br>- 8 casos documentados<br>- 45 prompts<br>- Recursos (3-5 guías) | Content + PM |
| **Fase 6: Integraciones** | 4 días | - Analítica<br>- Sentry<br>- Email provider<br>- Cloudinary | Backend Lead |
| **Fase 7: QA/UAT** | 5 días | - Testing manual<br>- Accesibilidad audit<br>- Performance optimization<br>- Bug fixes | QA + Team |
| **Fase 8: Pre-Launch** | 3 días | - Deploy a staging<br>- UAT con stakeholders<br>- Revisión legal<br>- Ajustes finales | PM + Team |
| **Go-Live** | 1 día | - Deploy a producción<br>- Verificación post-deploy<br>- Monitoreo 24h | DevOps + PM |
| **Post-Launch** | 7 días | - Monitoreo KPIs<br>- Hot-fixes si necesario<br>- Recolección feedback<br>- Roadmap V1.1 | PM + Team |

**Duración total:** ~48 días (~10 semanas)

### 13.2 Hitos Clave

| **Hito** | **Fecha Objetivo** | **Criterio de Éxito** |
|----------|--------------------|-----------------------|
| **M1: Design System Ready** | Semana 1 | Componentes base + tokens documentados |
| **M2: Páginas Core Live** | Semana 3 | Home, Sobre, Pilares navegables en staging |
| **M3: Test de Madurez Funcional** | Semana 5 | Test completo + resultado + tracking |
| **M4: Contenido Completo** | Semana 7 | 100% copy + 8 casos + 45 prompts + guías |
| **M5: UAT Aprobado** | Semana 9 | Todos los criterios de aceptación ✓ |
| **M6: Go-Live** | Semana 10 | Sitio en producción + analítica activa |

### 13.3 Equipo y Roles

| **Rol** | **Responsabilidad** | **Dedicación** |
|---------|---------------------|----------------|
| **Product Owner** | Visión, priorización, stakeholders | 40% |
| **Frontend Lead** | Arquitectura, review, componentes core | 100% |
| **Frontend Dev 1** | Páginas, componentes, integración | 100% |
| **Frontend Dev 2** | Test madurez, formularios, prompts | 100% (semanas 3-8) |
| **Backend Dev** | API, base de datos, integraciones | 60% |
| **Content Writer** | Copy, casos, recursos, SEO | 50% |
| **UX/UI Designer** | Mockups, design system, iteraciones | 40% (semanas 1-4) |
| **QA Engineer** | Testing manual, accesibilidad, UAT | 100% (semanas 8-10) |
| **DevOps** | Infra, deploy, CI/CD, monitoreo | 20% |
| **Legal Advisor** | Revisión LFPDPPP, privacidad, términos | 10% |

---

## 14. Gestión de Riesgos

| **Riesgo** | **Probabilidad** | **Impacto** | **Mitigación** | **Responsable** |
|------------|------------------|-------------|----------------|-----------------|
| **R1: Contenido legal desactualizado** | Media | Alto | - Revisión periódica trimestral<br>- Fuente oficial DOF/INAI<br>- Alerta de cambios normativos | Legal Advisor |
| **R2: Baja conversión Test de Madurez** | Media | Alto | - Test A/B longitud (7 vs 9 preguntas)<br>- Mejorar microcopy<br>- Sticky CTA<br>- Indicador de progreso claro | PM + UX |
| **R3: Bajo rendimiento móvil** | Media | Medio | - Optimización agresiva de imágenes<br>- Code splitting<br>- Lazy loading<br>- Monitoreo Lighthouse continuo | Frontend Lead |
| **R4: Problemas integración Calendly** | Baja | Medio | - Documentación oficial<br>- Sandbox testing<br>- Fallback a formulario manual | Backend Dev |
| **R5: Retraso en contenido de casos** | Alta | Medio | - Deadline interno –5 días<br>- Templates para casos<br>- Seeding con 3 casos mínimo | Content + PM |
| **R6: Incumplimiento accesibilidad** | Baja | Alto | - Auditoría continua (Lighthouse, axe)<br>- Testing con usuarios reales<br>- Checklist WCAG 2.2 AA en cada PR | QA + Frontend |
| **R7: Sobrecarga servidor (spike tráfico)** | Baja | Medio | - CDN para assets estáticos<br>- Rate limiting<br>- Escalado automático (Vercel) | DevOps |
| **R8: Incidentes de seguridad (data breach)** | Muy Baja | Crítico | - Security headers<br>- Minimización de datos<br>- Encriptación en tránsito/reposo<br>- Plan de respuesta a incidentes | Backend + DevOps |
| **R9: Budget overrun por integraciones** | Media | Bajo | - Evaluar alternativas open-source<br>- Limitar integraciones a esenciales V1<br>- Monitoreo de costos mensual | PM |
| **R10: Cambios de alcance (scope creep)** | Alta | Medio | - PRD como contrato<br>- Change request process<br>- Backlog V2 para nuevas ideas | PM |

---

## 15. Dependencias

### 15.1 Internas

| **Dependencia** | **Estado** | **Fecha Necesaria** | **Bloqueante** |
|-----------------|------------|---------------------|----------------|
| Copy final todas las páginas | En progreso | Semana 5 | Sí (contenido) |
| 8 casos documentados con métricas | Pendiente | Semana 6 | Sí (casos) |
| 45 prompts por área | Pendiente | Semana 6 | Sí (prompts) |
| Guías descargables (LFPDPPP, política IA) | Pendiente | Semana 7 | No (placeholder) |
| Logo e identidad visual final | Completo | - | - |
| Imágenes y videos de casos | En progreso | Semana 7 | No (placeholders) |

### 15.2 Externas

| **Dependencia** | **Proveedor** | **Estado** | **Riesgo** |
|-----------------|---------------|------------|------------|
| Cuenta Calendly | Calendly | Requerido | Bajo (signup simple) |
| Dominio y certificado SSL | Proveedor dominio | Requerido | Bajo |
| Cuenta Cloudinary | Cloudinary | Requerido | Bajo (free tier) |
| PostHog o Plausible account | PostHog/Plausible | Requerido | Bajo |
| SendGrid o Resend account | SendGrid/Resend | Requerido | Bajo (free tier) |
| Vercel deployment | Vercel | Requerido | Muy bajo (cuenta existente) |

---

## 16. Anexos

### 16.1 Glosario

| **Término** | **Definición** |
|-------------|----------------|
| **ARCO** | Derechos de Acceso, Rectificación, Cancelación y Oposición (datos personales) |
| **CLS** | Cumulative Layout Shift - métrica de estabilidad visual |
| **INP** | Interaction to Next Paint - métrica de interactividad |
| **LCP** | Largest Contentful Paint - métrica de carga |
| **LFPDPPP** | Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México) |
| **ROI** | Return on Investment - retorno de inversión |
| **SSR** | Server-Side Rendering - renderizado del lado del servidor |
| **UAT** | User Acceptance Testing - pruebas de aceptación del usuario |
| **WCAG** | Web Content Accessibility Guidelines - estándares de accesibilidad web |

### 16.2 Matriz de Trazabilidad

| **ID Requisito** | **Tipo** | **Evento(s) Analítica** | **Criterio UAT** | **Prioridad** |
|------------------|----------|-------------------------|------------------|---------------|
| FR-1 | Navegación | `link_click`, `page_view` | Tab order completo | Alta |
| FR-2 | Hero/CTAs | `hero_cta_click` | CTAs visibles y funcionales | Alta |
| FR-3 | Test Madurez | `maturity_*` | Segmenta y recomienda | Alta |
| FR-4 | Prompts | `prompt_copy`, `prompt_search` | Copiar funciona mobile/desktop | Alta |
| FR-5 | Casos | `case_view`, `case_filter_apply` | Modal 4 tabs + filtros | Alta |
| FR-6 | Contacto | `form_submit`, `demo_booked` | Form valida + agenda confirma | Alta |
| FR-7 | Legal | `cookie_consent_given`, `legal_page_view` | Banner funciona + LFPDPPP completo | Alta |
| FR-8 | Recursos | `resource_download`, `resource_view` | Filtros + descargas funcionan | Media |
| NFR-1 | Accesibilidad | - | Lighthouse ≥95, WCAG 2.2 AA | Crítica |
| NFR-2 | Performance | - | LCP ≤2.5s, CLS ≤0.10 | Alta |
| NFR-3 | Seguridad | - | HTTPS, headers, validaciones | Crítica |
| NFR-4 | SEO | - | Lighthouse SEO ≥90 | Media |

### 16.3 User Stories Completas (Ejemplos)

#### US-1.1: Ver propuesta de valor en Hero
```
Como Director de Transformación Digital
Quiero ver inmediatamente la propuesta de valor de Pulse Hub
Para decidir si quiero explorar más

Criterios de Aceptación:
- Hero visible sin scroll (above the fold)
- H1 claro: "IA que impulsa liderazgo humano"
- Subtítulo explica los Tres Pilares
- Dos CTAs diferenciados visualmente
- Ondas de fondo sin afectar legibilidad
- Tiempo de carga hero < 1.5s

Definición de Hecho:
- Aprobado por stakeholders
- Testing A/B configurado (opcional V1.1)
- Tracking activo
- Responsive 360px+
```

#### US-2.3: Recibir recomendaciones personalizadas
```
Como Responsable de Operaciones que completó el test
Quiero ver recomendaciones específicas para mi nivel de madurez
Para tener un plan de acción claro

Criterios de Aceptación:
- Página resultado muestra segmento asignado con descripción
- 3 recomendaciones concretas por cada pilar (9 total)
- Cada recomendación incluye:
  * Título accionable
  * Descripción breve (2-3 líneas)
  * Link a recurso relacionado o pilar
- Opción de imprimir o enviar por email
- CTA "Agendar demo para profundizar"

Definición de Hecho:
- 3 perfiles de prueba dan recomendaciones distintas
- Content review aprobado
- Tracking de clics en recomendaciones activo
```

### 16.4 Estimaciones Detalladas (Fibonacci)

| **Feature** | **Puntos** | **Justificación** |
|-------------|------------|-------------------|
| Design System (tokens + componentes base) | 13 | Fundacional, afecta todo |
| Página Inicio (completa) | 8 | Hero + secciones + CTAs |
| Página Sobre | 5 | Más estática, menos interacción |
| Páginas Pilares (3) | 13 | Tabs, contenido dinámico, estructura común |
| Test de Madurez | 21 | Lógica compleja, scoring, persistencia, resultado |
| Biblioteca de Prompts | 8 | Búsqueda, filtros, copiar |
| Casos de Éxito (grid + modal) | 13 | Filtros multi-select, modal tabs, videos |
| Formulario Contacto + Calendly | 8 | Validaciones, integración externa |
| Legal (3 páginas + banner cookies) | 5 | Contenido extenso pero estructura simple |
| Recursos / AI Academy | 5 | Similar a prompts, menos complejidad |
| Analítica (integración + eventos) | 8 | Configuración, testing, documentación |
| Testing & QA | 13 | Manual + accesibilidad + performance |
| **TOTAL** | **118 puntos** | ~10-12 semanas (2 devs frontend + 1 backend) |

### 16.5 Recursos y Referencias

#### Normativas
- [LFPDPPP - Texto completo](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- [INAI - Derechos ARCO](https://home.inai.org.mx/)

#### Accesibilidad
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Deque University - ARIA Patterns](https://dequeuniversity.com/library/)

#### Performance
- [Core Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)

#### Diseño
- [iOS Human Interface Guidelines - Touch Targets](https://developer.apple.com/design/human-interface-guidelines/inputs)
- [Material Design - Accessibility](https://m3.material.io/foundations/accessible-design/overview)

#### Product Management
- [Atlassian - How to Write a PRD](https://www.atlassian.com/agile/product-management/requirements)
- [ProductPlan - PRD Templates](https://www.productplan.com/glossary/product-requirements-document/)

---

## 17. Aprobaciones

| **Rol** | **Nombre** | **Firma** | **Fecha** |
|---------|-----------|-----------|-----------|
| **Product Owner** | Fernando Suárez | _______________ | ___/___/2025 |
| **Tech Lead** | _______________ | _______________ | ___/___/2025 |
| **Legal** | _______________ | _______________ | ___/___/2025 |
| **Dirección** | _______________ | _______________ | ___/___/2025 |

---

## Historial de Cambios

| **Versión** | **Fecha** | **Autor** | **Cambios** |
|-------------|-----------|-----------|-------------|
| 1.0 | 11/10/2025 | Fernando Suárez | Versión inicial completa |
| | | | |

---

**Documento confidencial — Pulse Hub / Ecos de Liderazgo**  
**Válido desde:** 11 de octubre, 2025  
**Próxima revisión:** Diciembre 2025 (post-launch)
