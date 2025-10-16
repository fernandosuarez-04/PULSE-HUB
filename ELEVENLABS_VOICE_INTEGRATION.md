# 🎙️ Integración de ElevenLabs - Voz de Alta Calidad

## ✅ **Cambios Completados**

He reemplazado completamente la voz de **Microsoft Sabina** (Web Speech API) por la API de **ElevenLabs** para obtener una voz de alta calidad, natural y profesional.

---

## 🔄 **Qué Se Cambió**

### **ANTES** (Web Speech API - Microsoft Sabina):
```typescript
// Usaba voces del navegador (Google/Microsoft)
const synthesis = useVoiceSynthesis();  
// Voz: Microsoft Sabina (Spanish - Mexico)
```

### **AHORA** (ElevenLabs API):
```typescript
// Usa API de ElevenLabs para voz profesional
const synthesis = useElevenLabsSynthesis();  
// Voz: ElevenLabs AI Voice (high-quality)
```

---

## 📁 **Archivos Creados/Modificados**

### **Nuevos Archivos**:
1. ✅ `apps/web/src/shared/components/AIChat/useElevenLabsSynthesis.ts`
   - Nuevo hook personalizado para ElevenLabs
   - Manejo de streaming de audio
   - Limpieza de markdown
   - Barge-in (interrupción)

### **Archivos Modificados**:
2. ✅ `apps/web/src/shared/components/AIChat/ChatWindow.tsx`
   - Cambiado de `useVoiceSynthesis` a `useElevenLabsSynthesis`
   - Actualizado manejo de promesas
   - Texto actualizado: "ElevenLabs AI Voice"

3. ✅ `apps/web/src/shared/components/AIChat/index.ts`
   - Exportación del nuevo hook

### **Dependencias**:
4. ✅ `apps/web/package.json`
   - Instalado: `elevenlabs` (SDK oficial)

---

## 🔑 **Variables de Entorno**

Las variables ya están configuradas en `.env` (raíz del proyecto):

```env
# ELEVENLABS
NEXT_PUBLIC_ELEVENLABS_API_KEY=sk_dd0d1757269405cd26d5e22fb14c54d2f49c4019fd8e86d0
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
NEXT_PUBLIC_ELEVENLABS_MODEL_ID=eleven_multilingual_v2
```

### **Detalles**:
- **API Key**: Autenticación con ElevenLabs
- **Voice ID**: `EXAVITQu4vr4xnSDxMaL` (voz específica configurada)
- **Model ID**: `eleven_multilingual_v2` (modelo multilingüe V2)

---

## 🚀 **Cómo Funciona**

### **1. Flujo de Síntesis de Voz**:

```
Mensaje del agente
    ↓
Limpiar markdown
    ↓
Llamar API de ElevenLabs
    ↓
Recibir audio MP3
    ↓
Reproducir en navegador
```

### **2. Características Implementadas**:

✅ **Text-to-Speech de Alta Calidad**
- Voz natural y profesional
- Soporte multilingüe (español optimizado)

✅ **Limpieza de Markdown**
- Elimina asteriscos, headers, listas
- Texto limpio para habla natural

✅ **Streaming de Audio**
- Audio MP3 de alta calidad
- Reproducción fluida

✅ **Barge-In (Interrupción)**
- El usuario puede interrumpir al agente hablando
- Detiene inmediatamente la reproducción

✅ **Manejo de Errores**
- API key inválida
- Límite de cuota
- Errores de reproducción

---

## 🎯 **Probar la Nueva Voz**

### **Paso 1: Reiniciar el Servidor**

```bash
# 1. Detén el servidor actual (Ctrl+C)

# 2. Reinicia
npm run dev
```

### **Paso 2: Verificar en la Consola**

Deberías ver:

```
📋 Sincronizando variables de entorno...
✅ Variables de entorno sincronizadas correctamente

📦 Variables cargadas:
   OPENAI_API_KEY: ✓ Configurada
   
   [... ElevenLabs variables también cargadas ...]
```

### **Paso 3: Probar el Chat**

1. Abre http://localhost:3000
2. Haz clic en el chat flotante
3. Escribe un mensaje (ejemplo: "Hola, ¿cómo estás?")
4. **Observa**:
   - El texto del agente aparece ✅
   - Se muestra "🗣️ Hablando..." en el header ✅
   - Se reproduce la voz de **ElevenLabs** 🎙️ ✅

### **Paso 4: Verificar la Voz**

En el header del chat deberías ver:

```
Asistente IA
🗣️ Hablando...
🎙️ ElevenLabs AI Voice  ← NUEVA VOZ
```

---

## 🔍 **Mensajes de la Consola**

### **Cuando el Agente Habla**:

```
🗣️ Starting ElevenLabs speech: Hola, te cuento que...
🎙️ ElevenLabs audio playing
✅ ElevenLabs finished speaking
```

### **Si Hay Errores**:

```
❌ ElevenLabs API error: 401
// Error: API key inválida

❌ ElevenLabs API error: 429
// Error: Límite de cuota alcanzado
```

