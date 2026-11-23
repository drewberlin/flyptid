// Pure coin-flip logic. No React, no randomness hidden inside:
// the random source can be passed in so tests can control it.

export type Side = 'A' | 'B';

/**
 * Decide the result of one flip.
 *
 * @param pA     Chance (0–100) that side A wins. 50 is a fair coin.
 *               Prank mode moves this value; 0 or 100 makes one side always win.
 * @param random Returns a number in [0, 1). Defaults to Math.random.
 */
export function decideFlip(pA: number, random: () => number = Math.random): Side {
  // Keep pA inside 0–100 in case a bad value is ever saved.
  const clamped = Math.min(100, Math.max(0, pA));
  const resultIsA = random() < clamped / 100;
  return resultIsA ? 'A' : 'B';
}
