import { decideFlip } from './flip';

// Random values covering the whole [0, 1) range, including both edges.
const samples = [0, 0.001, 0.25, 0.4999, 0.5, 0.75, 0.999, 0.999999];

describe('decideFlip', () => {
  test('pA = 0: side B always wins', () => {
    for (const r of samples) expect(decideFlip(0, () => r)).toBe('B');
  });

  test('pA = 100: side A always wins', () => {
    for (const r of samples) expect(decideFlip(100, () => r)).toBe('A');
  });

  test('pA = 50: below 0.5 is A, 0.5 and above is B', () => {
    expect(decideFlip(50, () => 0)).toBe('A');
    expect(decideFlip(50, () => 0.4999)).toBe('A');
    expect(decideFlip(50, () => 0.5)).toBe('B');
    expect(decideFlip(50, () => 0.999)).toBe('B');
  });

  test('pA = 50 with real randomness is roughly fair', () => {
    let a = 0;
    const n = 20000;
    for (let i = 0; i < n; i++) if (decideFlip(50) === 'A') a++;
    // Expect ~50%; 46–54% is a very safe margin for 20,000 flips.
    expect(a / n).toBeGreaterThan(0.46);
    expect(a / n).toBeLessThan(0.54);
  });

  test('pA = 80 with real randomness lands near 80% A', () => {
    let a = 0;
    const n = 20000;
    for (let i = 0; i < n; i++) if (decideFlip(80) === 'A') a++;
    expect(a / n).toBeGreaterThan(0.76);
    expect(a / n).toBeLessThan(0.84);
  });

  test('out-of-range values are clamped', () => {
    expect(decideFlip(-20, () => 0)).toBe('B');
    expect(decideFlip(150, () => 0.999)).toBe('A');
  });
});
