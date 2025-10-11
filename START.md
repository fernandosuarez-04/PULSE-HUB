# 🚀 Iniciar PULSE HUB - Guía Rápida

## Opción 1: Iniciar Todo en Una Sola Terminal (RECOMENDADO) ⭐

**Un solo comando inicia frontend y backend simultáneamente:**

```bash
npm run dev
```

Esto iniciará:
- 🎨 **FRONTEND** (cyan) en http://localhost:3000
- 🔧 **BACKEND** (magenta) en http://localhost:4000

Los logs aparecerán con colores diferentes para que puedas distinguirlos fácilmente.

### Para detener ambos:
Presiona `Ctrl + C` en la terminal

---

## Opción 2: Iniciar por Separado

Si prefieres tener control individual o hay problemas:

### Terminal 1 - Frontend:
```bash
npm run dev:web
# O directamente:
cd apps/web
npm run dev
```
URL: http://localhost:3000

### Terminal 2 - Backend:
```bash
npm run dev:api
# O directamente:
cd apps/api
npm run dev
```
URL: http://localhost:4000

---

## Antes de Iniciar (Primera Vez) ⚠️

### 1. Crear Variables de Entorno

#### Frontend - `apps/web/.env.local`:
```bash
# Windows PowerShell
@"
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=PULSE HUB
"@ | Out-File -FilePath "apps\web\.env.local" -Encoding utf8

# O créalo manualmente con estos valores:
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=PULSE HUB
```

#### Backend - `apps/api/.env`:
```bash
# Windows PowerShell
@"
PORT=4000
NODE_ENV=development
JWT_SECRET=tu-secreto-cambiar-en-produccion
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=tu-refresh-secret-cambiar
REFRESH_TOKEN_EXPIRES_IN=30d
ALLOWED_ORIGINS=http://localhost:3000
API_VERSION=v1
"@ | Out-File -FilePath "apps\api\.env" -Encoding utf8

# O créalo manualmente con estos valores:
PORT=4000
NODE_ENV=development
JWT_SECRET=tu-secreto-cambiar-en-produccion
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=tu-refresh-secret-cambiar
REFRESH_TOKEN_EXPIRES_IN=30d
ALLOWED_ORIGINS=http://localhost:3000
API_VERSION=v1
```

### 2. Verificar que las dependencias están instaladas:
```bash
npm install
```

---

## Verificar que Todo Funciona ✅

### 1. Frontend
Abre en tu navegador: **http://localhost:3000**

Deberías ver la página de inicio de Next.js

### 2. Backend
Abre en tu navegador: **http://localhost:4000/health**

Deberías ver:
```json
{
  "status": "ok",
  "message": "PULSE-HUB API is running"
}
```

O desde la terminal:
```bash
# PowerShell
Invoke-WebRequest http://localhost:4000/health | Select-Object -ExpandProperty Content

# O con curl si lo tienes
curl http://localhost:4000/health
```

---

## Comandos Útiles 🛠️

```bash
# Desarrollo
npm run dev              # Iniciar todo (frontend + backend)
npm run dev:web          # Solo frontend
npm run dev:api          # Solo backend

# Build
npm run build            # Build de todo
npm run build:web        # Build del frontend
npm run build:api        # Build del backend

# Limpiar
npm run clean            # Limpiar builds

# Linting y Formato
npm run lint             # Linting
npm run format           # Formatear código
```

---

## Estructura de URLs 🌐

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | Aplicación Next.js |
| Backend API | http://localhost:4000/api/v1 | API REST |
| Health Check | http://localhost:4000/health | Estado del backend |
| API Auth | http://localhost:4000/api/v1/auth | Endpoints de autenticación |
| API Users | http://localhost:4000/api/v1/users | Endpoints de usuarios |

---

## Solución de Problemas 🔧

### Puerto ocupado
```bash
# Ver qué usa los puertos
netstat -ano | findstr :3000
netstat -ano | findstr :4000

# Matar proceso (reemplaza <PID> con el número que aparece)
taskkill /PID <PID> /F
```

### Backend no inicia
Si el backend tiene problemas, intenta iniciarlo manualmente:

```bash
cd apps/api
npx ts-node src/server.ts
```

### Error de módulos
```bash
# Reinstalar todo
npm install
```

### Limpiar caché
```bash
# Limpiar y reinstalar
Remove-Item -Recurse -Force node_modules, apps\*\node_modules, packages\*\node_modules
npm install
```

---

## Tips 💡

1. **Usa `npm run dev`** - Es la forma más fácil y recomendada
2. **Los logs tienen colores** - Cyan = Frontend, Magenta = Backend
3. **Hot reload activado** - Los cambios se reflejan automáticamente
4. **Mantén las terminales abiertas** - Verás los logs en tiempo real
5. **Ctrl + C para detener** - Mata ambos procesos

---

## ¿Qué Pasa Cuando Ejecuto `npm run dev`?

1. ✅ Se inicia el servidor de Next.js en el puerto 3000
2. ✅ Se inicia el servidor Express en el puerto 4000
3. ✅ Ambos quedan escuchando cambios (hot reload)
4. ✅ Los logs de ambos aparecen en la misma terminal con colores
5. ✅ Presionando Ctrl+C se detienen ambos

---

## Siguiente Paso 🎯

Una vez que tengas todo corriendo:

1. Abre http://localhost:3000 en tu navegador
2. Verifica que el backend responda en http://localhost:4000/health
3. Empieza a desarrollar en:
   - `apps/web/src/` para el frontend
   - `apps/api/src/` para el backend

¡Happy coding! 🚀

