import type { LegacyEntry } from './legacy-report.ts';

export interface LedgerEntry extends LegacyEntry {
  readonly currency?: 'USD' | 'EUR';
}

export function submit(rows: LedgerEntry[], request: unknown) {
  if (typeof request !== 'object' || request === null || !('id' in request) || !('amount' in request)) {
    throw new Error('Expected a request with id and amount');
  }
  const { id, amount } = request;
  const currency = 'currency' in request ? request.currency : 'USD';
  if (currency !== 'USD' && currency !== 'EUR') throw new Error('Unsupported currency');
  if (typeof id !== 'string' || typeof amount !== 'number' || !Number.isSafeInteger(amount) || amount < 0) {
    throw new Error('Expected an id and a nonnegative integer amount');
  }
  rows.push({ id, amount, currency });
}
