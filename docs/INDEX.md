# 📚 Índice de Documentación - Pulse Hub

Bienvenido a la documentación completa de Pulse Hub. Los documentos están organizados por categorías para facilitar la navegación.

## 📁 Estructura de Documentación

```
docs/
├── design/          # Diseño y sistema de diseño
├── product/         # Requisitos de producto
├── guides/          # Guías de inicio y configuración
└── reference/       # Documentación de referencia
```

---

## 🎨 Design / Diseño

Documentación sobre el sistema de diseño, identidad visual y decisiones de UX/UI.

### [`design/DESIGN-SYSTEM-PROMPT.md`](./design/DESIGN-SYSTEM-PROMPT.md)
**Prompt Maestro de Design System**
- Paleta de colores completa (Primary, Neutral, Accent)
- Tipografía y escalas (Inter, 12-40px)
- Tokens de diseño (espaciado, radius, sombras, animaciones)
- Concepto visual "Ecos de Liderazgo"
- Restricciones de diseño (no clichés de IA)
- Prompts cortos de iteración para Lovable

**Úsalo cuando:** Necesites consultar colores, tipografía o tokens del design system.

### [`design/DESIGN-DECISIONS.md`](./design/DESIGN-DECISIONS.md)
**Decisiones de Diseño Documentadas**
- 5 decisiones clave de la encuesta inicial:
  1. Iconos e Imágenes (Lucide + SVGs custom)
  2. Nivel de Animaciones (intermedias-avanzadas)
  3. Navegación (sticky)
  4. Estructura de Componentes (híbrido)
  5. Responsive Design (mobile-first optimizado)
- Implementación detallada de cada decisión
- Principios generales y notas para futuros desarrolladores

**Úsalo cuando:** Necesites entender por qué se tomaron ciertas decisiones de diseño o implementación.

---

## 📊 Product / Producto

Documentación de requisitos de producto, objetivos de negocio y roadmap.

### [`product/PRD-PULSE-HUB.md`](./product/PRD-PULSE-HUB.md)
**Product Requirements Document (Completo)**
- Resumen ejecutivo y descripción del producto
- Objetivos de negocio y KPIs (primeros 90 días)
- Audiencia y casos de uso (4 personas detalladas)
- Requisitos funcionales (FR-1 a FR-8)
- Requisitos no funcionales (accesibilidad, performance, SEO, seguridad)
- Stack tecnológico completo
- Experiencia de usuario (UX/UI)
- Flujos críticos y funnels
- Analítica y medición (taxonomía de eventos)
- Criterios de aceptación (UAT)
- Plan de implementación (10 semanas, 8 fases)
- Gestión de riesgos (10 riesgos identificados)
- Anexos (glosario, matriz de trazabilidad, user stories)

**Úsalo cuando:** Necesites entender requisitos funcionales, planificar sprints, o validar implementaciones contra criterios de aceptación.

---

## 🚀 Guides / Guías

Guías de inicio rápido, configuración y resolución de problemas.

### [`guides/GETTING_STARTED.md`](./guides/GETTING_STARTED.md)
**Guía de Inicio Completa**
- Instalación desde cero
- Configuración de entorno
- Primer arranque del proyecto

### [`guides/QUICK-START-VISUAL.md`](./guides/QUICK-START-VISUAL.md)
**Guía Visual de Inicio Rápido**
- Pasos ilustrados para comenzar
- Screenshots de configuración
- Troubleshooting visual

### [`guides/START.md`](./guides/START.md)
**Instrucciones de Arranque**
- Comandos básicos
- Scripts disponibles
- URLs de desarrollo

### [`guides/SOLUCION-RAPIDA.md`](./guides/SOLUCION-RAPIDA.md)
**Soluciones Rápidas a Problemas Comunes**
- Errores frecuentes y soluciones
- Tips de desarrollo
- Troubleshooting

### [`guides/DONDE-ABRIR.md`](./guides/DONDE-ABRIR.md)
**Dónde Abrir el Proyecto**
- Configuración de IDE
- Extensiones recomendadas
- Workspace settings

---

## 📖 Reference / Referencia

Documentación de referencia técnica, comandos y estado del proyecto.

### [`reference/COMMANDS.md`](./reference/COMMANDS.md)
**Comandos Útiles**
- Comandos npm del monorepo
- Scripts personalizados
- Atajos de desarrollo
- Comandos Git comunes

### [`reference/EXAMPLES.md`](./reference/EXAMPLES.md)
**Ejemplos de Código**
- Ejemplos de componentes
- Patrones de uso
- Snippets útiles

### [`reference/STATUS.md`](./reference/STATUS.md)
**Estado del Proyecto**
- Features completadas
- Work in progress
- Roadmap próximos sprints
- Issues conocidos

### [`reference/CONTACTO-PAGE.md`](./reference/CONTACTO-PAGE.md)
**Documentación Página de Contacto**
- Implementación completa de la página de contacto/agenda demo
- Formulario avanzado con validación en tiempo real
- Cards de acción y layout responsive
- Integración con el sistema de componentes
- Errores corregidos y optimizaciones

### [`reference/ARCHITECTURE.md`](./reference/ARCHITECTURE.md)
**Arquitectura del Proyecto (Screaming Architecture)**
- Explicación de Screaming Architecture
- Estructura Frontend y Backend
- Organización por features/dominio
- Reglas de dependencias
- Cómo agregar nuevas features
- Checklist de desarrollo

