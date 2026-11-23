import { Circle, Ellipse, G, Path } from 'react-native-svg';
import { CREAM, INK } from './palette';

// Manatee: the joke one: a round, friendly sea cow blowing bubbles.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function ManateeArt() {
  return (
    <G>
      <Ellipse cx="21" cy="54" rx="7" ry="9" fill={INK} />
      <Path d="M24 52 C24 40 44 36 60 40 C72 42 80 46 80 54 C80 62 70 64 58 64 C44 64 34 62 28 58 Z" fill={INK} />
      <Path d="M56 60 C59 68 56 72 51 71 C49 67 51 63 53 60 Z" fill={INK} />
      <Ellipse cx="76" cy="55" rx="4.5" ry="4" fill={CREAM} opacity="0.3" />
      <Circle cx="70" cy="48.5" r="1.6" fill={CREAM} />
      <Path d="M74 58 Q76 59.5 78 58" stroke={CREAM} strokeWidth="1" fill="none" strokeLinecap="round" />
      <Circle cx="82" cy="38" r="2" fill="none" stroke={CREAM} strokeWidth="1.2" />
      <Circle cx="85" cy="31" r="1.4" fill="none" stroke={CREAM} strokeWidth="1" />
      <Circle cx="80" cy="27" r="1" fill="none" stroke={CREAM} strokeWidth="0.9" />
    </G>
  );
}
