import fetch from 'node-fetch';

async function listColumns() {
  const apiKey = process.env.CODA_API_KEY;
  const docId = process.env.CODA_DOC_ID;
  const tableId = process.env.CODA_TABLE_ID;

  if (!apiKey || !docId || !tableId) {
    console.error('Por favor exporta CODA_API_KEY, CODA_DOC_ID y CODA_TABLE_ID en el entorno');
    process.exit(1);
  }

  const url = `https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/columns`;

  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Coda API error ${res.status}: ${text}`);
    }
    const json = await res.json();
    const cols = json.items || json || [];
    console.log('Columns for table', tableId);
    if (Array.isArray(cols)) {
      cols.forEach(c => {
        console.log(JSON.stringify({ id: c.id, name: c.name, type: c.type }, null, 2));
      });
    } else {
      console.log(JSON.stringify(cols, null, 2));
    }
  } catch (err) {
    console.error('Error listando columnas:', err);
    process.exit(1);
  }
}

listColumns();
