import fetch from 'node-fetch';

const BASE = 'https://coda.io/apis/v1';

export async function saveWeatherToCoda(opts) {
  const apiKey = process.env.CODA_API_KEY;
  const docId = process.env.CODA_DOC_ID;
  const tableId = opts.tableId || process.env.CODA_TABLE_ID;

  if (!apiKey) {
    console.warn('CODA_API_KEY no configurada; omitiendo guardado en Coda');
    return null;
  }
  if (!docId || !tableId) {
    console.warn('CODA_DOC_ID o CODA_TABLE_ID no configurados; omitiendo guardado en Coda');
    return null;
  }

  const url = `${BASE}/docs/${docId}/tables/${tableId}/rows`;

  const COL_CIUDAD = 'c-J_2EmF7Vlw';
  const COL_TEMPERATURA = 'c-EFwKaaqiN7';
  const COL_HORA = 'c-DK-fEf_A7p';
  const COL_NOTES = 'c-UKe2Go-Dah';

  const cells = [
    { column: COL_CIUDAD, value: opts.city },
    { column: COL_TEMPERATURA, value: opts.temperature ?? '' },
    { column: COL_HORA, value: new Date().toISOString() },
    { column: COL_NOTES, value: opts.notes ?? '' },
  ];

  const body = { rows: [{ cells }] };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Coda API error ${res.status}: ${text}`);
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Error guardando fila en Coda:', err);
    return null;
  }
}
