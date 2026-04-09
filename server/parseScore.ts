export type ParsedScore = { ok: true; score: number } | { ok: false; message: string };

/**
 * Model must return only digits 0–100 (optional leading zeros rejected for multi-digit except "0").
 * Strict: entire trimmed content must be one integer in range after parse, then clamped.
 */
export function parseScoreFromModelContent(raw: string): ParsedScore {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, message: 'Empty model response' };
  }

  // Reject fenced blocks or obvious prose (still strict on single token)
  if (/```|json|\{|}/i.test(trimmed)) {
    return { ok: false, message: 'Model returned non-numeric content (markers detected)' };
  }

  // Exactly one token: optional + stripped — we only allow unsigned digits
  if (!/^\d+$/.test(trimmed)) {
    return { ok: false, message: `Expected only digits 0-100, got: ${JSON.stringify(trimmed.slice(0, 80))}` };
  }

  const value = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(value)) {
    return { ok: false, message: 'Could not parse integer' };
  }

  const clamped = Math.min(100, Math.max(0, value));
  return { ok: true, score: clamped };
}
