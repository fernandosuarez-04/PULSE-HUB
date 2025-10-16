# 🔧 Solución: Problema del Chat de Voz del Agente Web

## 📋 Diagnóstico

He identificado **DOS problemas principales** que causaban que el chat de voz no funcionara correctamente:

### 1. ❌ **Falta de Variables de Entorno (OpenAI API Key)**
**Síntoma**: El chat no responde o muestra errores al enviar mensajes

**Causa**: Falta configurar la API key de OpenAI en el archivo `.env` de la raíz

**Solución Aplicada**: ✅ Configuré el proyecto para usar el archivo `.env` centralizado en la raíz

### 2. ⚠️ **Error de Red en Reconocimiento de Voz**
**Síntoma**: "Error de red. Verifica tu conexión a internet." cuando intentas usar la voz

**Causa**: El Web Speech API de Google requiere conexión a internet activa para funcionar

**Solución**: Verificar conexión a internet (el reconocimiento de voz NO funciona offline)

---

## ✅ Pasos para Completar la Configuración

### Paso 1: Obtener API Key de OpenAI

1. Ve a: https://platform.openai.com/api-keys
2. Inicia sesión o crea una cuenta
3. Haz clic en "Create new secret key"
4. Copia la API key (se mostrará solo una vez)

### Paso 2: Editar el Archivo `.env` (En la Raíz del Proyecto)

Abre el archivo `.env` en la **raíz del proyecto** (no en `apps/web`) y reemplaza `sk-tu_api_key_aqui` con tu API key real:

```env
# OpenAI Configuration 
OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXX  # <-- Pega tu API key aquí
OPENAI_MODEL=gpt-4o-mini 
OPENAI_MAX_TOKENS=1000
```

**Ubicación del archivo**: `PULSE-HUB/.env` (raíz del proyecto)

### Paso 3: Reiniciar el Servidor de Desarrollo

```bash
# 1. Detén el servidor actual (Ctrl+C en la terminal donde está corriendo)

# 2. Reinicia el servidor desde la raíz del proyecto:
cd "C:\Users\fysg5\OneDrive\Escritorio\Trabajo\PULSE HUB\PULSE-HUB"
npm run dev

# O si estás en apps/web:
cd apps/web
npm run dev
```

### Paso 4: Verificar que Todo Funciona

1. ✅ Abre el navegador en `http://localhost:3000`
2. ✅ Haz clic en el botón del chat (burbuja flotante)
3. ✅ Escribe un mensaje de prueba → Debe responder
4. ✅ Haz clic en el ícono del micrófono → Debe escuchar tu voz
5. ✅ Habla algo → Debe transcribir y responder con voz

---

## 🐛 Troubleshooting

### Problema: "Error de red. Verifica tu conexión a internet"

**Causas posibles**:
1. No tienes conexión a internet activa
2. El firewall está bloqueando el acceso al Web Speech API de Google
3. Estás usando un navegador que no soporta Web Speech API

**Soluciones**:
- ✅ Verifica tu conexión a internet (ping google.com)
- ✅ Usa Chrome o Edge (mejor soporte)
- ✅ Verifica que el navegador tenga permisos para acceder al micrófono

### Problema: El chat no responde después de configurar

**Soluciones**:
1. Verifica que reiniciaste el servidor
2. Verifica que la API key esté correcta (sin espacios extras)
3. Verifica que tengas créditos en tu cuenta de OpenAI
4. Revisa la consola del navegador (F12) para ver errores específicos

### Problema: El reconocimiento de voz se detiene automáticamente

**Causa**: Comportamiento normal del Web Speech API

**Explicación**: El API está configurado con `continuous: false` (línea 73 de `useVoiceRecognition.ts`), lo que significa que:
- Se detiene automáticamente después de detectar que terminaste de hablar
- Envía el mensaje automáticamente cuando detecta el final
- Esto es intencional para una conversación más fluida

**No requiere corrección** - es el comportamiento esperado.

---

## 📝 Archivos Modificados/Creados

1. ✅ **`apps/api/node_modules/`** - Instalé el módulo `openai` faltante
2. ✅ **`.env`** - Archivo centralizado en la raíz (YA EXISTÍA, solo necesita tu API key)
3. ✅ **`apps/web/start-dev.js`** - Script que carga el `.env` de la raíz
4. ✅ **`apps/web/next.config.ts`** - Configuración para exponer variables
5. ✅ **`apps/web/package.json`** - Script `dev` modificado
6. ✅ **`CONFIGURACION_ENV_CENTRALIZADA.md`** - Documentación completa
7. ✅ **`SOLUCION_CHAT_VOZ.md`** - Este documento

---

## 💡 Información Adicional

### Costos de OpenAI
- El modelo `gpt-4o-mini` es muy económico (~$0.15 por 1M tokens)
- Una conversación típica usa ~500-1000 tokens
- Costo estimado: $0.0001 - $0.0002 por conversación

### Limitaciones del Reconocimiento de Voz
- ⚠️ **SIEMPRE requiere internet** (usa servidores de Google)
- ⚠️ No hay forma de hacerlo funcionar offline
- ⚠️ La calidad depende de la conexión a internet

### Alternativas (si el problema persiste)
Si el Web Speech API no funciona:
1. Usar solo entrada de texto (funciona sin voz)
2. Implementar un servicio de reconocimiento de voz alternativo (más complejo)
3. Usar una API de speech-to-text de pago (Google Cloud, Azure, etc.)

---

## 🎯 Próximos Pasos

1. **AHORA**: Obtén tu API key de OpenAI y actualiza `.env.local`
2. **LUEGO**: Reinicia el servidor
3. **PRUEBA**: El chat debe funcionar completamente
4. **OPCIONAL**: Configura las variables de Coda si quieres usar esa integración

---

## ❓ ¿Necesitas Ayuda?

Si después de seguir estos pasos el problema persiste:
1. Revisa la consola del navegador (F12 → Console)
2. Revisa la consola del servidor (donde corre npm run dev)
3. Comparte los errores específicos que veas

---

**Fecha**: ${new Date().toLocaleDateString('es-ES')}
**Estado**: ✅ Configuración inicial completada - Requiere API key de usuario

