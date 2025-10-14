/**
 * Coda API Integration Tool
 *
 * This tool integrates with Coda API to search and retrieve information from
 * a knowledge base table. All configuration comes from environment variables.
 *
 * Environment Variables Required:
 * - CODA_API_KEY: API key from https://coda.io/account
 * - CODA_DOC_ID: Document ID containing the table
 * - CODA_TABLE_ID: Table ID to query
 */

import type {
  CodaRow,
  ColumnInfo,
  TableRowsResponse,
  ColumnsResponse,
} from '../ai-chat.types';

const BASE = 'https://coda.io/apis/v1';

/**
 * Fetches columns from the configured Coda table
 * @returns Array of column information or empty array on error
 */
export async function getTableColumns(): Promise<ColumnInfo[]> {
  const apiKey = process.env.CODA_API_KEY;
  const docId = process.env.CODA_DOC_ID;
  const tableId = process.env.CODA_TABLE_ID;

  if (!apiKey || !docId || !tableId) {
    console.warn('❌ Coda environment variables not fully configured');
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
      console.error('❌ Error fetching Coda columns:', res.status, text);
      return [];
    }

    const json = (await res.json()) as ColumnsResponse;
    return json.items;
  } catch (err) {
    console.error('❌ Error in getTableColumns:', err);
    return [];
  }
}

/**
 * Fetches rows from the configured Coda table
 * @param limit Maximum number of rows to fetch (default: 10)
 * @returns Array of rows or empty array on error
 */
export async function getTableRows(limit: number = 10): Promise<CodaRow[]> {
  const apiKey = process.env.CODA_API_KEY;
  const docId = process.env.CODA_DOC_ID;
  const tableId = process.env.CODA_TABLE_ID;

  if (!apiKey || !docId || !tableId) {
    console.warn('❌ Coda environment variables not fully configured');
    console.warn('💡 Configure CODA_API_KEY, CODA_DOC_ID, and CODA_TABLE_ID');
    return [];
  }

  const url = `${BASE}/docs/${docId}/tables/${tableId}/rows?limit=${limit}&useColumnNames=true`;
  console.log('🔗 Querying Coda:', url.replace(apiKey, '***'));

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('❌ Coda API error:', res.status, text);
      throw new Error(`Coda API error ${res.status}: ${text}`);
    }

    const json = (await res.json()) as TableRowsResponse;
    console.log(`✅ Retrieved ${json.items.length} rows from Coda`);
    return json.items;
  } catch (err) {
    console.error('❌ Error fetching rows from Coda:', err);
    return [];
  }
}

/**
 * Searches for relevant content in the Coda table based on a query
 * Uses keyword matching to find the most relevant row
 *
 * @param query User's search query
 * @returns Best matching content or empty string if not found
 */
export async function searchInCoda(query: string): Promise<string> {
  const rows = await getTableRows(10);

  if (rows.length === 0) {
    return '';
  }

  // Convert query to lowercase and extract keywords (filter short words)
  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3);

  console.log(`🔍 Searching in Coda with keywords:`, keywords);

  // Search for the best match in all rows
  let bestMatch = '';
  let bestScore = 0;

  for (const row of rows) {
    // Get all text content from the row
    const rowText = JSON.stringify(row.values).toLowerCase();

    // Count keyword matches
    let score = 0;
    for (const keyword of keywords) {
      const matches = (rowText.match(new RegExp(keyword, 'g')) || []).length;
      score += matches;
    }

    // If we found a better match, save it
    if (score > bestScore) {
      bestScore = score;
      // Get the first text value found in the row
      const firstValue = Object.values(row.values)[0];
      if (typeof firstValue === 'string') {
        bestMatch = firstValue;
      }
    }
  }

  if (bestMatch && bestScore > 0) {
    console.log(`✅ Found relevant content (score: ${bestScore})`);

    // Truncate if too long (max 2000 characters for context)
    if (bestMatch.length > 2000) {
      // Try to extract a relevant fragment around the first keyword
      const firstKeyword = keywords[0];
      const keywordIndex = bestMatch.toLowerCase().indexOf(firstKeyword);

      if (keywordIndex !== -1) {
        // Extract context around the keyword
        const start = Math.max(0, keywordIndex - 500);
        const end = Math.min(bestMatch.length, keywordIndex + 1500);
        return '...' + bestMatch.slice(start, end) + '...';
      }

      // If keyword not found, just take the beginning
      return bestMatch.slice(0, 2000) + '...';
    }

    return bestMatch;
  }

  console.log('⚠️ No relevant content found for the query');
  return '';
}

/**
 * Extracts a relevant fragment from content based on keywords
 * @param content Full content to extract from
 * @param query Query to find in content
 * @param maxLength Maximum length of fragment (default: 500)
 * @returns Extracted fragment with context
 */
export function extractRelevantFragment(
  content: string,
  query: string,
  maxLength: number = 500
): string {
  const queryLower = query.toLowerCase();
  const contentLower = content.toLowerCase();

  // Find the position of the query
  const index = contentLower.indexOf(queryLower);

  if (index === -1) {
    // If exact query not found, return the beginning
    return (
      content.slice(0, maxLength) + (content.length > maxLength ? '...' : '')
    );
  }

  // Extract context around the query
  const start = Math.max(0, index - 200);
  const end = Math.min(content.length, index + maxLength);

  let fragment = content.slice(start, end);

  // Add ellipsis if needed
  if (start > 0) fragment = '...' + fragment;
  if (end < content.length) fragment = fragment + '...';

  return fragment;
}
