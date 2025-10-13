# 🚀 Solución Rápida - PULSE HUB

## ⚠️ Problema Actual

`concurrently` no se instala correctamente debido a la configuración de workspaces de npm.

## ✅ Soluciones Disponibles

### **OPCIÓN 1: Scripts de Windows (RECOMENDADO)** ⭐

He creado scripts que inician ambos servidores automáticamente:

#### Usando Batch (.bat):
```bash
.\start-dev.bat
```

#### Usando PowerShell (.ps1):
```bash
.\start-dev.ps1
```

Ambos scripts:
- ✅ Abren 2 ventanas separadas (Frontend y Backend)
- ✅ Inician ambos servicios automáticamente
- ✅ Muestran los logs claramente
- ✅ Fáciles de cerrar (cierra las ventanas)

---

### **OPCIÓN 2: Manualmente (2 terminales)**

#### Terminal 1 - Frontend:
```bash
cd apps/web
npm run dev
```
URL: http://localhost:3000

#### Terminal 2 - Backend:
```bash
cd apps/api
npm run dev
```
URL: http://localhost:4000

---

### **OPCIÓN 3: Instalar Concurrently Global**

```bash
npm install -g concurrently
npm run dev
```

---

## 📝 ANTES DE INICIAR (MUY IMPORTANTE)

### 1. Crear archivo `apps/web/.env.local`:

```bash
# Opción A: Crear con PowerShell
@"
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=PULSE HUB
"@ | Out-File -FilePath "apps\web\.env.local" -Encoding utf8
```

O créalo manualmente con este contenido:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=PULSE HUB
```

### 2. Crear archivo `apps/api/.env`:

```bash
# Opción A: Crear con PowerShell
@"
PORT=4000
NODE_ENV=development
JWT_SECRET=pulse-hub-secret-key-change-in-production
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=pulse-hub-refresh-secret-key-change
REFRESH_TOKEN_EXPIRES_IN=30d
ALLOWED_ORIGINS=http://localhost:3000
API_VERSION=v1
"@ | Out-File -FilePath "apps\api\.env" -Encoding utf8
```

O créalo manualmente con este contenido:
```env
PORT=4000
NODE_ENV=development
JWT_SECRET=pulse-hub-secret-key-change-in-production
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=pulse-hub-refresh-secret-key-change
REFRESH_TOKEN_EXPIRES_IN=30d
ALLOWED_ORIGINS=http://localhost:3000
API_VERSION=v1
```

---

## 🎯 Inicio Rápido

### Paso 1: Crear archivos .env
Ejecuta estos comandos en PowerShell desde la raíz del proyecto:

```powershell
# Frontend .env
@"
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=PULSE HUB
"@ | Out-File -FilePath "apps\web\.env.local" -Encoding utf8

# Backend .env
@"
PORT=4000
NODE_ENV=development
JWT_SECRET=pulse-hub-secret-key-change-in-production
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=pulse-hub-refresh-secret-key-change
REFRESH_TOKEN_EXPIRES_IN=30d
ALLOWED_ORIGINS=http://localhost:3000
API_VERSION=v1
"@ | Out-File -FilePath "apps\api\.env" -Encoding utf8
```

### Paso 2: Iniciar el proyecto

**Opción A (Más fácil):**
```bash
.\start-dev.bat
```

**Opción B (PowerShell):**
```bash
.\start-dev.ps1
```

**Opción C (Manual):**
```bash
# Terminal 1
cd apps/web
npm run dev

# Terminal 2 (nueva terminal)
cd apps/api
npm run dev
```

### Paso 3: Verificar

- Frontend: http://localhost:3000
- Backend: http://localhost:4000/health

---

## 🔧 Solución al Problema de Concurrently

El problema es que npm workspaces a veces no instala las dependencias del root correctamente en Windows.

### Solución Permanente (Opcional):

1. **Instalar concurrently globalmente:**
   ```bash
   npm install -g concurrently
   ```

2. **Luego usar:**
   ```bash
   npm run dev
   ```

O simplemente usa los scripts `.bat` o `.ps1` que he creado. ✅

---

## ✨ Recomendación

**USA LOS SCRIPTS:** `.\start-dev.bat` o `.\start-dev.ps1`

Son la forma más simple y confiable de iniciar el proyecto en Windows, sin depender de concurrently.

---

## 📚 Archivos Creados

- `start-dev.bat` - Script de Batch para Windows
- `start-dev.ps1` - Script de PowerShell (más bonito)
- `SOLUCION-RAPIDA.md` - Esta guía

---

## 🎉 ¡Listo!

Una vez que hayas creado los archivos `.env` y ejecutado uno de los scripts, tendrás:

✅ Frontend corriendo en http://localhost:3000  
✅ Backend corriendo en http://localhost:4000  
✅ Hot reload activado en ambos  
✅ Logs visibles en ventanas separadas  

¡Happy coding! 🚀

