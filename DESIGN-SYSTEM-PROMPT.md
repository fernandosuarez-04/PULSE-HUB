# Prompt Maestro: Pulse Hub Design System

## Objetivo
Diseña la web de Pulse Hub (ecosistema humano-tecnológico para adopción de IA) con enfoque B2B, mobile-first, WCAG 2.2 AA, y orientada a conversión. Entrega prototipo navegable con plantillas por página y design system (variables).

## Identidad de Marca

### Valores
- Liderazgo humano
- Innovación ética
- Eficiencia tecnológica

### Concepto Visual
**"Ecos de Liderazgo"** → ondas/expansión/comunidad/diálogo/movimiento.

**Estilo:** geometría limpia, grid modular, blancos generosos, ilustración abstracta humano-IA (sin clichés).

## Paleta de Colores (Tokens)

```
Primary-600:  #1F5AF6  (botón/link)
Primary-100:  #E8EFFD  (fondos suaves)

Neutral-900:  #0A1633  (texto)
Neutral-600:  #5B6472  (secundario)
Neutral-200:  #E3E8F0  (borde)

Accent-Orange: #FF7A45  (llamados clave)
Accent-Green:  #10B981  (éxito)
```

**Radius base:** 12px  
**Sombra suave:** `0 2px 8px rgba(10,22,51,.08)`

## Tipografía

**Fuente:** Sans moderna (Inter/IBM Plex Sans)

**Escala:** 12/14/16/18/24/32/40
- Line-height: 1.45
- Headings: 1.25

## Accesibilidad

- Contraste ≥ 4.5:1
- Foco visible 2px en controles
- Navegación por teclado
- Targets ≥ 44×44
- `prefers-reduced-motion`

## Estructura de Sitio (Páginas y Secciones)

### 1. Inicio

#### Hero con ondas
- **Título:** "IA que impulsa liderazgo humano"
- **Subtítulo:** "Adopta IA con ética, foco en ROI y hábitos diarios que elevan a tus equipos."
- **CTAs:** 
  - "Evaluar mi madurez" (primario)
  - "Ver casos" (secundario)

#### Sección Tres Pilares (3 cards comparables)
- **Pilar 1:** IA para Todos (capacitación por rol, ética y seguridad)
- **Pilar 2:** IA en el Día a Día (prompts, AI Buddy, rituales)
- **Pilar 3:** Automatización de Alto Impacto (priorización impacto-esfuerzo, humano-en-el-bucle)

#### Métricas (tiles)
- "+38% eficiencia onboarding"
- "–20% tiempo ciclo"
- "ROI < 12 meses"

#### "Cómo funciona" (Step 1-2-3)
Descubrir → Diseñar → Desplegar

#### Otros elementos
- Testimonios (slider)
- AI Academy (3 recursos)
- CTA final: "Agendar demo"

### 2. Sobre

- Manifiesto/valores
- Enfoque ético (privacidad por diseño, transparencia)
- Equipo (cards)
- Metodología "Ecos" (diagrama ondas)

### 3. Pilar 1 (Capacitación)

- Tabs por rol (Dirección/Mandos/Operativos)
- Rutas de aprendizaje
- KPIs formación
- Mini-caso

### 4. Pilar 2 (Adopción diaria)

- AI Buddy & rituales (acordeón)
- Biblioteca de prompts por área con "copiar"
- Aviso de cumplimiento

### 5. Pilar 3 (Automatización)

- Matriz impacto-esfuerzo (tabla/kanban)
- Casos tipo (cards con diagrama de flujo)
- Gobernanza (acordeón)
- KPIs/ROI

### 6. Casos de Éxito

- Filtros por industria/proceso/pilar
- Cards → modal con:
  - Problema
  - Solución
  - Métricas
  - Lecciones
- Sección "Demos" (videos)

### 7. Recursos / AI Academy

- Cursos (cards con nivel/duración)
- Guías descargables (LFPDPPP y política de IA)
- Biblioteca de prompts con tags

### 8. Contacto / Alianzas

- Formulario 6–8 campos + agenda integrada
- Bloque Partners

## Componentes Mínimos (Librería Reutilizable)

- `Btn` (prim/sec/ter; sm/md/lg; estados)
- `Card.Pilar`
- `Tabs.Roles` (aria-selected)
- `Tile.Metric`
- `Accordion`
- `Stepper.Test`
- `Notice/Alert`
- `Table+Chips` (filtros)
- `Testimonial`
- `Banner`

### Interacciones
- Hover: 160–200ms ease-in-out
- Ondas como separadores SVG (hero + dividers superior/inferior)

### Estados vacíos/errores
Mensajes claros y acción siguiente (ej.: "Aún no hay recursos guardados. Explora la AI Academy.")

## SEO On-Page (Ejemplos)

```html
<title>Pulse Hub: Adopción de IA ética y efectiva</title>
```

**Meta description general:** "Tres pilares para capacitar, adoptar y automatizar con ROI medible y cumplimiento."

## Restricciones

- ❌ No usar clichés visuales de IA (cerebros/robocaras)
- ⚡ Cuidar performance (imágenes lazy, SVG optimizados)
- 🎯 Mantener la narrativa de Tres Pilares en navegación y CTAs

## Entregables Esperados en Lovable

1. Proyecto con páginas arriba, navegación y estilos variables (tokens)
2. Prototipo navegable + seeding de contenido real (textos de ejemplo incluidos)
3. Sección de configuración para colores/tipografía/espaciado (design system)
4. Anexar placeholders para integrar test de madurez y Calendly

---

## Prompts Cortos de Iteración

### 1. Refinar hero y ritmo visual
```
Ajusta el Hero con ondas más suaves (menos amplitud), aumenta contraste del H1, 
y aplica sombra sm a las Cards de Pilares. Mantén el layout mobile-first y 
revisa spacing 24/32 px entre secciones.
```

### 2. Mejorar accesibilidad
```
Aumenta tamaño de texto mínimo a 16 px en mobile, agrega focus ring de 2 px 
en botones, tabs, links; valida contraste AA en acentos naranja/verde.
```

### 3. Biblioteca de Prompts (Pilar 2)
```
Genera 9 prompts por área (Operaciones, Ventas, Finanzas, RR.HH., TI), 
cada uno con botón "Copiar" y tag; añade nota de cumplimiento para datos sensibles.
```

### 4. Matriz impacto-esfuerzo (Pilar 3)
```
Implementa tabla con filtros por área y chips de Impacto/Esfuerzo (Alto/Medio/Bajo). 
Añade 4 "casos tipo" con diagrama de flujo simple.
```

### 5. Caso modal + demo
```
En los "Casos de Éxito", crea modal con pestañas: Problema, Solución, Métricas, 
Lecciones. Inserta botón "Solicitar demo".
```

### 6. CTA y conversión
```
Haz sticky el botón "Evaluar mi madurez" en mobile; añade CTA final 
"Agendar demo" con variante de color acento.
```

---

## Consejos Rápidos para Lovable

1. Lovable genera UI y plantillas por prompt; pide librería de componentes y variables para que el diseño sea consistente y editable.

2. Si necesitas iterar, re-envía solo el bloque a mejorar (ej.: "Solo actualiza la sección Pilares manteniendo tokens y grid").

3. Para stakeholders, puedes publicar un prototipo navegable y compartir link.

---

## Referencias

Este documento sirve como guía maestra para el desarrollo del frontend de Pulse Hub. Mantén la coherencia con estos principios en todas las implementaciones de UI/UX.

