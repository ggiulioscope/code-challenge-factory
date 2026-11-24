export interface PurchaseV2 {
  readonly id: string;
  readonly price: {
    readonly minorUnits: number;
    readonly currency: 'USD' | 'EUR';
  };
}

export function submitV2(rows: PurchaseV2[], input: unknown) {
  if (typeof input !== 'object' || input === null || !('id' in input) ||
      typeof input.id !== 'string' || !('price' in input)) {
    throw new Error('Expected id and price');
  }
  const price = input.price;
  if (typeof price !== 'object' || price === null || !('currency' in price) ||
      !('minorUnits' in price)) throw new Error('Expected currency and minorUnits');
  const { currency, minorUnits } = price;
  if (currency !== 'EUR' && currency !== 'USD') throw new Error('Unsupported currency');
  if (typeof minorUnits !== 'number' || !Number.isSafeInteger(minorUnits) || minorUnits < 0) {
    throw new Error('Expected nonnegative integer minorUnits');
  }
  rows.push({ id: input.id, price: { currency, minorUnits } });
}
