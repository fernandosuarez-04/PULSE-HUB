# 🛠️ Comandos Útiles - PULSE HUB

Referencia rápida de comandos para el desarrollo diario.

## 📦 Gestión de Dependencias

### Instalar nueva dependencia

```bash
# En el frontend
npm install <paquete> --workspace=apps/web

# En el backend
npm install <paquete> --workspace=apps/api

# En shared package
npm install <paquete> --workspace=packages/shared

# En todo el proyecto (root)
npm install <paquete> -w apps/web -w apps/api
```

### Ejemplos de instalación

```bash
# Axios en el frontend
npm install axios --workspace=apps/web

# Bcrypt en el backend
npm install bcrypt --workspace=apps/api
npm install @types/bcrypt -D --workspace=apps/api

# Librería compartida
npm install date-fns --workspace=packages/shared
```

## 🚀 Desarrollo

### Iniciar servidores

```bash
# Todo (frontend + backend)
npm run dev

# Solo frontend
npm run dev:web

# Solo backend
npm run dev:api
```

### Ports por defecto
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## 🏗️ Build

```bash
# Build completo
npm run build

# Build frontend
npm run build:web

# Build backend
npm run build:api

# Build package shared
npm run build --workspace=packages/shared
```

## 🧹 Limpiar y Reinstalar

```bash
# Limpiar node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# O en Windows PowerShell
Remove-Item -Recurse -Force node_modules, apps/*/node_modules, packages/*/node_modules

# Reinstalar todo
npm install
```

## 🔍 Linting y Formato

```bash
# Linting de todo el proyecto
npm run lint

# Linting de una app específica
npm run lint --workspace=apps/web
npm run lint --workspace=apps/api

# Formatear código con Prettier
npm run format

# Formatear archivos específicos
npx prettier --write "apps/web/src/**/*.{ts,tsx}"
```

## 🗂️ Estructura de Carpetas

### Crear nueva feature en Frontend

```bash
cd apps/web/src/features
mkdir mi-feature
cd mi-feature
mkdir components hooks
touch index.ts types.ts
```

### Crear nueva feature en Backend

```bash
cd apps/api/src/features
mkdir mi-feature
cd mi-feature
touch mi-feature.types.ts mi-feature.service.ts mi-feature.controller.ts mi-feature.routes.ts
```

## 🔧 TypeScript

### Verificar tipos

```bash
# Frontend
cd apps/web && npx tsc --noEmit

# Backend
cd apps/api && npx tsc --noEmit

# Shared package
cd packages/shared && npx tsc --noEmit
```

## 🌐 Next.js específico

```bash
# Limpiar caché de Next.js
cd apps/web
rm -rf .next

# Crear nueva página
cd apps/web/src/app
mkdir nueva-pagina
touch nueva-pagina/page.tsx

# Crear nueva ruta API
cd apps/web/src/app/api
mkdir nueva-ruta
touch nueva-ruta/route.ts
```

## 🔐 Variables de Entorno

### Frontend (.env.local)

```bash
cd apps/web
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local
```

### Backend (.env)

```bash
cd apps/api
echo "PORT=4000" > .env
echo "NODE_ENV=development" >> .env
```

## 📊 Logs y Debugging

### Ver logs del backend

```bash
# En modo desarrollo ya incluye logs con Morgan
npm run dev:api

# Para más detalles, puedes usar:
DEBUG=* npm run dev:api
```

### Inspeccionar Next.js

```bash
# Analizar el bundle
cd apps/web
npm install @next/bundle-analyzer
# Agregar a next.config.ts y luego:
ANALYZE=true npm run build
```

## 🧪 Testing (para cuando se implemente)

```bash
# Correr tests
npm test

# Tests en modo watch
npm test -- --watch

# Tests con cobertura
npm test -- --coverage

# Tests de una app específica
npm test --workspace=apps/web
npm test --workspace=apps/api
```

## 🔄 Git

### Workflow común

