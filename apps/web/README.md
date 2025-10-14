# Frontend - PULSE HUB

Aplicación frontend desarrollada con Next.js 15, TypeScript y TailwindCSS.

## 🆕 Última Actualización (14 Enero 2025)

### ✅ Página de Contacto/Agenda Demo Implementada
- **Hero Section**: "Comencemos Juntos" con animaciones
- **Layout 2 Columnas**: Cards de acción + Formulario completo
- **Formulario Avanzado**: 7 campos con validación en tiempo real
- **Footer Unificado**: Componente reutilizable en todas las páginas
- **Navegación Actualizada**: Botón "Agendar Demo" enlaza a `/contacto`

### 🧩 Nuevos Componentes
- **Footer**: Componente reutilizable con enlaces funcionales
- **AnimatedSection**: Para animaciones de scroll con variantes
- **ParticlesBackground**: Fondo de partículas animadas

## 🏗️ Estructura Screaming Architecture

```
src/
├── app/                   # Next.js App Router
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página de inicio
│
├── features/             # Features por dominio
│   ├── auth/            # Autenticación
│   │   ├── hooks/       # useAuth
│   │   └── types.ts     # Tipos de auth
│   ├── users/           # Gestión de usuarios
│   └── dashboard/       # Dashboard principal
│
├── shared/              # Código compartido
│   ├── components/      # Componentes reutilizables
│   │   ├── Button/      # Botón con variantes
│   │   ├── Card/        # Card base con hover
│   │   ├── Navbar/      # Navegación sticky
│   │   ├── Footer/      # Footer reutilizable
│   │   ├── WavesSVG/    # Ondas animadas
│   │   ├── ParticlesBackground/ # Fondo de partículas
│   │   └── AnimatedSection/ # Animaciones de scroll
│   ├── hooks/          # Custom hooks
│   │   └── useDebounce
│   └── utils/          # Utilidades
│       └── cn.ts       # Merge de clases Tailwind
│
└── core/               # Lógica de negocio
    ├── services/       # Servicios (API client)
    │   └── api.ts
    └── stores/         # State management (Zustand)
        └── authStore.ts
```

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm run start

# Linting
npm run lint
```

## 📦 Dependencias Principales

- **Next.js 15**: Framework de React
- **Zustand**: State management ligero
- **Axios**: Cliente HTTP
- **TailwindCSS**: Estilos
- **@pulse-hub/shared**: Tipos compartidos con backend

## 🎨 Componentes UI

Los componentes base están en `src/shared/components/` y pueden ser reutilizados en todo el proyecto.

### Componentes Disponibles

#### Button
```tsx
import { Button } from '@/shared/components';

<Button variant="primary" size="md">Click me</Button>
// Variantes: primary, secondary, tertiary
// Tamaños: sm, md, lg
```

#### Card
```tsx
import { Card } from '@/shared/components';

<Card hover={true} className="p-6">
  <h3>Mi Card</h3>
</Card>
```

#### Footer
```tsx
import { Footer } from '@/shared/components';

<Footer />
// Componente reutilizable con enlaces funcionales
```

#### AnimatedSection
```tsx
import { AnimatedSection } from '@/shared/components';

<AnimatedSection variant="slideUp" delay={0.2}>
  <h2>Contenido animado</h2>
</AnimatedSection>
// Variantes: fade, slide, scale, slideUp
```

## 🔐 Autenticación

El hook `useAuth` proporciona acceso al estado de autenticación:

```tsx
import { useAuth } from '@/features/auth';

export default function Profile() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <button onClick={() => login({ email, password })}>Login</button>;
  }
  
  return <div>Bienvenido {user?.name}</div>;
}
```

## 🌐 API Client

El servicio `apiService` maneja todas las peticiones HTTP:

```tsx
import { apiService } from '@/core/services/api';

// GET request
const response = await apiService.get('/users');

// POST request
const response = await apiService.post('/auth/login', { email, password });
```

## 🎯 Features

Cada feature representa un dominio del negocio y contiene:
- **types.ts**: Tipos TypeScript específicos
- **hooks/**: Custom hooks de React
- **components/**: Componentes específicos de la feature
- **stores/**: Estado específico (si es necesario)
