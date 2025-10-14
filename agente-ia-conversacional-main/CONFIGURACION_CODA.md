# Configuración de Coda para el Agente de Clima

## Problema Identificado

Tu agente de clima no está guardando los datos en la tabla de Coda porque faltan las variables de entorno necesarias.

## Solución

### 1. Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# API Key de OpenWeatherMap
OPENWEATHER_API_KEY=tu_api_key_aqui

# Configuración de Coda
CODA_API_KEY=tu_coda_api_key_aqui
CODA_DOC_ID=tu_doc_id_aqui
CODA_TABLE_ID=grid-U-9NXo6GH5
```

### 2. Obtener credenciales de OpenWeatherMap

1. Ve a [OpenWeatherMap API](https://openweathermap.org/api)
2. Regístrate y obtén tu API key
3. Agrega la API key al archivo .env

### 3. Obtener credenciales de Coda

#### API Key de Coda:
1. Ve a [Coda Developers](https://coda.io/developers)
2. Haz clic en "Create new token"
3. Dale un nombre descriptivo al token
4. Copia el token generado
5. Agrega el token al archivo .env como `CODA_API_KEY`

#### ID del Documento:
1. Abre tu documento de Coda en el navegador
2. Copia el ID del documento desde la URL
   - Ejemplo: `https://coda.io/d/[DOC_ID]/tabla`
3. Agrega el ID al archivo .env como `CODA_DOC_ID`

#### ID de la Tabla:
1. Ve a tu tabla en Coda
2. Copia el ID de la tabla desde la URL
   - Ejemplo: `https://coda.io/d/DOC_ID/t/TABLE_ID`
3. Agrega el ID al archivo .env como `CODA_TABLE_ID`

### 4. Estructura de la tabla en Coda

Tu tabla debe tener las siguientes columnas:
- **ciudad** (texto)
- **temperatura** (número)
- **hora_consulta** (fecha/hora)
- **notes** (texto)

### 5. Verificar la configuración

Ejecuta el script de diagnóstico:

```bash
node diagnostico_coda.js
```

Este script verificará:
- ✅ Variables de entorno configuradas
- ✅ Conectividad con Coda
- ✅ Permisos de escritura
- ✅ Estructura de la tabla

### 6. Reiniciar el servidor

Después de configurar las variables de entorno:

```bash
npm run dev
```

## Mejoras Implementadas

He mejorado el código para:

1. **Mejor logging**: Ahora verás mensajes claros cuando se intenta guardar en Coda
2. **Diagnóstico detallado**: Mensajes específicos sobre qué está fallando
3. **Manejo de errores mejorado**: Información más clara sobre los problemas

## Verificación

Cuando consultes el clima, deberías ver en la consola:

```
🌤️ Intentando guardar datos del clima en Coda...
Datos a guardar: { city: 'Madrid', temperature: 22.5, ... }
✅ Datos del clima guardados exitosamente en Coda
```

Si ves mensajes de error, sigue las instrucciones del script de diagnóstico.
