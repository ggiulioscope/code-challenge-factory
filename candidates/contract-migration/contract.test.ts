import test from 'node:test';
import assert from 'node:assert/strict';
import request from './fixtures/legacy-request.json' with { type: 'json' };
import historicalRows from './fixtures/legacy-ledger.json' with { type: 'json' };
import { submit } from './intake.ts';
import { readLegacyFeed } from './feed.ts';
import { submitV2, type PurchaseV2 } from './intake-v2.ts';
import { usdTotal, type LegacyEntry } from './legacy-report.ts';

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

test('the legacy report totals only USD across both ledger versions', () => {
  const legacy: LegacyEntry[] = [];
  const modern: PurchaseV2[] = [];
  submit(legacy, request);
  submitV2(modern, { id: 'eur-1', price: { currency: 'EUR', minorUnits: 800 } });
  assert.deepEqual(modern[0]?.price, { currency: 'EUR', minorUnits: 800 });
  assert.equal(usdTotal(readLegacyFeed(legacy, modern)), 1250);
  submitV2(modern, { id: 'usd-2', price: { currency: 'USD', minorUnits: 75 } });
  assert.equal(usdTotal(readLegacyFeed(legacy, modern)), 1325);
});
