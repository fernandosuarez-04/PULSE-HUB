import { saveWeatherToCoda } from '../server/tools/coda.js';

async function test() {
  // requiere CODA_API_KEY, CODA_DOC_ID y CODA_TABLE_ID en el entorno
  const res = await saveWeatherToCoda({ city: 'Madrid', temperature: 21.5, notes: 'Prueba desde script' });
  console.log('Resultado:', JSON.stringify(res, null, 2));
}

test().catch(e => { console.error(e); process.exit(1); });
