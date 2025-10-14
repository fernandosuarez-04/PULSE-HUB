# Integración del agente con Coda.io

Este documento explica todo lo necesario para integrar el agente conversacional del repositorio con Coda.io. Incluye requisitos, opciones de arquitectura, ejemplos de código en Node/TypeScript para usar la API de Coda, instrucciones para webhooks, seguridad, pruebas y una checklist final.

## Resumen rápido

- Objetivo: Permitir que el agente lea, escriba y reaccione a datos en documentos y tablas de Coda mediante la API REST y webhooks.
- Alcance: sincronización bidireccional básica (lectura/escritura), triggers por cambios (webhooks) y buenas prácticas de seguridad.

## Requisitos previos

- Cuenta de Coda con permisos para crear API tokens y webhooks.
- Token de API de Coda (API Key) con los scopes necesarios.
- ID del documento de Coda y del tableId o viewId que usarás.
- Entorno Node.js (recomendado 18+) y TypeScript si tu agente está en TS.
- El agente debe exponer una URL accesible desde Coda para webhooks (ngrok durante desarrollo).
- Conocimiento básico de REST, JSON y OAuth/headers.

## Arquitectura/alternativas

Opciones de integración:

1. Polling REST (simple)
   - El agente hace peticiones periódicas a la API de Coda para leer cambios.
   - Ventaja: sencillo, sin necesidad de URL pública ni webhooks.
   - Desventaja: latencia y coste de llamadas.

2. Webhooks (recomendado para reactividad)
   - Coda envía eventos a una URL pública cuando cambia un doc/table.
   - Ventaja: inmediato, menos llamadas.
   - Desventaja: necesitas exponer una URL segura y verificar firmas.

3. Hybrid
   - Usar webhooks para eventos y fallback a polling para recuperación y reconciliación.

## Permisos y seguridad

- Guarda tu API key en variables de entorno: e.g., CODA_API_KEY.
- Limita permisos y usa tokens de servicio dedicados.
- Valida la fuente de webhooks: Coda soporta un token de verificación al crear webhook; valida el header X-Coda-Signature o el body con el token según la documentación.
- Usa HTTPS obligatorio en endpoints públicos.
- Implementa rate limiting y retry/backoff para llamadas a la API.

## Endpoints importantes de la API de Coda

- Base URL: https://coda.io/apis/v1
- Obtener documento: GET /docs/{docId}
- Listar tablas: GET /docs/{docId}/tables
- Leer filas: GET /docs/{docId}/tables/{tableId}/rows
- Insertar fila: POST /docs/{docId}/tables/{tableId}/rows
- Actualizar fila: PUT /docs/{docId}/tables/{tableId}/rows/{rowId}
- Crear webhook: POST /docs/{docId}/webhooks
- Ver webhooks: GET /docs/{docId}/webhooks

Consulta la documentación oficial de Coda: https://coda.io/developers/apis/v1 (actualiza según cambios de Coda)

## Contrato mínimo (inputs/outputs)

- Inputs: operaciones CRUD sobre tablas de Coda (lector de filas, crear/actualizar), eventos webhook con payload de cambio.
- Outputs: respuestas HTTP (200/201/4xx/5xx), logs de eventos y resultados de sincronización.
- Errores: manejar 4xx/5xx, retries exponenciales, idempotencia en creación de filas.

## Ejemplos de código (Node.js / TypeScript)

> Nota: adapta rutas y variables a tu proyecto. Estos ejemplos usan fetch; si usas axios u otro cliente, ajusta.

### 1) Configuración básica

- Variables de entorno recomendadas:
  - CODA_API_KEY
  - CODA_DOC_ID
  - CODA_TABLE_ID
  - WEBHOOK_SECRET (para verificar webhooks, si aplicable)

### 2) Helper simple para llamadas a Coda (TypeScript)

```ts
// .../server/codaClient.ts
import fetch from 'node-fetch';

const BASE = 'https://coda.io/apis/v1';
const API_KEY = process.env.CODA_API_KEY!;

export async function codaRequest(path: string, method = 'GET', body?: any) {
  const url = `${BASE}${path}`;
  const headers: any = {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}
```

### 3) Leer filas

```ts
import { codaRequest } from './codaClient';

export async function getRows(tableId: string, limit = 50) {
  return codaRequest(`/docs/${process.env.CODA_DOC_ID}/tables/${tableId}/rows?pageSize=${limit}`);
}
```

