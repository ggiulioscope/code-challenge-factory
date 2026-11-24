import type { LedgerEntry } from './intake.ts';

export function readLegacyFeed(rows: readonly LedgerEntry[]) {
  return rows
    .filter(row => row.currency === undefined || row.currency === 'USD')
    .map(({ id, amount }) => ({ id, amount }));
}
