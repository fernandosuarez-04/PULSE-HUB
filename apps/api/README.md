# Backend API - PULSE HUB

API REST desarrollada con Express, TypeScript y siguiendo principios de Screaming Architecture.

## 🏗️ Estructura Screaming Architecture

```
src/
├── server.ts              # Entry point de la aplicación
│
├── features/             # Features por dominio
│   ├── auth/            # Autenticación
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   └── auth.types.ts
│   │
│   └── users/           # Gestión de usuarios
│       ├── users.controller.ts
│       ├── users.service.ts
│       ├── users.routes.ts
│       └── users.types.ts
│
├── core/                # Lógica compartida
│   ├── middleware/      # Middleware personalizado
│   │   ├── errorHandler.ts
│   │   ├── auth.middleware.ts
│   │   └── validation.middleware.ts
│   ├── config/         # Configuración
│   │   └── index.ts
│   └── utils/          # Utilidades
│       └── index.ts
│
└── shared/             # Tipos y constantes
    ├── types/
    └── constants/
```

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm run start

# Linting
npm run lint
```

## 📝 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
PORT=4000
NODE_ENV=development
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000
```

## 🛣️ Endpoints

### Autenticación

**POST** `/api/v1/auth/login`
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**POST** `/api/v1/auth/register`
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "name": "Usuario Ejemplo"
}
```

**POST** `/api/v1/auth/refresh`
```json
{
  "refreshToken": "token-here"
}
```

### Usuarios (requiere autenticación)

**GET** `/api/v1/users` - Obtener todos los usuarios

**GET** `/api/v1/users/:id` - Obtener usuario por ID

**PUT** `/api/v1/users/:id` - Actualizar usuario

**DELETE** `/api/v1/users/:id` - Eliminar usuario

## 🏗️ Crear una Nueva Feature

1. Crear carpeta en `src/features/nueva-feature/`
2. Crear archivos necesarios:
   - `nueva-feature.types.ts` - Tipos y esquemas de validación
   - `nueva-feature.service.ts` - Lógica de negocio
   - `nueva-feature.controller.ts` - Controladores
   - `nueva-feature.routes.ts` - Definición de rutas

3. Registrar las rutas en `server.ts`:
```typescript
import { nuevaFeatureRoutes } from './features/nueva-feature/nueva-feature.routes';
app.use(`/api/${API_VERSION}/nueva-feature`, nuevaFeatureRoutes);
```

## 🔒 Middleware de Autenticación

Para proteger rutas, usa el middleware `authenticate`:

```typescript
import { authenticate, authorize } from '../../core/middleware';

router.get('/protected', authenticate, controller.method);
router.get('/admin-only', authenticate, authorize('admin'), controller.method);
```

## ✅ Validación con Zod

Define esquemas de validación en los archivos `*.types.ts`:

```typescript
import { z } from 'zod';

export const createItemSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional(),
  }),
});
```

Usa el middleware de validación:

```typescript
import { validate } from '../../core/middleware';
import { createItemSchema } from './item.types';

router.post('/', validate(createItemSchema), controller.create);
```

## 📦 Dependencias Principales

- **Express**: Framework web
- **TypeScript**: Tipado estático
- **Zod**: Validación de esquemas
- **Cors**: Cross-Origin Resource Sharing
- **Helmet**: Seguridad HTTP
- **Morgan**: Logging de peticiones
- **@pulse-hub/shared**: Tipos compartidos con frontend

## 🔧 Estructura de Respuestas

Todas las respuestas siguen el formato `ApiResponse`:

```typescript
{
  success: boolean,
  data?: T,
  error?: {
    message: string,
    code: string,
  },
  meta?: {
    page?: number,
    limit?: number,
    total?: number,
  }
}
```

## 🚨 Manejo de Errores

Usa `createError` para lanzar errores personalizados:

```typescript
import { createError } from '../../core/middleware/errorHandler';
import { HTTP_STATUS, ERROR_CODES } from '@pulse-hub/shared';

throw createError(
  'Usuario no encontrado',
  HTTP_STATUS.NOT_FOUND,
  ERROR_CODES.NOT_FOUND
);
```

