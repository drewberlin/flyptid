import { Ellipse, G, Path } from 'react-native-svg';
import { EYE, INK } from './palette';

// Mothman: winged figure with glowing red eyes.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function MothmanArt() {
  return (
    <G>
      <Path d="M50 37 C40 30 26 28 16 36 C22 40 24 46 22 52 C30 50 36 54 38 60 C42 54 46 50 50 50 Z" fill={INK} />
      <Path d="M50 37 C60 30 74 28 84 36 C78 40 76 46 78 52 C70 50 64 54 62 60 C58 54 54 50 50 50 Z" fill={INK} />
      <Path d="M44 35 C44 29 56 29 56 35 L58 58 L54 77 L51 77 L50 63 L49 77 L46 77 L42 58 Z" fill={INK} />
      <Ellipse cx="50" cy="29" rx="7" ry="8" fill={INK} />
      <Ellipse cx="46.5" cy="29" rx="2.6" ry="2" fill={EYE} />
      <Ellipse cx="53.5" cy="29" rx="2.6" ry="2" fill={EYE} />
    </G>
  );
}
