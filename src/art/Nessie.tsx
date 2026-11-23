import { Circle, Ellipse, G, Path } from 'react-native-svg';
import { CREAM, INK } from './palette';
import { Water } from './Water';

// Nessie: long-necked loch monster with a hump and tail in the water.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function NessieArt() {
  return (
    <G>
      <Path d="M36 66 C38 54 54 52 58 66 Z" fill={INK} />
      <Path d="M42 62 C34 50 32 37 41 31" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
      <Ellipse cx="46" cy="30" rx="7" ry="4.5" fill={INK} />
      <Circle cx="48" cy="29" r="1.3" fill={CREAM} />
      <Path d="M60 66 C62 56 72 56 74 66 Z" fill={INK} />
      <Path d="M74 64 C78 58 82 60 85 57" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      <Water />
    </G>
  );
}
