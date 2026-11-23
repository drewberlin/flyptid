import { Circle, G, Path } from 'react-native-svg';
import { EYE, INK } from './palette';

// Jersey Devil: horned, horse-headed creature with bat wings and a forked tail.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function JerseyDevilArt() {
  return (
    <G>
      <Path d="M46 45 L22 26 L26 38 L17 40 L28 48 L22 55 L42 55 Z" fill={INK} />
      <Path d="M56 45 L78 24 L76 36 L85 38 L74 46 L80 53 L60 55 Z" fill={INK} />
      <Path d="M46 66 C36 71 29 67 30 60" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Path d="M30 61 L25 56 L30.5 57 L30 51 L33 58 Z" fill={INK} />
      <Path d="M44 43 C44 37 58 37 58 45 L58 61 L61 76 L55 76 L52 65 L48 76 L42 76 L46 61 Z" fill={INK} />
      <Path d="M47 41 C45 33 51 27 58 28 L69 32 C71 34 70 37 67 37.5 L59 38.5 C56 42 51 43 47 41 Z" fill={INK} />
      <Path d="M51 30 L48.5 20 L55 28 Z" fill={INK} />
      <Path d="M56 28.5 L57.5 19 L60 29 Z" fill={INK} />
      <Circle cx="60" cy="32.5" r="1.4" fill={EYE} />
    </G>
  );
}
