import fetch from 'node-fetch';

const BASE = 'https://coda.io/apis/v1';

interface CodaRow {
  id: string;
  name: string;
  values: Record<string, any>;
  href: string;
}

interface ColumnInfo {
  id: string;
  name: string;
  type: string;
}

interface TableRowsResponse {
  items: CodaRow[];
  href: string;
  nextPageToken?: string;
}

interface ColumnsResponse {
  items: ColumnInfo[];
  href: string;
}

/**
 * Obtiene las columnas de la tabla de Coda
 * Usa credenciales desde variables de entorno
 */
export async function getTableColumns(): Promise<ColumnInfo[]> {
  const apiKey = process.env.CODA_API_KEY;
  const docId = process.env.CODA_DOC_ID;
  const tableId = process.env.CODA_TABLE_ID;

  if (!apiKey || !docId || !tableId) {
    console.warn('❌ Variables de entorno de Coda no configuradas completamente');
    return [];
  }

  const url = `${BASE}/docs/${docId}/tables/${tableId}/columns`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('❌ Error obteniendo columnas de Coda:', res.status, text);
      return [];
    }

    const json = await res.json() as ColumnsResponse;
    return json.items;
  } catch (err) {
    console.error('❌ Error en getTableColumns:', err);
    return [];
  }
}

/**
 * Obtiene todas las filas de la tabla de Coda
 * Usa credenciales desde variables de entorno
 */
export async function getTableRows(limit: number = 10): Promise<CodaRow[]> {
  const apiKey = process.env.CODA_API_KEY;
  const docId = process.env.CODA_DOC_ID;
  const tableId = process.env.CODA_TABLE_ID;

  if (!apiKey || !docId || !tableId) {
    console.warn('❌ Variables de entorno de Coda no configuradas completamente');
    console.warn('💡 Configura CODA_API_KEY, CODA_DOC_ID y CODA_TABLE_ID');
    return [];
  }

  const url = `${BASE}/docs/${docId}/tables/${tableId}/rows?limit=${limit}&useColumnNames=true`;
  console.log('🔗 Consultando Coda:', url.replace(apiKey, '***'));

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('❌ Error de API de Coda:', res.status, text);
      throw new Error(`Coda API error ${res.status}: ${text}`);
    }

    const json = await res.json() as TableRowsResponse;
    console.log(`✅ Se obtuvieron ${json.items.length} filas de Coda`);
    return json.items;
  } catch (err) {
    console.error('❌ Error obteniendo filas de Coda:', err);
    return [];
  }
}

/**
 * Busca contenido relevante en la tabla de Coda basándose en una query
 * Implementa búsqueda simple por keywords
 */
export async function searchInCoda(query: string): Promise<string> {
  const rows = await getTableRows(10);

  if (rows.length === 0) {
    return '';
  }

  // Convertir query a minúsculas y extraer palabras clave
  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3); // Filtrar palabras cortas

  console.log(`🔍 Buscando en Coda con keywords:`, keywords);

  // Buscar en el contenido de todas las filas
  let bestMatch = '';
  let bestScore = 0;

  for (const row of rows) {
    // Obtener todo el texto de la fila
    const rowText = JSON.stringify(row.values).toLowerCase();

    // Contar coincidencias de keywords
    let score = 0;
    for (const keyword of keywords) {
      const matches = (rowText.match(new RegExp(keyword, 'g')) || []).length;
      score += matches;
    }

    // Si encontramos una mejor coincidencia, guardarla
    if (score > bestScore) {
      bestScore = score;
      // Obtener el primer valor de texto encontrado
      const firstValue = Object.values(row.values)[0];
      if (typeof firstValue === 'string') {
        bestMatch = firstValue;
      }
    }
  }

  if (bestMatch && bestScore > 0) {
    console.log(`✅ Encontrado contenido relevante (score: ${bestScore})`);

    // Truncar si es muy largo (máximo 2000 caracteres para contexto)
    if (bestMatch.length > 2000) {
      // Intentar extraer un fragmento relevante alrededor de la primera keyword
      const firstKeyword = keywords[0];
      const keywordIndex = bestMatch.toLowerCase().indexOf(firstKeyword);

      if (keywordIndex !== -1) {
        // Extraer contexto alrededor de la keyword
        const start = Math.max(0, keywordIndex - 500);
        const end = Math.min(bestMatch.length, keywordIndex + 1500);
        return '...' + bestMatch.slice(start, end) + '...';
      }

      // Si no encontramos la keyword, solo tomar el inicio
      return bestMatch.slice(0, 2000) + '...';
    }

    return bestMatch;
  }

  console.log('⚠️ No se encontró contenido relevante para la query');
  return '';
}

/**
 * Extrae un fragmento específico del contenido basándose en keywords
 * Útil para obtener información más precisa
 */
export function extractRelevantFragment(
  content: string,
  query: string,
  maxLength: number = 500
): string {
  const queryLower = query.toLowerCase();
  const contentLower = content.toLowerCase();

  // Buscar la posición de la query
  const index = contentLower.indexOf(queryLower);

  if (index === -1) {
    // Si no encuentra la query exacta, retornar el inicio
    return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
  }

  // Extraer contexto alrededor de la query
  const start = Math.max(0, index - 200);
  const end = Math.min(content.length, index + maxLength);

  let fragment = content.slice(start, end);

  // Agregar puntos suspensivos si es necesario
  if (start > 0) fragment = '...' + fragment;
  if (end < content.length) fragment = fragment + '...';

  return fragment;
}
