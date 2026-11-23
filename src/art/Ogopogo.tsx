import { Circle, G, Path } from 'react-native-svg';
import { CREAM, INK } from './palette';
import { Water } from './Water';

// Ogopogo: lake serpent: two humps and a maned, horse-like head above the waves.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function OgopogoArt() {
  return (
    <G>
      <Path d="M22 66 C22 52 36 52 36 66 Z" fill={INK} />
      <Path d="M39 66 C39 48 55 48 55 66 Z" fill={INK} />
      <Path d="M58 66 C57 50 60 37 70 33 C76 31 83 33 83 38 C83 41 79 42 75 41 C69 41 68 50 68 66 Z" fill={INK} />
      <Path d="M63 44 L57 43 L62 40 L57 36 L64 37 L62 31 L68 34 Z" fill={INK} />
      <Circle cx="74" cy="36" r="1.6" fill={CREAM} />
      <Water />
    </G>
  );
}
