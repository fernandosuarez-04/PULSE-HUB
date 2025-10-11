# Frontend - PULSE HUB

Aplicación frontend desarrollada con Next.js 15, TypeScript y TailwindCSS.

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
│   │   └── Button/
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

Ejemplo de uso:

```tsx
import { Button } from '@/shared/components';

export default function MyComponent() {
  return <Button variant="primary">Click me</Button>;
}
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
