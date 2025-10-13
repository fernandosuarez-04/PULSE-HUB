# Decisiones de Diseño - Pulse Hub

> **Documento de Referencia:** Este archivo contiene las decisiones de diseño tomadas durante el desarrollo inicial. Estas preferencias deben mantenerse consistentes en futuras implementaciones.

## 📅 Fecha de Decisión
**11 de Octubre, 2025**

## 🎯 Contexto

Durante el desarrollo de la homepage de Pulse Hub, se realizó una consulta estructurada para establecer las preferencias de diseño que guiarían el proyecto. Este documento captura esas decisiones para mantener coherencia en desarrollos futuros.

---

## ✅ Decisiones Tomadas

### 1. Contenido de Imágenes e Iconos

**Pregunta:** ¿Qué librería de iconos prefieres?

**Opciones:**
- a) Iconos de Lucide React (librería ya disponible en el stack)
- b) Crear SVGs personalizados para cada sección
- c) Combinación de ambos ✅

**Decisión Final:** **c) Combinación de ambos**

**Implementación:**
- **Lucide React** para iconos estándar de UI y navegación
  - Ejemplos: `Menu`, `X`, `ChevronLeft`, `ChevronRight`, `Mail`, `Linkedin`
  - Ventajas: Consistencia, tree-shakeable, mantenimiento mínimo
  
- **SVGs Personalizados** para elementos únicos de marca
  - Ejemplos: `WavesSVG` (ondas animadas del hero)
  - Ventajas: Control total del diseño, animaciones complejas, identidad única

**Ubicación en código:**
- Lucide: `import { IconName } from 'lucide-react'`
- SVGs custom: `apps/web/src/shared/components/WavesSVG/`

---

### 2. Nivel de Animaciones

**Pregunta:** ¿Qué nivel de animación deseas?

**Opciones:**
- a) Básicas: fade-in al hacer scroll, hover en botones/cards
- b) Intermedias: ondas animadas en hero, transiciones suaves entre secciones ✅
- c) Avanzadas: parallax en ondas, animaciones de números en métricas, carousel automatizado ✅

**Decisión Final:** **b) + c) Intermedias-Avanzadas**

**Implementación Actual:**

#### Animaciones Intermedias
- ✅ Ondas animadas en hero con loop infinito (8s, 10s, 12s)
- ✅ Fade-in + slide-up al hacer scroll (intersection observer)
- ✅ Transiciones suaves entre secciones (ease-in-out)
- ✅ Hover effects en cards (scale 1.02, shadow-md)
- ✅ Navbar con transición transparente → blanco + sombra

#### Animaciones Avanzadas
- ✅ Counter animations en métricas (0 → valor final en 2s)
- ✅ Carousel automatizado en testimonios (autoplay cada 5s)
- ⏳ Parallax en ondas (pendiente para V1.1)

**Configuración:**
```css
/* globals.css */
--duration-fast: 160ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--ease: cubic-bezier(0.4, 0, 0.2, 1);
```

**Herramienta:** Framer Motion (`framer-motion`)

**Accesibilidad:** 
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

---

### 3. Navegación

**Pregunta:** ¿El navbar debe ser?

**Opciones:**
- a) Sticky (fijo al hacer scroll) ✅
- b) Estático (desaparece al hacer scroll)
- c) Sticky con cambio de estilo (transparente arriba, sólido al hacer scroll)

**Decisión Final:** **a) Sticky (fijo al hacer scroll)**

**Implementación:**

```tsx
// Navbar.tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Clase dinámica
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  isScrolled ? 'bg-white shadow-[var(--shadow-md)]' : 'bg-transparent'
}`}
```

**Características:**
- Siempre visible (mejora accesibilidad)
- Transición suave de transparente a blanco con sombra
- Estado sticky con `position: fixed`
- z-index: 50 para estar sobre otros elementos

**Responsive:**
- Desktop: Navbar completa con 7 links + botón CTA
- Mobile: Logo + hamburger menu (slides desde arriba)

---

### 4. Estructura de Componentes

**Pregunta:** ¿Qué estructura prefieres?

**Opciones:**
- a) Todo en page.tsx inicialmente para iterar rápido
- b) Componentes separados desde el principio (Hero, Pilares, Metrics, etc.)
- c) Híbrido: página principal con secciones inline, pero componentes UI reutilizables separados ✅

**Decisión Final:** **c) Híbrido**

**Implementación:**

#### Secciones Inline en `page.tsx`
```tsx
// apps/web/src/app/page.tsx
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section - inline */}
        <section className="...">...</section>
        
        {/* Pilares Section - inline */}
        <section className="...">...</section>
        
        {/* Testimonios - inline */}
        <section className="...">...</section>
      </main>
    </>
  );
}
```

**Ventajas:**
- ✅ Iteración rápida en diseño y contenido
- ✅ Facilita ver el flujo completo de la página
- ✅ Reduce overhead de gestión de props entre componentes

#### Componentes UI Reutilizables Separados
```
apps/web/src/shared/components/
├── Button/
│   ├── Button.tsx
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   └── index.ts
├── WavesSVG/
│   ├── WavesSVG.tsx
│   └── index.ts
└── Navbar/
    ├── Navbar.tsx
    └── index.ts
