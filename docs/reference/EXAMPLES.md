# 📖 Ejemplos de Uso - PULSE HUB

Esta guía contiene ejemplos prácticos de cómo usar las diferentes partes del stack.

## 🎨 Frontend Examples

### 1. Crear un Nuevo Componente

**Ubicación**: `apps/web/src/shared/components/Card/Card.tsx`

```tsx
'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={cn('rounded-lg border bg-white p-6 shadow-sm', className)}>
      <h3 className="text-xl font-bold">{title}</h3>
      {description && (
        <p className="mt-2 text-gray-600">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};
```

**Uso**:
```tsx
import { Card } from '@/shared/components/Card';

export default function Dashboard() {
  return (
    <Card title="Mi Tarjeta" description="Esta es una descripción">
      <p>Contenido de la tarjeta</p>
    </Card>
  );
}
```

### 2. Crear un Custom Hook

**Ubicación**: `apps/web/src/shared/hooks/useLocalStorage.ts`

```tsx
'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

**Uso**:
```tsx
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

export default function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Cambiar tema a {theme === 'light' ? 'oscuro' : 'claro'}
    </button>
  );
}
```

### 3. Crear un Store con Zustand

**Ubicación**: `apps/web/src/core/stores/uiStore.ts`

```tsx
'use client';

import { create } from 'zustand';

interface UiStore {
  sidebarOpen: boolean;
  modalOpen: boolean;
  toggleSidebar: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: true,
  modalOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
}));
```

**Uso**:
```tsx
import { useUiStore } from '@/core/stores/uiStore';

export default function Layout({ children }) {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <div className="flex">
      {sidebarOpen && <aside>Sidebar</aside>}
      <main>{children}</main>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
  );
}
```

### 4. Hacer una Petición HTTP

```tsx
import { apiService } from '@/core/services/api';
import { User } from '@pulse-hub/shared';

export async function getUsers() {
  try {
    const response = await apiService.get<User[]>('/users');
    
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

// Uso en un componente
export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 5. Crear una Nueva Feature

**Estructura**:
```
apps/web/src/features/projects/
├── components/
│   ├── ProjectCard.tsx
│   └── ProjectList.tsx
├── hooks/
│   └── useProjects.ts
├── types.ts
└── index.ts
```

**types.ts**:
```tsx
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface CreateProjectInput {
  name: string;
  description: string;
}
```

**hooks/useProjects.ts**:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/core/services/api';
import { Project } from '../types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await apiService.get<Project[]>('/projects');
      if (response.success && response.data) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data: CreateProjectInput) => {
    const response = await apiService.post<Project>('/projects', data);
    if (response.success && response.data) {
      setProjects([...projects, response.data]);
      return response.data;
    }
  };

  return { projects, loading, createProject, refresh: loadProjects };
};
```

## 🔧 Backend Examples

### 1. Crear una Nueva Feature Completa

#### Step 1: Types (`apps/api/src/features/projects/projects.types.ts`)

```typescript
import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    description: z.string().optional(),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
  }),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>['body'];
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
```

#### Step 2: Service (`apps/api/src/features/projects/projects.service.ts`)

```typescript
import { createError } from '../../core/middleware/errorHandler';
import { HTTP_STATUS, ERROR_CODES } from '@pulse-hub/shared';
import { CreateProjectInput } from './projects.types';

interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

export class ProjectsService {
  private projects: Project[] = [];

  async getAll(): Promise<Project[]> {
    return this.projects;
  }

  async getById(id: string): Promise<Project> {
    const project = this.projects.find(p => p.id === id);
    
    if (!project) {
      throw createError(
        'Proyecto no encontrado',
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }
    
    return project;
  }

  async create(data: CreateProjectInput): Promise<Project> {
    const project: Project = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
    };
    
    this.projects.push(project);
    return project;
  }

