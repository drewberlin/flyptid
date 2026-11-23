import { Circle, G, Path } from 'react-native-svg';
import { CREAM, EYE, INK } from './palette';

// Chupacabra: spiky-backed beast with a glowing red eye and one fang.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function ChupacabraArt() {
  return (
    <G>
      <Path d="M27 60 Q16 58 19 46" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      <Path d="M32 53 L37 40 L41 47 L44 37 L48 45 L51 35 L55 44 L58 37 L61 46 L65 41 L67 50 Z" fill={INK} />
      <Path d="M26 64 C26 50 38 43 52 44 C62 45 68 48 72 52 L82 50 C86 50 87 54 84 56 L74 60 C70 64 62 66 54 66 Z" fill={INK} />
      <Path d="M69 51 L72 41 L76 50 Z" fill={INK} />
      <Path d="M32 62 L30 76 L35 76 L38 63 Z" fill={INK} />
      <Path d="M44 64 L44 76 L49 76 L50 65 Z" fill={INK} />
      <Path d="M57 64 L59 76 L64 76 L64 63 Z" fill={INK} />
      <Path d="M66 61 L70 75 L75 75 L72 59 Z" fill={INK} />
      <Circle cx="76" cy="53" r="2" fill={EYE} />
      <Path d="M80 56 L81.2 59.5 L82.4 55.6 Z" fill={CREAM} />
    </G>
  );
}
