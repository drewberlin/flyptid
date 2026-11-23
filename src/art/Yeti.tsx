import { Circle, Ellipse, G, Path } from 'react-native-svg';
import { CREAM, INK, SHADE } from './palette';

// Yeti: white, shaggy snow beast with raised arms in front of mountains.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function YetiArt() {
  return (
    <G>
      <Path d="M14 74 L32 46 L42 58 L56 38 L86 74 Z" fill={SHADE} />
      <Path d="M32 46 L28 52 L33 50 L36 52 Z" fill={CREAM} opacity="0.5" />
      <Path d="M56 38 L50 46 L55 44 L58 47 L62 45 Z" fill={CREAM} opacity="0.5" />
      <Path d="M39 45 L28 32" stroke={CREAM} strokeWidth="7" fill="none" strokeLinecap="round" />
      <Path d="M61 45 L72 32" stroke={CREAM} strokeWidth="7" fill="none" strokeLinecap="round" />
      <Path d="M38 36 C38 25 62 25 62 36 L66 40 L63 44 L67 48 L63 52 L65 58 L61 60 L61 76 L54 76 L52 66 L48 66 L46 76 L39 76 L39 60 L35 58 L37 52 L33 48 L37 44 L34 40 Z" fill={CREAM} />
      <Ellipse cx="50" cy="38" rx="6.5" ry="5.5" fill={INK} />
      <Circle cx="47.6" cy="37" r="1" fill={CREAM} />
      <Circle cx="52.4" cy="37" r="1" fill={CREAM} />
      <Path d="M47 41 L53 41" stroke={CREAM} strokeWidth="1.1" strokeLinecap="round" />
    </G>
  );
}
