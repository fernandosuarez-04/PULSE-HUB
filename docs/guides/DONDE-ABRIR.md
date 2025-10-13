# 🌐 ¿Dónde Abrir PULSE HUB?

## 📍 URLs Para Desarrollo

### 🎨 FRONTEND (Aplicación Web)

**URL:** La que aparezca en los logs de [FRONTEND], ejemplo:
```
http://localhost:3000
O
http://localhost:54112  (si el 3000 está ocupado)
```

**¿Qué verás aquí?**
- ✅ La interfaz de usuario completa
- ✅ Páginas web del proyecto
- ✅ Componentes React
- ✅ Formularios, botones, etc.
- ✅ Todo lo visual de la aplicación

**¿Cómo encontrar la URL?**
Busca en los logs de [FRONTEND]:
```
[FRONTEND]    ▲ Next.js 15.5.4
[FRONTEND]    - Local:        http://localhost:3000  ← ESTA URL
[FRONTEND]    - Network:      http://192.168.0.100:3000
```

---

### 🔧 BACKEND (API REST)

**URL:**
```
http://localhost:4000/health
```

**¿Qué verás aquí?**
```json
{
  "status": "ok",
  "message": "PULSE-HUB API is running"
}
```

**Otros Endpoints Disponibles:**
```
http://localhost:4000/api/v1/auth/login    - Login
http://localhost:4000/api/v1/auth/register - Registro
http://localhost:4000/api/v1/users         - Usuarios
```

**¿Cómo probar?**
- Navegador (para endpoints GET)
- Postman / Thunder Client (para POST, PUT, DELETE)
- Desde el Frontend (automáticamente)

---

## 🎯 Flujo de Trabajo Normal

### 1. Iniciar el Proyecto
```bash
.\start-dev.bat
# O
npm run dev
```

### 2. Esperar a que Carguen
Verás en los logs:
```
[FRONTEND] ✓ Ready in X seconds
[BACKEND] 🚀 Servidor corriendo en http://localhost:4000
```

### 3. Abrir el Navegador

#### Para Desarrollo Frontend:
```
→ Abre: http://localhost:3000 (o la URL del log)
→ Verás: La aplicación web
→ Edita: Archivos en apps/web/src/
→ Resultado: Los cambios se reflejan automáticamente (Hot Reload)
```

#### Para Probar el Backend:
```
→ Abre: http://localhost:4000/health
→ Verás: { "status": "ok", ... }
→ Edita: Archivos en apps/api/src/
→ Resultado: El servidor se reinicia automáticamente (Nodemon)
```

---

## 💻 Desarrollo Práctico

### Escenario 1: Desarrollar Frontend

```
1. Inicia los servidores (.\start-dev.bat)
2. Abre http://localhost:3000 en tu navegador
3. Edita apps/web/src/app/page.tsx
4. Guarda el archivo
5. El navegador se actualiza automáticamente ✅
```

### Escenario 2: Desarrollar Backend

```
1. Inicia los servidores (.\start-dev.bat)
2. Abre Postman o Thunder Client
3. Haz una petición a http://localhost:4000/api/v1/auth/login
4. Edita apps/api/src/features/auth/auth.service.ts
5. Guarda el archivo
6. El servidor se reinicia automáticamente ✅
7. Vuelve a hacer la petición para ver los cambios
```

### Escenario 3: Frontend + Backend Juntos

```
1. Inicia los servidores (.\start-dev.bat)
2. Abre http://localhost:3000 en tu navegador
3. El Frontend hace peticiones al Backend automáticamente
4. Puedes ver las peticiones en los logs de [BACKEND]
5. Edita cualquier archivo y se refleja automáticamente ✅
```

---

## 🔍 ¿Cómo Verificar que Todo Funciona?

### ✅ Frontend Funcionando
```bash
# En el navegador:
http://localhost:3000

# Deberías ver:
- La página de inicio de Next.js
- O tu página personalizada si ya editaste
```

### ✅ Backend Funcionando
```bash
# En el navegador:
http://localhost:4000/health

# Deberías ver:
{
  "status": "ok",
  "message": "PULSE-HUB API is running"
}
```

### ✅ Comunicación Frontend-Backend
```bash
# El Frontend está configurado para hablar con el Backend
# Verifica en apps/web/.env.local:
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Cuando el Frontend haga peticiones, verás logs en [BACKEND]
```

---

## 📱 Acceso Desde Otros Dispositivos (Opcional)

### Desde tu celular o tablet:

1. Busca en los logs la URL Network:
```
[FRONTEND] - Network: http://192.168.0.100:3000
```

2. Abre esa URL en tu celular (debe estar en la misma red WiFi)

3. ¡Verás el Frontend en tu celular! 📱

---

## 🎨 Estructura Visual

```
┌─────────────────────────────────────────┐
│  TU NAVEGADOR                           │
│  http://localhost:3000                  │
│                                         │
│  ┌───────────────────────────────┐     │
│  │  🎨 FRONTEND (Next.js)        │     │
│  │  - Páginas                    │     │
│  │  - Componentes                │     │
│  │  - UI/UX                      │     │
│  └───────────────────────────────┘     │
│               │                         │
│               ▼ (hace peticiones)       │
│  ┌───────────────────────────────┐     │
│  │  🔧 BACKEND (Express API)     │     │
│  │  http://localhost:4000        │     │
│  │  - Endpoints REST             │     │
│  │  - Lógica de negocio          │     │
│  │  - Base de datos (futuro)     │     │
│  └───────────────────────────────┘     │
└─────────────────────────────────────────┘
```

---

## 🚀 Resumen Rápido

| Componente | URL | ¿Qué Abro? | ¿Para Qué? |
|------------|-----|------------|------------|
| **Frontend** | http://localhost:3000 | Navegador | Ver la aplicación web, desarrollar UI |
| **Backend** | http://localhost:4000/health | Navegador o Postman | Probar endpoints, verificar API |
| **Logs Frontend** | Terminal [FRONTEND] | - | Ver errores de React/Next.js |
| **Logs Backend** | Terminal [BACKEND] | - | Ver peticiones HTTP, errores |

---

## 💡 Tips

1. **Siempre abre el Frontend en el navegador** para desarrollo normal
2. **El Backend funciona "detrás de escena"** - no necesitas abrirlo constantemente
3. **Usa las Developer Tools** del navegador (F12) para ver peticiones al Backend
4. **Los cambios se reflejan automáticamente** - solo guarda y espera 1-2 segundos
5. **Si algo no funciona**, revisa los logs de [FRONTEND] y [BACKEND]

---

## 🎉 ¡Listo para Desarrollar!

Ahora sabes:
- ✅ Dónde abrir cada componente
- ✅ Qué verás en cada URL
- ✅ Cómo trabajan juntos Frontend y Backend
- ✅ Cómo verificar que todo funciona

**¡A programar!** 🚀

