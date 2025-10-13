# 🎯 PULSE HUB - Inicio Visual

## 📋 Pasos para Iniciar (Primera Vez)

```
┌─────────────────────────────────────────────────────────┐
│  PASO 1: Crear Variables de Entorno                    │
└─────────────────────────────────────────────────────────┘

📁 apps/web/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   NEXT_PUBLIC_APP_NAME=PULSE HUB

📁 apps/api/.env
   PORT=4000
   NODE_ENV=development
   JWT_SECRET=tu-secreto-cambiar
   ALLOWED_ORIGINS=http://localhost:3000
   API_VERSION=v1

┌─────────────────────────────────────────────────────────┐
│  PASO 2: Instalar Dependencias (si no lo has hecho)    │
└─────────────────────────────────────────────────────────┘

   npm install

┌─────────────────────────────────────────────────────────┐
│  PASO 3: Iniciar el Proyecto                           │
└─────────────────────────────────────────────────────────┘

   npm run dev

   ✅ Listo! Ambos servidores están corriendo
```

---

## 🎨 Cómo se Ve Cuando Inicias

### UNA TERMINAL, TODO FUNCIONANDO:

```bash
$ npm run dev

[FRONTEND] ready - started server on 0.0.0.0:3000
[FRONTEND] ▲ Next.js 15.5.4
[FRONTEND] - Local: http://localhost:3000

[BACKEND] 🚀 Servidor corriendo en http://localhost:4000
[BACKEND] 📚 API Version: v1
[BACKEND] 🌍 Environment: development
```

Los logs aparecerán en **COLORES DIFERENTES**:
- 🔵 **FRONTEND** = Cyan (azul claro)
- 🟣 **BACKEND** = Magenta (rosa/morado)

---

## 🌐 URLs Activas

Una vez iniciado, tendrás acceso a:

```
┌──────────────────────────────────────────────────────────┐
│  FRONTEND (Next.js)                                      │
│  http://localhost:3000                                   │
│  → Aplicación web principal                              │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  BACKEND (Express API)                                   │
│  http://localhost:4000/health          [Health Check]    │
│  http://localhost:4000/api/v1/auth     [Autenticación]   │
│  http://localhost:4000/api/v1/users    [Usuarios]        │
└──────────────────────────────────────────────────────────┘
```

---

## 🎮 Comandos Disponibles

```bash
┌─────────────────────┬──────────────────────────────────┐
│ Comando             │ Descripción                      │
├─────────────────────┼──────────────────────────────────┤
│ npm run dev         │ ⭐ Inicia TODO (recomendado)    │
│ npm run dev:web     │ Solo frontend                    │
│ npm run dev:api     │ Solo backend                     │
│ npm run build       │ Build de producción              │
│ npm run lint        │ Verificar código                 │
│ npm run format      │ Formatear código                 │
└─────────────────────┴──────────────────────────────────┘
```

---

## 🔄 Flujo de Trabajo Típico

```
1. Abrir terminal en la raíz del proyecto
   📂 PULSE-HUB/

2. Ejecutar
   $ npm run dev

3. Esperar a que ambos servicios inicien (5-10 segundos)
   [FRONTEND] ready ✓
   [BACKEND] 🚀 Servidor corriendo ✓

4. Abrir navegador
   → http://localhost:3000 (ver la app)
   → http://localhost:4000/health (verificar API)

5. Desarrollar
   → Editar archivos en apps/web/src/ o apps/api/src/
   → Los cambios se reflejan automáticamente (Hot Reload)

6. Detener (cuando termines)
   → Presionar Ctrl + C en la terminal
   → Ambos servicios se detienen
```

---

## ✨ Ventajas de `npm run dev`

✅ **Una sola terminal** - No necesitas múltiples ventanas

✅ **Logs organizados** - Colores diferentes para cada servicio

✅ **Un solo comando** - Inicia y detiene todo junto

✅ **Hot Reload en ambos** - Cambios reflejados al instante

✅ **Fácil de usar** - Perfecto para desarrollo

---

## 🆚 Comparación

### ❌ ANTES (2 terminales):

```
Terminal 1:           Terminal 2:
$ cd apps/web         $ cd apps/api  
$ npm run dev         $ npm run dev

[logs frontend]       [logs backend]
```

### ✅ AHORA (1 terminal):

```
Terminal Única:
$ npm run dev

[FRONTEND] logs frontend...
[BACKEND] logs backend...
```

---

## 🎯 Verificación Rápida

### ¿Está funcionando el Frontend?
```bash
# Abrir en navegador
http://localhost:3000

# Deberías ver la página de Next.js
```

### ¿Está funcionando el Backend?
```bash
# Opción 1: Navegador
http://localhost:4000/health

# Opción 2: Terminal (PowerShell)
Invoke-WebRequest http://localhost:4000/health

# Respuesta esperada:
# {"status":"ok","message":"PULSE-HUB API is running"}
```

---

## 🛑 Cómo Detener

```
Presiona: Ctrl + C

Se detendrán:
✓ Frontend (puerto 3000)
✓ Backend (puerto 4000)
```

---

## 📝 Notas Importantes

1. **Primera vez**: Crea los archivos `.env` antes de iniciar

2. **Dependencias**: Asegúrate de haber ejecutado `npm install`

3. **Puertos**: Si los puertos 3000 o 4000 están ocupados, ciérralos:
   ```bash
   # Ver qué usa el puerto
   netstat -ano | findstr :3000
   
   # Matar proceso
   taskkill /PID <número> /F
   ```

4. **Problemas**: Si algo falla, revisa `START.md` o `GETTING_STARTED.md`

---

## 🚀 ¡Listo!

Con un solo comando tienes todo el stack corriendo:

```bash
npm run dev
```

**Frontend** → http://localhost:3000  
**Backend** → http://localhost:4000

¡Ahora puedes empezar a desarrollar! 🎉

