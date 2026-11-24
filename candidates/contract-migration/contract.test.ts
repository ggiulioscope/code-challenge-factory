import test from 'node:test';
import assert from 'node:assert/strict';
import request from './fixtures/legacy-request.json' with { type: 'json' };
import historicalRows from './fixtures/legacy-ledger.json' with { type: 'json' };
import { submit } from './intake.ts';
import { readLegacyFeed } from './feed.ts';
import { usdTotal } from './legacy-report.ts';

test('a historical USD record and a legacy submission reach the installed report', () => {
  const rows = structuredClone(historicalRows);
  submit(rows, request);
  const feed = readLegacyFeed(rows);
  assert.deepEqual(feed, [...historicalRows, request]);
  assert.equal(usdTotal(feed), 1550);
});

test('intake rejects fractional minor units', () => {
  assert.throws(() => submit([], { id: 'req-102', amount: 1.5 }));
});

test('a euro submission is retained and isolated from the installed report', () => {
  const rows: import('./intake.ts').LedgerEntry[] = [];
  submit(rows, request);
  submit(rows, { id: 'eur-1', amount: 800, currency: 'EUR' });
  assert.deepEqual(rows.find(row => row.id === 'eur-1'), { id: 'eur-1', amount: 800, currency: 'EUR' });
  assert.equal(usdTotal(readLegacyFeed(rows)), 1250);
});

test('an unsupported currency never defaults to USD', () => {
  assert.throws(() => submit([], { id: 'bad', amount: 800, currency: 'XYZ' }), /currency/);
});
