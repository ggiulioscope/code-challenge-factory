import type { LegacyEntry } from './legacy-report.ts';

export function readLegacyFeed(rows: readonly LegacyEntry[]) {
  return rows.map(({ id, amount }) => ({ id, amount }));
}