---

## 🗂️ Organización de Archivos

### Ubicación de Documentos por Tipo

| Tipo de Documento | Ubicación | Ejemplo |
|-------------------|-----------|---------|
| **Design System** | `docs/design/` | Tokens, paleta de colores, decisiones de diseño |
| **PRD / Product** | `docs/product/` | Requisitos, user stories, criterios de aceptación |
| **Guías de Usuario** | `docs/guides/` | Cómo empezar, configuración, troubleshooting |
| **Referencia Técnica** | `docs/reference/` | Comandos, API, ejemplos de código |
| **README Principal** | Raíz `/` | Visión general del proyecto |

### Convenciones de Nombres

- **Mayúsculas y guiones:** `NOMBRE-DEL-ARCHIVO.md`
- **Idioma español:** Para documentos internos y guías
- **Idioma inglés:** Para código y comentarios técnicos

---

## 🔍 Búsqueda Rápida

### Por Tema

- **Colores y estilos** → [`design/DESIGN-SYSTEM-PROMPT.md`](./design/DESIGN-SYSTEM-PROMPT.md)
- **Por qué se tomó X decisión** → [`design/DESIGN-DECISIONS.md`](./design/DESIGN-DECISIONS.md)
- **Requisitos funcionales** → [`product/PRD-PULSE-HUB.md`](./product/PRD-PULSE-HUB.md) (sección 6)
- **KPIs y métricas** → [`product/PRD-PULSE-HUB.md`](./product/PRD-PULSE-HUB.md) (sección 3)
- **Cómo empezar a desarrollar** → [`guides/GETTING_STARTED.md`](./guides/GETTING_STARTED.md)
- **Problema con npm install** → [`guides/SOLUCION-RAPIDA.md`](./guides/SOLUCION-RAPIDA.md)
- **Comandos útiles** → [`reference/COMMANDS.md`](./reference/COMMANDS.md)
- **Estado actual del proyecto** → [`reference/STATUS.md`](./reference/STATUS.md)
- **Documentación página de contacto** → [`reference/CONTACTO-PAGE.md`](./reference/CONTACTO-PAGE.md)
- **Dónde poner nueva feature** → [`reference/ARCHITECTURE.md`](./reference/ARCHITECTURE.md)
- **Organización de carpetas** → [`reference/ARCHITECTURE.md`](./reference/ARCHITECTURE.md)

### Por Audiencia

**Diseñadores:**
1. [`design/DESIGN-SYSTEM-PROMPT.md`](./design/DESIGN-SYSTEM-PROMPT.md) - Tokens y sistema
2. [`design/DESIGN-DECISIONS.md`](./design/DESIGN-DECISIONS.md) - Contexto de decisiones

**Product Managers:**
1. [`product/PRD-PULSE-HUB.md`](./product/PRD-PULSE-HUB.md) - Requisitos completos
2. [`reference/STATUS.md`](./reference/STATUS.md) - Estado actual

**Desarrolladores:**
1. [`guides/GETTING_STARTED.md`](./guides/GETTING_STARTED.md) - Setup inicial
2. [`reference/ARCHITECTURE.md`](./reference/ARCHITECTURE.md) - Arquitectura y organización
3. [`reference/COMMANDS.md`](./reference/COMMANDS.md) - Comandos diarios
4. [`design/DESIGN-SYSTEM-PROMPT.md`](./design/DESIGN-SYSTEM-PROMPT.md) - Tokens CSS
5. [`reference/EXAMPLES.md`](./reference/EXAMPLES.md) - Ejemplos de código
6. [`reference/CONTACTO-PAGE.md`](./reference/CONTACTO-PAGE.md) - Implementación página contacto

**Nuevos en el Proyecto:**
1. **README.md** (raíz) - Visión general
2. [`guides/GETTING_STARTED.md`](./guides/GETTING_STARTED.md) - Primer paso
3. [`guides/QUICK-START-VISUAL.md`](./guides/QUICK-START-VISUAL.md) - Guía visual
4. [`product/PRD-PULSE-HUB.md`](./product/PRD-PULSE-HUB.md) - Entender el producto

---

## 📝 Cómo Contribuir a la Documentación

### Agregar Nueva Documentación

1. Identifica la categoría apropiada (design/product/guides/reference)
2. Crea el archivo en la carpeta correspondiente
3. Usa el formato `NOMBRE-DESCRIPTIVO.md`
4. Actualiza este índice con el nuevo documento
5. Referencia desde el README.md principal si es relevante

### Actualizar Documentación Existente

1. Edita el archivo correspondiente
2. Actualiza la fecha de "última modificación" al final del documento
3. Si cambia la estructura, actualiza este índice

### Documentos que NO van en `/docs`

- `README.md` - Siempre en la raíz (convención GitHub/npm)
- `CHANGELOG.md` - En la raíz (versionado)
- `LICENSE` - En la raíz (legal)
- `CONTRIBUTING.md` - En la raíz (comunidad)

---

## 🔗 Links Útiles

- **README Principal:** [../README.md](../README.md)
- **Repositorio:** [GitHub - PULSE-HUB](https://github.com/tu-org/pulse-hub)
- **Frontend Local:** http://localhost:3000
- **Backend Local:** http://localhost:4000

---

**Última actualización:** 14 de Enero 2025  
**Mantenido por:** Equipo Ecos de Liderazgo

