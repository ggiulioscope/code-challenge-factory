import type { LegacyEntry } from './legacy-report.ts';
import type { PurchaseV2 } from './intake-v2.ts';

export function readLegacyFeed(legacy: readonly LegacyEntry[], modern: readonly PurchaseV2[] = []) {
  const modernUsd = modern
    .filter(row => row.price.currency === 'USD')
    .map(row => ({ id: row.id, amount: row.price.minorUnits }));
  return [...legacy.map(({ id, amount }) => ({ id, amount })), ...modernUsd];
}
