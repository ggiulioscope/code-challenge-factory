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
