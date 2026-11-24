export interface LegacyEntry {
  readonly id: string;
  readonly amount: number;
}

export function usdTotal(feed: readonly LegacyEntry[]) {
  return feed.reduce((total, row) => total + row.amount, 0);
}
