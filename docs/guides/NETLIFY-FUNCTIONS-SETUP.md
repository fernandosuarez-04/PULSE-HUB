# Guía de Setup: Netlify Functions para AI Chat

## Descripción

El chat de IA ahora usa Netlify Functions (REST API) en lugar de WebSocket, permitiendo que funcione completamente en Netlify sin necesidad de servicios externos.

## Arquitectura

```
Frontend (Next.js) → Netlify Function → OpenAI API
                                    → Coda API
```

**Archivos creados:**
- `apps/web/netlify/functions/chat.ts` - Handler principal
- `apps/web/netlify/functions/chat-utils.ts` - Utilidades compartidas
- `apps/web/netlify/tsconfig.json` - Config TypeScript para Functions
- `apps/web/src/shared/components/AIChat/useAIChat.ts` - Modificado para REST

## Testing Local

### Requisitos

1. Node.js 18+
2. npm o pnpm
3. Netlify CLI

### Paso 1: Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

### Paso 2: Configurar Variables de Entorno Locales

Crear archivo `.env` en la raíz de `apps/web/`:

```bash
# apps/web/.env
OPENAI_API_KEY=sk-proj-TU_API_KEY_AQUI
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=1000
CODA_API_KEY=TU_CODA_API_KEY_AQUI
CODA_DOC_ID=NXw4MLckAE
CODA_TABLE_ID=grid-IY4QlNqplg
```

### Paso 3: Instalar Dependencias

```bash
# Desde la raíz del proyecto
cd apps/web
npm install
```

### Paso 4: Ejecutar con Netlify Dev

```bash
# Desde apps/web
netlify dev
```

Esto iniciará:
- Frontend en `http://localhost:8888`
- Netlify Functions en `http://localhost:8888/.netlify/functions/`

### Paso 5: Probar el Chat

1. Abre `http://localhost:8888` en tu navegador
2. Abre el chat (botón flotante)
3. Escribe un mensaje
4. Deberías ver:
   - Mensaje del usuario aparece inmediatamente
   - Indicador "escribiendo..."
   - Respuesta del asistente

## Debugging

### Ver Logs de Functions

```bash
# Los logs aparecen en la terminal donde corriste netlify dev
# Ejemplo:
◈ Functions server is listening on 54321
◈ Request from ::1: POST /.netlify/functions/chat
   Processing message for session session-xxx: "Hola..."
   OpenAI response generated
```

### Problemas Comunes

#### Error: "OPENAI_API_KEY is not configured"

**Causa:** Variables de entorno no cargadas

**Solución:**
1. Verifica que el archivo `.env` exista en `apps/web/`
2. Reinicia `netlify dev`
3. O usa: `netlify dev --env .env`

#### Error: "Cannot find module 'openai'"

**Causa:** Dependencias no instaladas

**Solución:**
```bash
cd apps/web
npm install
```

#### Error 500 en la Function

**Causa:** Error en el código de la Function

**Solución:**
1. Revisa los logs en la terminal
2. Verifica las variables de entorno
3. Usa `console.log()` para debugging

## Despliegue en Netlify

### Paso 1: Configurar Variables de Entorno

En Netlify Dashboard:
1. Ve a **Site settings** → **Environment variables**
2. Agrega las siguientes variables:

```
OPENAI_API_KEY=sk-proj-TU_API_KEY_AQUI
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=1000
CODA_API_KEY=TU_CODA_API_KEY_AQUI
CODA_DOC_ID=NXw4MLckAE
CODA_TABLE_ID=grid-IY4QlNqplg
```

**Scope:** All scopes (Production, Deploy Previews, Branch deploys)

### Paso 2: Hacer Push al Repositorio

```bash
git add .
git commit -m "Migrar chat de WebSocket a Netlify Functions"
git push origin tu-rama
```

### Paso 3: Verificar el Deploy

1. Ve a **Deploys** en Netlify
2. Espera a que el deploy termine
3. Verifica los logs:
   ```
   Building Functions:
   ✓ chat
   ```

### Paso 4: Probar en Producción

1. Abre tu sitio en Netlify
2. Abre el chat
3. Envía un mensaje
4. Verifica que funcione correctamente

## Verificar que Funciona

### Checklist

- [ ] Frontend carga sin errores
- [ ] Chat muestra estado "Conectado"
- [ ] Puedes enviar mensajes
- [ ] Recibes respuestas del asistente
- [ ] El indicador "escribiendo..." funciona
- [ ] No hay errores en la consola del navegador
- [ ] La función de voz funciona (si la usas)

### Endpoints para Probar

#### Health Check (Manual)

```bash
# Test local
curl -X POST http://localhost:8888/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola", "sessionId": "test-123"}'

# Test producción
curl -X POST https://tu-sitio.netlify.app/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola", "sessionId": "test-123"}'
```

**Respuesta esperada:**
```json
{
  "response": "¡Hola! 👋 Soy tu asistente...",
  "sessionId": "test-123"
}
```

## Monitoreo

### Ver Logs en Producción

1. Netlify Dashboard → **Functions**
2. Click en `chat`
3. Ver **Function logs**

### Métricas

- **Invocations:** Número de llamadas a la función
- **Run time:** Tiempo de ejecución promedio
- **Errors:** Errores en las últimas 24 horas

## Límites de Netlify Functions (Plan Free)

- **Invocations:** 125,000 por mes
- **Runtime:** 50 horas por mes
- **Execution time:** 10 segundos por función

**Nota:** El plan free es suficiente para testing y proyectos pequeños. Para uso intensivo, considera el plan Pro.

## Migración Completa

### Lo que se Mantiene Igual

- ✅ Interfaz del chat (UI)
- ✅ Componentes de voz
- ✅ Funcionalidad completa
- ✅ Lógica de OpenAI + Coda

### Lo que Cambia

- ❌ WebSocket → ✅ REST API
- ❌ Backend separado → ✅ Netlify Functions
- ❌ Conexión persistente → ✅ Request/Response

### Experiencia del Usuario

- **Antes:** Mensaje aparece letra por letra (WebSocket streaming)
- **Ahora:** Mensaje aparece completo después de ~2-5 segundos
- **Tiempo total:** Prácticamente el mismo

## Ventajas de Netlify Functions

1. **Sin servicios externos:** Todo en Netlify
2. **Gratis:** Dentro de los límites del plan free
3. **Escalable:** Netlify se encarga del scaling
4. **Fácil de mantener:** Un solo servicio
5. **Logs integrados:** En el dashboard de Netlify

## Soporte

Si tienes problemas:

1. **Revisa los logs** en Netlify Dashboard
2. **Verifica variables de entorno** en Site Settings
3. **Prueba localmente** con `netlify dev`
4. **Revisa la consola del navegador** (F12)

## Recursos

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
- [OpenAI API Docs](https://platform.openai.com/docs/api-reference)
- [Coda API Docs](https://coda.io/developers/apis/v1)