---

## ⚙️ **Configuración de Voz**

En `useElevenLabsSynthesis.ts` (líneas 140-147):

```typescript
voice_settings: {
  stability: 0.5,           // Estabilidad de la voz (0-1)
  similarity_boost: 0.75,   // Boost de similitud (0-1)
  style: 0.0,               // Estilo de habla (0-1)
  use_speaker_boost: true,  // Mejorar claridad del hablante
}
```

### **Para Ajustar la Voz**:

- **stability**: Mayor = más estable, menor = más expresiva
- **similarity_boost**: Mayor = más similar a la voz original
- **style**: Mayor = más estilizada
- **use_speaker_boost**: Mejorar claridad (recomendado: true)

---

## 📊 **Comparación: Web Speech API vs ElevenLabs**

| Característica | Web Speech API | ElevenLabs |
|----------------|----------------|------------|
| **Calidad** | Buena | **Excelente** |
| **Naturalidad** | Sintética | **Muy Natural** |
| **Latencia** | Baja | Media |
| **Offline** | ❌ No | ❌ No |
| **Costo** | Gratis | Pago |
| **Personalización** | Limitada | **Alta** |
| **Idiomas** | Muchos | **Muchos** |

---

## 💰 **Costos de ElevenLabs**

### **Plan Gratuito**:
- **10,000 caracteres/mes** gratis
- Voz de alta calidad
- Ideal para desarrollo y pruebas

### **Planes Pagos**:
- **Starter**: $5/mes - 30,000 caracteres
- **Creator**: $22/mes - 100,000 caracteres
- **Pro**: $99/mes - 500,000 caracteres

### **Estimación de Uso**:
- Respuesta típica del agente: **50-200 caracteres**
- **100 conversaciones** ≈ **5,000-20,000 caracteres**
- Plan gratuito: ~50-200 conversaciones/mes

---

## 🔧 **Troubleshooting**

### **Problema: "ElevenLabs no está configurado"**

**Solución**:
```bash
# Verifica que las variables estén en .env
cat .env | grep ELEVENLABS

# Deberías ver:
NEXT_PUBLIC_ELEVENLABS_API_KEY=sk_...
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=...
NEXT_PUBLIC_ELEVENLABS_MODEL_ID=...
```

### **Problema: "API key de ElevenLabs inválida"**

**Causas**:
1. API key incorrecta o expirada
2. Variables no sincronizadas

**Solución**:
```bash
# 1. Verifica la API key en ElevenLabs dashboard
# 2. Actualiza .env si es necesario
# 3. Reinicia el servidor
npm run dev
```

### **Problema: "Límite de cuota de ElevenLabs alcanzado"**

**Solución**:
1. Espera al siguiente mes (plan gratuito)
2. Actualiza a plan pago
3. Temporal: vuelve a usar Web Speech API (ver abajo)

---

## 🔄 **Volver a Web Speech API (Opcional)**

Si necesitas volver a la voz de Microsoft Sabina:

```typescript
// En: apps/web/src/shared/components/AIChat/ChatWindow.tsx

// Cambia:
import { useElevenLabsSynthesis } from './useElevenLabsSynthesis';
const synthesis = useElevenLabsSynthesis();

// Por:
import { useVoiceSynthesis } from './useVoiceSynthesis';
const synthesis = useVoiceSynthesis();
```

---

## ✅ **Checklist de Verificación**

Después de reiniciar el servidor:

- [ ] Variables de entorno sincronizadas
- [ ] Servidor corriendo sin errores
- [ ] Chat responde a mensajes de texto
- [ ] Voz se reproduce (ElevenLabs)
- [ ] Se muestra "🎙️ ElevenLabs AI Voice"
- [ ] Reconocimiento de voz funciona
- [ ] Barge-in funciona (interrumpir al agente)

---

## 🎓 **Próximos Pasos**

### **Para Personalizar la Voz**:

1. Ve a https://elevenlabs.io/app/voice-lab
2. Selecciona o crea una voz
3. Copia el **Voice ID**
4. Actualiza en `.env`:
   ```env
   NEXT_PUBLIC_ELEVENLABS_VOICE_ID=tu_nuevo_voice_id
   ```
5. Reinicia el servidor

### **Para Cambiar el Modelo**:

Modelos disponibles:
- `eleven_multilingual_v2` (actual, recomendado)
- `eleven_monolingual_v1` (inglés solamente, más rápido)
- `eleven_turbo_v2` (más rápido, calidad similar)

---

## 📚 **Recursos**

- **ElevenLabs Docs**: https://elevenlabs.io/docs
- **Voice Lab**: https://elevenlabs.io/app/voice-lab
- **API Reference**: https://elevenlabs.io/docs/api-reference

---

**✅ ¡Listo!** La voz de ElevenLabs está completamente integrada y lista para usar.

**🎯 Reinicia el servidor y prueba la nueva voz de alta calidad!** 🚀

