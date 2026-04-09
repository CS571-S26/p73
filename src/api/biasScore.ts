/**
 * Calls your backend bias-score endpoint (never calls OpenAI from the browser).
 * Replace or extend this module when the analysis pipeline grows.
 */

function apiUrl(path: string): string {
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';
  return `${base}${path}`;
}

export type BiasScoreErrorBody = {
  error?: string;
};

const LOG = '[analyze]';

export async function requestBiasScore(text: string): Promise<number> {
  console.log(`${LOG} POST /api/bias-score (chars=${text.length})`);
  const res = await fetch(apiUrl('/api/bias-score'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  const data: unknown = await res.json().catch(() => (null));

  if (!res.ok) {
    const message =
      data &&
      typeof data === 'object' &&
      'error' in data &&
      typeof (data as BiasScoreErrorBody).error === 'string'
        ? (data as BiasScoreErrorBody).error!
        : `Request failed (${res.status})`;
    console.warn(`${LOG} error response ${res.status}:`, message);
    throw new Error(message);
  }

  if (!data || typeof data !== 'object' || !('score' in data)) {
    console.warn(`${LOG} invalid JSON body`);
    throw new Error('Invalid response from server.');
  }

  const score = (data as { score: unknown }).score;
  if (typeof score !== 'number' || !Number.isFinite(score)) {
    console.warn(`${LOG} invalid score field`);
    throw new Error('Invalid score in response.');
  }

  const normalized = Math.min(100, Math.max(0, Math.round(score)));
  console.log(`${LOG} parsed score=${normalized}`);
  return normalized;
}
