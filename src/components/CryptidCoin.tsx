import { CoinFace } from '../art/CoinFace';
import type { Cryptid } from '../data/cryptids';

/** A cryptid drawn on its coin face, at any size (big coin or thumbnail). */
export function CryptidCoin({ cryptid, size }: { cryptid: Cryptid; size: number }) {
  const { Art, color } = cryptid;
  return (
    <CoinFace size={size} color={color}>
      <Art />
    </CoinFace>
  );
}