```bash
# Crear nueva rama
git checkout -b feature/nombre-feature

# Ver cambios
git status

# Agregar cambios
git add .

# Commit
git commit -m "feat: descripción del cambio"

# Push
git push origin feature/nombre-feature
```

### Convenciones de commits

```bash
feat: Nueva característica
fix: Corrección de bug
docs: Cambios en documentación
style: Cambios de formato (no afectan código)
refactor: Refactorización de código
test: Agregar o modificar tests
chore: Cambios en build o herramientas
```

## 📦 Workspaces

### Ejecutar comando en workspace específico

```bash
# Ejecutar script
npm run <script> --workspace=<workspace>

# Ejemplos:
npm run dev --workspace=apps/web
npm run build --workspace=packages/shared

# En todos los workspaces
npm run build --workspaces
```

### Listar workspaces

```bash
npm ls --workspaces
```

## 🔧 Troubleshooting

### Puerto ocupado

```bash
# Ver qué está usando el puerto (Windows)
netstat -ano | findstr :3000
netstat -ano | findstr :4000

# Matar proceso (Windows)
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### Problemas con caché

```bash
# Limpiar todo
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
rm -rf apps/web/.next
rm -rf apps/api/dist
rm -rf packages/*/dist
npm install
```

### Error: Cannot find module

```bash
# Verificar enlaces de workspaces
npm ls --workspace=apps/web @pulse-hub/shared

# Reinstalar workspace específico
npm install --workspace=apps/web
```

## 📝 Productividad

### Alias útiles (agregar a .bashrc o .zshrc)

```bash
# Desarrollo
alias pdev="cd ~/PULSE-HUB && npm run dev"
alias pweb="cd ~/PULSE-HUB && npm run dev:web"
alias papi="cd ~/PULSE-HUB && npm run dev:api"

# Build
alias pbuild="cd ~/PULSE-HUB && npm run build"

# Navegación
alias pweb-dir="cd ~/PULSE-HUB/apps/web/src"
alias papi-dir="cd ~/PULSE-HUB/apps/api/src"
```

### VS Code Tasks

Agregar a `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Dev - All",
      "type": "npm",
      "script": "dev",
      "problemMatcher": []
    },
    {
      "label": "Dev - Frontend",
      "type": "npm",
      "script": "dev:web",
      "problemMatcher": []
    },
    {
      "label": "Dev - Backend",
      "type": "npm",
      "script": "dev:api",
      "problemMatcher": []
    }
  ]
}
```

## 🚀 Despliegue (Producción)

### Build de producción

```bash
# Build completo
npm run build

# Verificar que los builds funcionan
cd apps/web && npm start  # Frontend
cd apps/api && npm start  # Backend
```

### Variables de entorno para producción

```bash
# Frontend (.env.production)
NEXT_PUBLIC_API_URL=https://api.tu-dominio.com/api

# Backend (.env.production)
PORT=4000
NODE_ENV=production
JWT_SECRET=<secret-seguro-generado>
DATABASE_URL=<url-de-produccion>
```

## 💡 Tips

1. **Usa `npm ci` en CI/CD** en lugar de `npm install` para builds reproducibles
2. **Mantén las dependencias actualizadas**: `npm outdated`
3. **Revisa vulnerabilidades**: `npm audit`
4. **Usa `--workspace` o `-w`** para comandos específicos de workspace
5. **Git hooks**: Considera usar Husky para linting pre-commit

## 🆘 Ayuda Rápida

```bash
# Ver todos los scripts disponibles
npm run

# Ver información del workspace
npm ls --depth=0

# Ver versiones de dependencias críticas
node --version
npm --version

# Documentación de comandos npm
npm help <comando>
```

## 📚 Referencias

- [npm workspaces docs](https://docs.npmjs.com/cli/v8/using-npm/workspaces)
- [Next.js CLI](https://nextjs.org/docs/api-reference/cli)
- [TypeScript CLI](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

