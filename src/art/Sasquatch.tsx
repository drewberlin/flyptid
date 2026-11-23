import { Circle, Ellipse, G, Path } from 'react-native-svg';
import { CREAM, INK, SHADE } from './palette';

// Sasquatch: big hairy figure mid-stride between two pine trees.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function SasquatchArt() {
  return (
    <G>
      <Path d="M14 70 L22 44 L30 70 Z" fill={SHADE} />
      <Path d="M72 70 L80 40 L88 70 Z" fill={SHADE} />
      <Path d="M43 36 C36 44 34 52 34 60" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
      <Path d="M58 37 C64 44 66 50 68 57" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
      <Path d="M47 58 C45 66 42 72 38 78" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
      <Path d="M56 58 C58 66 60 72 64 78" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
      <Path d="M42 34 L39 38 L42 40 C40 46 40 54 44 61 L60 61 C62 53 62 45 60 40 L62 38 L59 34 C55 31 46 31 42 34 Z" fill={INK} />
      <Path d="M45 26 C45 18 50 15 52 15 C56 16 59 20 59 27 C59 32 55 34 52 34 C48 34 45 31 45 26 Z" fill={INK} />
      <Ellipse cx="53.5" cy="27" rx="3.6" ry="4" fill={CREAM} opacity="0.25" />
      <Circle cx="52.3" cy="26" r="0.9" fill={CREAM} />
      <Circle cx="55.3" cy="26" r="0.9" fill={CREAM} />
      <Ellipse cx="36" cy="79" rx="4" ry="2" fill={INK} />
      <Ellipse cx="66" cy="79" rx="4" ry="2" fill={INK} />
    </G>
  );
}