### 4) Insertar fila

```ts
export async function addRow(tableId: string, values: Record<string, any>) {
  const body = { rows: [{ cells: Object.entries(values).map(([colId, value]) => ({ column: colId, value })) }] };
  return codaRequest(`/docs/${process.env.CODA_DOC_ID}/tables/${tableId}/rows`, 'POST', body);
}
```

### 5) Registrar webhook desde el agente

```ts
export async function createWebhook(callbackUrl: string, tableId: string) {
  const body = {
    name: 'Agente-Webhook',
    endpoint: callbackUrl,
    triggers: [{ type: 'row.changed', table: tableId }],
    // optional: filters
  };
  return codaRequest(`/docs/${process.env.CODA_DOC_ID}/webhooks`, 'POST', body);
}
```

### 6) Endpoint para recibir webhooks (Express.js)

```ts
// .../server/webhook.ts
import express from 'express';
import rawBody from 'raw-body';

const router = express.Router();

router.post('/webhook/coda', express.json(), async (req, res) => {
  const payload = req.body;
  // opcional: verificar signature con process.env.WEBHOOK_SECRET
  console.log('Coda webhook received', JSON.stringify(payload).slice(0,200));
  // procesar evento: identificar tabla/row y actuar (ej. llamar al agente)
  res.status(200).send({ ok: true });
});

export default router;
```

## Verificación de webhooks y seguridad adicional

- Coda puede enviar un token de verificación al crear el webhook; guarda ese token y valida.
- Si Coda envía un header con firma HMAC, valídalo usando `WEBHOOK_SECRET`.
- Siempre responde con 200 rápidamente; procesa en background si el trabajo es pesado.

## Idempotencia y reconciliación

- Añade un campo en la tabla para trackear `processed_by_agent` y `agent_update_id`.
- En caso de reintentos, usa `agent_update_id` o marcas para evitar duplicados.
- Implementa reconciliación periódica (job que compara el estado del agente con Coda).

## Manejo de errores y reintentos

- Para llamadas fallidas (5xx), reintentar con backoff exponencial (ej. 1s, 2s, 4s, 8s).
- Para conflictos (409) o duplicados, ajustar lógica de idempotencia.
- Registrar events en logs con suficiente contexto para debugging.

## Pruebas y desarrollo local

- Usa ngrok para exponer el endpoint de webhooks durante desarrollo:

```powershell
ngrok http 3000
```

- Prueba llamadas manuales con curl / Postman y con scripts de Node.
- Crear un documento de Coda de prueba y una tabla con columnas: "id_agente", "entrada", "salida", "processed_by_agent".

## Checklist de integración (para marcar manualmente)

- [ ] Crear API token en Coda y guardarlo en `CODA_API_KEY`.
- [ ] Identificar `CODA_DOC_ID` y `CODA_TABLE_ID`.
- [ ] Implementar `codaClient` helper y pruebas unitarias básicas.
- [ ] Implementar endpoint `/webhook/coda` y exponerlo (ngrok / HTTPS).
- [ ] Crear webhook desde Coda apuntando al endpoint.
- [ ] Añadir validación de firma/verificación del webhook.
- [ ] Manejar idempotencia y agregar columnas de tracking en la tabla.
- [ ] Tests end-to-end: crear fila en Coda y verificar que el agente la procesa.
- [ ] Documentar en README del proyecto cómo habilitar la integración.

## Ejemplo de flujo end-to-end

1. Usuario añade fila en la tabla de Coda (entrada de usuario).
2. Coda dispara webhook al endpoint del agente.
3. El agente valida y procesa la fila.
4. El agente escribe la respuesta en la misma fila (columna "salida") y marca `processed_by_agent=true`.
5. Opcional: el agente envía notificación o registra el evento.

## Recursos y enlaces útiles

- Documentación oficial de la API de Coda: https://coda.io/developers/apis/v1
- Guía de webhooks de Coda (buscar en docs oficiales)
- ngrok: https://ngrok.com/

## Notas finales

- Recomendación: comenzar con polling durante las primeras pruebas para evitar problemas de exposure y luego pasar a webhooks.
- Mantén los tokens fuera del repo y documenta la expiración/rotación.

---

Generado: 8 de octubre de 2025
