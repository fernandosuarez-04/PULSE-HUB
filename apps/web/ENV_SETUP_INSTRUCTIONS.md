# 🔧 Configuración de Variables de Entorno

## ⚠️ Problema Actual
El chat de IA no funciona porque faltan las variables de entorno necesarias.

## 📋 Solución

### Paso 1: Crear archivo `.env.local`

Crea un archivo llamado `.env.local` en la carpeta `apps/web/` con el siguiente contenido:

```env
# ===== OpenAI Configuration =====
# Obtén tu API key en: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-tu_api_key_aqui
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=1000

# ===== Coda API Configuration (OPCIONAL) =====
# Solo necesario si usas la integración con Coda
# CODA_API_KEY=
# CODA_DOC_ID=
# CODA_TABLE_ID=

# ===== Email Configuration (OPCIONAL) =====
# Solo necesario para el formulario de contacto
# EMAIL_USER=
# EMAIL_PASS=
# EMAIL_TO=
```

### Paso 2: Obtener tu API Key de OpenAI

1. Ve a https://platform.openai.com/api-keys
2. Inicia sesión o crea una cuenta
3. Crea una nueva API key
4. Copia la key y pégala en el archivo `.env.local` reemplazando `sk-tu_api_key_aqui`

### Paso 3: Reiniciar el servidor

```bash
# Detén el servidor actual (Ctrl+C)
# Luego reinicia:
cd apps/web
npm run dev
```

## 🐛 Problemas Actuales Identificados

### 1. Error de Red en Reconocimiento de Voz
**Causa**: El Web Speech API de Google requiere conexión a internet activa.

**Solución**: 
- Verifica que tu conexión a internet esté funcionando
- El reconocimiento de voz NO funciona offline (es una limitación del navegador)

### 2. Chat No Funciona
**Causa**: Falta la configuración de OpenAI API Key

**Solución**: Seguir los pasos 1-3 arriba ☝️

## 📝 Notas Importantes

- El archivo `.env.local` NO debe subirse a git (ya está en .gitignore)
- La API de OpenAI tiene costo según uso (pero gpt-4o-mini es muy económico)
- El reconocimiento de voz SIEMPRE requiere internet (no hay solución offline)

## ✅ Verificación

Después de configurar, deberías ver:
- ✅ El chat responde a mensajes de texto
- ✅ El reconocimiento de voz funciona (si hay internet)
- ✅ El agente responde con síntesis de voz

