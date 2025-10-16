# 🔧 Configuración de Variables de Entorno Centralizadas

## ✅ **Configuración Completada**

He redireccionado la configuración del chat de IA para usar el archivo `.env` centralizado en la **raíz del proyecto** en lugar de archivos `.env.local` separados.

---

## 📂 **Ubicación del Archivo de Configuración**

```
PULSE-HUB/
  └── .env  ← ARCHIVO PRINCIPAL DE CONFIGURACIÓN
```

**Este archivo contiene TODAS las credenciales del proyecto** para ambas aplicaciones (`web` y `api`).

---

## 🔄 **Cambios Realizados**

### 1. ✅ **Eliminado `.env.local` de `apps/web`**
- Se eliminó el archivo `.env.local` local
- Ahora todo se centraliza en `.env` de la raíz

### 2. ✅ **Creado Script de Inicio Personalizado**
- **Archivo**: `apps/web/start-dev.js`
- **Función**: Carga las variables de entorno desde `.env` de la raíz antes de iniciar Next.js
- Muestra confirmación en consola de las variables cargadas

### 3. ✅ **Modificado `apps/web/package.json`**
- Script `dev` ahora usa: `node start-dev.js`
- Carga automáticamente el `.env` de la raíz

### 4. ✅ **Actualizado `apps/web/next.config.ts`**
- Configurado para exponer variables de entorno al cliente
- Las variables se pasan desde el proceso Node.js al navegador

---

## 📝 **Contenido Actual del `.env` (Raíz del Proyecto)**

```env
# ========================================== 
# PULSE HUB - Variables de Entorno Centralizadas 
# ========================================== 
 
# ===== OpenAI Configuration ===== 
OPENAI_API_KEY=sk-tu_api_key_aqui 
OPENAI_MODEL=gpt-4o-mini 
OPENAI_MAX_TOKENS=1000 
 
# ===== Coda API Configuration (opcional) ===== 
# CODA_API_KEY= 
# CODA_DOC_ID= 
# CODA_TABLE_ID= 
 
# ===== Email Configuration (opcional) ===== 
# EMAIL_USER=
# EMAIL_PASS=
# EMAIL_TO=

# ===== Next.js Public Variables =====
# NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## 🚀 **Cómo Usar**

### Paso 1: Configurar tu API Key de OpenAI

Edita el archivo `.env` en la raíz del proyecto:

```bash
# Abre el archivo .env en la raíz
code .env  # o usa tu editor favorito
```

Reemplaza `sk-tu_api_key_aqui` con tu API key real de OpenAI:

```env
OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXX  ← Tu API key aquí
```

### Paso 2: Iniciar el Proyecto

```bash
# Desde la raíz del proyecto:
npm run dev
```

El script `start-dev.js` mostrará en consola:

```
✅ Variables de entorno cargadas desde: C:\...\PULSE-HUB\.env
   OPENAI_API_KEY: ✓ Configurada
   OPENAI_MODEL: gpt-4o-mini

🚀 Iniciando Next.js en modo desarrollo...
```

---

## 🔍 **Verificación**

Para verificar que las variables se están cargando correctamente:

1. Inicia el servidor: `npm run dev`
2. Busca en la consola el mensaje: **"✅ Variables de entorno cargadas desde..."**
3. Verifica que muestre: **"OPENAI_API_KEY: ✓ Configurada"**

Si ves **"✗ No configurada"**, significa que falta la API key en el archivo `.env`.

---

## 🎯 **Beneficios de Esta Configuración**

✅ **Centralizada**: Un solo archivo `.env` para todo el proyecto  
✅ **Compartida**: Ambas apps (`web` y `api`) usan las mismas credenciales  
✅ **Versionable**: El archivo `.env` se puede versionar (sin credenciales sensibles)  
✅ **Visible**: Muestra confirmación en consola de qué variables se cargaron  
✅ **Mantenible**: Más fácil de mantener que múltiples archivos `.env`

---

## 📋 **Archivos Modificados**

1. ✅ **Eliminado**: `apps/web/.env.local`
2. ✅ **Creado**: `apps/web/start-dev.js` - Script de inicio personalizado
3. ✅ **Modificado**: `apps/web/package.json` - Script `dev`
4. ✅ **Modificado**: `apps/web/next.config.ts` - Exportación de variables

---

## ⚠️ **Importante: Seguridad**

### Variables Sensibles
El archivo `.env` está en `.gitignore` y **NO debe** contener credenciales reales en el repositorio.

### Para Desarrollo Local
Cada desarrollador debe:
1. Copiar el archivo `.env` de ejemplo
2. Agregar sus propias credenciales
3. **NUNCA** commitear credenciales reales

### Para Producción
Usa variables de entorno del servidor o servicio de hosting (Netlify, Vercel, etc.)

---

## 🐛 **Troubleshooting**

### Problema: "OPENAI_API_KEY: ✗ No configurada"

**Solución**:
1. Abre `.env` en la raíz del proyecto
2. Verifica que `OPENAI_API_KEY` esté configurada
3. Verifica que no haya espacios antes/después del `=`
4. Reinicia el servidor

### Problema: El chat no responde

**Soluciones**:
1. Verifica que el servidor esté corriendo (`npm run dev`)
2. Revisa la consola para ver si las variables se cargaron
3. Verifica que tu API key sea válida en OpenAI
4. Verifica que tengas créditos en tu cuenta de OpenAI

### Problema: Error "Cannot find module 'dotenv'"

**Solución**:
```bash
cd apps/web
npm install
```

---

## 📚 **Estructura del Proyecto**

```
PULSE-HUB/
├── .env                          ← ARCHIVO PRINCIPAL DE CONFIGURACIÓN
├── apps/
│   ├── web/
│   │   ├── start-dev.js         ← Script que carga .env de la raíz
│   │   ├── next.config.ts       ← Expone variables a Next.js
│   │   └── package.json         ← Script dev modificado
│   └── api/
│       └── (usa .env de la raíz automáticamente)
└── package.json                  ← Scripts principales del monorepo
```

---

## ✅ **Estado Actual**

- ✅ Archivo `.env` centralizado en la raíz
- ✅ Script de inicio personalizado funcionando
- ✅ Variables de entorno compartidas entre apps
- ✅ Confirmación visual en consola
- ⚠️ **Pendiente**: Agregar tu API key de OpenAI real

---

## 🎓 **Próximos Pasos**

1. **AHORA**: Edita `.env` y agrega tu API key de OpenAI
2. **LUEGO**: Ejecuta `npm run dev` desde la raíz
3. **VERIFICA**: Que veas el mensaje de confirmación en consola
4. **PRUEBA**: El chat debe funcionar correctamente

---

**Fecha de Configuración**: ${new Date().toLocaleDateString('es-ES')}  
**Estado**: ✅ Configuración completada - Requiere API key del usuario