```

**Ventajas:**
- ✅ Reutilización en múltiples páginas
- ✅ Testing aislado
- ✅ Design system consistente
- ✅ Mantenimiento centralizado

**Criterio para Separar:**
- ❓ ¿Se usará en múltiples páginas? → Componente separado
- ❓ ¿Tiene lógica/estado complejo? → Componente separado
- ❓ ¿Es parte del design system? → Componente separado
- ❓ ¿Es contenido específico de una página? → Inline

---

### 5. Responsive Design

**Pregunta:** ¿Qué prioridad de breakpoints?

**Opciones:**
- a) Mobile-first estricto (diseñar desde 360px hacia arriba)
- b) Desktop-first y adaptar a mobile ✅
- c) Mobile-first con optimizaciones específicas para tablet y desktop

**Decisión Final:** **b) Desktop-first con adaptación a mobile**

**Razón:** El diseño original de referencia estaba en desktop, facilitando la implementación inicial.

**Breakpoints Implementados:**

```css
/* Mobile */
@media (min-width: 360px) { ... }  /* sm: default */

/* Tablet */
@media (min-width: 768px) { ... }  /* md: */

/* Desktop */
@media (min-width: 1024px) { ... } /* lg: */

/* Wide */
@media (min-width: 1440px) { ... } /* xl: */
```

**Estrategia por Sección:**

#### Hero
- Desktop: contenido centrado, max-width 4xl (896px)
- Tablet: padding reducido, fuente ligeramente más pequeña
- Mobile: columna única, CTAs stack verticalmente

#### Tres Pilares
- Desktop: `grid-cols-3` (3 columnas)
- Tablet: `md:grid-cols-2` (2 columnas)
- Mobile: columna única

#### Métricas
- Desktop: `lg:grid-cols-4` (4 tiles)
- Tablet: `sm:grid-cols-2` (2x2 grid)
- Mobile: columna única

#### Navbar
- Desktop: links horizontales + CTA visible
- Mobile: hamburger menu + slide-down

**Utilidades Tailwind:**
```tsx
<div className="px-4 sm:px-6 lg:px-8">        {/* Padding responsive */}
<h1 className="text-4xl md:text-5xl lg:text-6xl"> {/* Fuente responsive */}
<div className="grid md:grid-cols-2 lg:grid-cols-3"> {/* Grid responsive */}
```

---

## 🎯 Principios Generales

### Velocidad de Desarrollo
- Priorizar iteración rápida sobre arquitectura perfecta inicialmente
- Refactorizar componentes cuando se identifiquen patrones repetidos

### Consistencia Visual
- Usar siempre tokens del design system (`globals.css`)
- Mantener espaciado consistente (múltiplos de 4px)
- Respetar paleta de colores establecida

### Experiencia de Usuario
- Animaciones mejoran percepción, no son decorativas
- Accesibilidad no es opcional (WCAG 2.2 AA)
- Performance importa (LCP < 2.5s, CLS < 0.1)

### Mantenibilidad
- Documentar decisiones importantes
- Código autodocumentado con TypeScript
- Testing cuando hay lógica compleja

---

## 📝 Notas para Futuros Desarrolladores

### Al Agregar Nuevas Animaciones
1. Verificar que aporten valor al UX
2. Incluir soporte para `prefers-reduced-motion`
3. Usar duraciones del design system (160/200/300ms)
4. Testing en dispositivos de gama baja

### Al Crear Nuevos Componentes
1. Evaluar si es reutilizable → separar
2. Si es contenido específico → inline
3. Seguir patrón de variantes con CVA
4. Exportar types/interfaces

### Al Modificar el Navbar
1. Mantener sticky behavior
2. Testing en mobile (hamburger menu)
3. Verificar z-index no cause conflictos
4. Accesibilidad en menú desplegable

### Al Ajustar Responsive
1. Probar en dispositivos reales, no solo devtools
2. Verificar 360px (móvil más pequeño común)
3. Grid debe colapsar apropiadamente
4. Imágenes deben ser responsive

---

## 🔄 Historial de Cambios

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 11/10/2025 | Documento inicial | Captura de decisiones durante desarrollo homepage |

---

## 📚 Referencias

- **Design System Prompt:** `DESIGN-SYSTEM-PROMPT.md`
- **PRD Completo:** `PRD-PULSE-HUB.md`
- **Código de Referencia:** `apps/web/src/app/page.tsx`
- **Componentes UI:** `apps/web/src/shared/components/`

---

**Próxima revisión:** Al finalizar V1.1 (con todas las páginas implementadas)

