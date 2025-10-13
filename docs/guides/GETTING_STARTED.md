# 🚀 Guía de Inicio Rápido - PULSE HUB

Esta guía te ayudará a comenzar a trabajar con el proyecto PULSE HUB.

## ✅ Prerequisitos

Asegúrate de tener instalado:
- **Node.js** 18.0.0 o superior
- **npm** 9.0.0 o superior
- **Git**

## 📦 Instalación

### 1. Clonar el repositorio (si aún no lo has hecho)

```bash
git clone <repository-url>
cd PULSE-HUB
```

### 2. Instalar dependencias

El proyecto usa workspaces de npm, así que una sola instalación configurará todo:

```bash
npm install
```

Esto instalará las dependencias para:
- Root del proyecto
- Frontend (apps/web)
- Backend (apps/api)
- Paquetes compartidos (packages/shared y packages/ui)

### 3. Configurar variables de entorno

#### Frontend (`apps/web/.env.local`)

Crea el archivo y agrega:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=PULSE HUB
```

#### Backend (`apps/api/.env`)

Crea el archivo y agrega:

```env
PORT=4000
NODE_ENV=development
JWT_SECRET=change-this-in-production
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=change-this-too
REFRESH_TOKEN_EXPIRES_IN=30d
ALLOWED_ORIGINS=http://localhost:3000
API_VERSION=v1
```

## 🎯 Iniciar el Proyecto

### Opción 1: Iniciar Todo (Recomendado)

Ejecuta ambos servidores simultáneamente:

```bash
npm run dev
```

Esto iniciará:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

### Opción 2: Iniciar Individualmente

En terminales separadas:

```bash
# Terminal 1 - Frontend
npm run dev:web

# Terminal 2 - Backend
npm run dev:api
```

## 🧪 Verificar que Todo Funciona

### 1. Verificar el Backend

Abre en tu navegador: http://localhost:4000/health

Deberías ver:
```json
{
  "status": "ok",
  "message": "PULSE-HUB API is running"
}
```

### 2. Verificar el Frontend

Abre en tu navegador: http://localhost:3000

Deberías ver la página de inicio de Next.js.

### 3. Probar la API

Puedes usar herramientas como **Postman** o **Thunder Client** para probar los endpoints:

**Login de ejemplo:**
```bash
POST http://localhost:4000/api/v1/auth/login
Content-Type: application/json

{
  "email": "demo@pulsehub.com",
  "password": "demo123"
}
```

## 📁 Estructura del Proyecto

```
PULSE-HUB/
├── apps/
│   ├── web/          # Frontend Next.js
│   └── api/          # Backend Express
├── packages/
│   ├── shared/       # Código compartido
│   └── ui/           # Componentes UI
├── package.json      # Config del monorepo
└── README.md         # Documentación principal
```

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev              # Todo
npm run dev:web          # Solo frontend
npm run dev:api          # Solo backend

# Build
npm run build            # Todo
npm run build:web        # Solo frontend
npm run build:api        # Solo backend

# Calidad de código
npm run lint             # Linting
npm run format           # Formateo con Prettier
```

## 📝 Próximos Pasos

### Para el Frontend

1. Navega a `apps/web/src/features/` para ver las features existentes
2. Explora `apps/web/src/shared/components/` para componentes reutilizables
3. Revisa `apps/web/src/core/stores/` para el state management

### Para el Backend

1. Navega a `apps/api/src/features/` para ver las features existentes
2. Revisa `apps/api/src/core/middleware/` para middleware personalizado
3. Explora `apps/api/src/server.ts` para entender la configuración del servidor

### Agregar una Nueva Feature

#### Frontend

```bash
# Crear estructura básica
mkdir apps/web/src/features/mi-feature
cd apps/web/src/features/mi-feature

# Crear archivos
touch index.ts
touch types.ts
mkdir hooks
mkdir components
```

#### Backend

```bash
# Crear estructura básica
mkdir apps/api/src/features/mi-feature
cd apps/api/src/features/mi-feature

# Crear archivos
touch mi-feature.types.ts
touch mi-feature.service.ts
touch mi-feature.controller.ts
touch mi-feature.routes.ts
```

## 🔍 Debugging

### Frontend no se conecta al Backend

1. Verifica que el backend esté corriendo en el puerto 4000
2. Revisa `apps/web/.env.local` - debe tener `NEXT_PUBLIC_API_URL=http://localhost:4000/api`
3. Verifica CORS en `apps/api/src/server.ts`

### Error de módulos no encontrados

```bash
# Reinstalar dependencias
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
npm install
```

### Problemas con TypeScript

```bash
# Limpiar y reconstruir
npm run clean  # Si existe el comando
npm run build
```

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

## 🆘 ¿Necesitas Ayuda?

1. Revisa el `README.md` principal
2. Consulta los README específicos de cada app:
   - `apps/web/README.md`
   - `apps/api/README.md`
3. Contacta al equipo de desarrollo

## 🎉 ¡Listo!

Ya tienes todo configurado. ¡Hora de desarrollar!

```bash
npm run dev
```

Happy coding! 🚀