  async update(id: string, data: Partial<CreateProjectInput>): Promise<Project> {
    const project = await this.getById(id);
    const updated = { ...project, ...data };
    
    const index = this.projects.findIndex(p => p.id === id);
    this.projects[index] = updated;
    
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    this.projects = this.projects.filter(p => p.id !== id);
  }
}

export const projectsService = new ProjectsService();
```

#### Step 3: Controller (`apps/api/src/features/projects/projects.controller.ts`)

```typescript
import { Request, Response, NextFunction } from 'express';
import { projectsService } from './projects.service';
import { HTTP_STATUS } from '@pulse-hub/shared';
import { asyncHandler } from '../../core/utils';

export class ProjectsController {
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const projects = await projectsService.getAll();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: projects,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await projectsService.getById(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: project,
    });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const project = await projectsService.create(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: project,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await projectsService.update(id, req.body);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: project,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await projectsService.delete(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: null,
      message: 'Proyecto eliminado',
    });
  });
}

export const projectsController = new ProjectsController();
```

#### Step 4: Routes (`apps/api/src/features/projects/projects.routes.ts`)

```typescript
import { Router } from 'express';
import { projectsController } from './projects.controller';
import { authenticate } from '../../core/middleware';
import { validate } from '../../core/middleware';
import { createProjectSchema, updateProjectSchema } from './projects.types';

const router = Router();

router.get('/', authenticate, projectsController.getAll);
router.get('/:id', authenticate, projectsController.getById);
router.post('/', authenticate, validate(createProjectSchema), projectsController.create);
router.put('/:id', authenticate, validate(updateProjectSchema), projectsController.update);
router.delete('/:id', authenticate, projectsController.delete);

export { router as projectsRoutes };
```

#### Step 5: Register in Server (`apps/api/src/server.ts`)

```typescript
import { projectsRoutes } from './features/projects/projects.routes';

// ... resto del código

app.use(`/api/${API_VERSION}/projects`, projectsRoutes);
```

### 2. Crear Middleware Personalizado

**Ubicación**: `apps/api/src/core/middleware/logger.middleware.ts`

```typescript
import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};
```

**Uso en server.ts**:
```typescript
import { requestLogger } from './core/middleware/logger.middleware';

app.use(requestLogger);
```

## 🔗 Integración Frontend-Backend

### Ejemplo Completo: Login Flow

**Backend** (`apps/api/src/features/auth/auth.service.ts`):
```typescript
async login(credentials: LoginInput): Promise<{ user: User } & AuthTokens> {
  // Validar credenciales
  // Generar tokens
  // Retornar usuario y tokens
}
```

**Frontend** (`apps/web/src/features/auth/hooks/useAuth.ts`):
```tsx
const handleLogin = async (credentials: LoginCredentials) => {
  await login(credentials);
};
```

**Uso en Componente**:
```tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth';
import { Button } from '@/shared/components';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
}
```

## 📦 Usar Tipos Compartidos

**En Backend**:
```typescript
import { User, ApiResponse, HTTP_STATUS } from '@pulse-hub/shared';

const response: ApiResponse<User> = {
  success: true,
  data: user,
};
```

**En Frontend**:
```typescript
import { User, ApiResponse } from '@pulse-hub/shared';

const [user, setUser] = useState<User | null>(null);
```

## 🎯 Best Practices

1. **Siempre usa tipos de TypeScript**
2. **Valida inputs con Zod en el backend**
3. **Maneja errores apropiadamente**
4. **Usa el formato ApiResponse consistentemente**
5. **Mantén los componentes pequeños y reutilizables**
6. **Cada feature debe ser autocontenida**
7. **Usa los stores de Zustand para estado global**
8. **Usa hooks personalizados para lógica reutilizable**

## 🚀 Testing (Para implementar)

```typescript
// Frontend - Jest/React Testing Library
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

// Backend - Jest/Supertest
import request from 'supertest';
import app from './server';

test('GET /health returns 200', async () => {
  const response = await request(app).get('/health');
  expect(response.status).toBe(200);
});
```

