export function numberWithSpaces(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Calculates dot product of prices and counts
export function calcDotProduct(items: any[], prop1: string, prop2: string): number {
  return items.reduce((a: number, b) => (a + b[prop1]*b[prop2]), 0);
};