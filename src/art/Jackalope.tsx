import { Circle, Ellipse, G, Path } from 'react-native-svg';
import { CREAM, INK } from './palette';

// Jackalope: sitting rabbit with antlers and a cream tail.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function JackalopeArt() {
  return (
    <G>
      <Path d="M62 37 L62 21 M62 30 L56 25 M62 25 L67 19 M62 21 L59 15" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M66 38 L71 23 M68.5 30.5 L75 28 M71 23 L75 17 M71 23 L67.5 17" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M57 39 C52 31 52 25 55 23 C59 25 60 32 60.5 38 Z" fill={INK} />
      <Path d="M30 72 C26 58 34 47 48 47 C58 47 63 54 63 62 C63 70 57 75 46 75 L34 75 C31 75 30 74 30 72 Z" fill={INK} />
      <Ellipse cx="62" cy="45" rx="9.5" ry="7.5" fill={INK} />
      <Ellipse cx="62" cy="73.5" rx="5.5" ry="2.5" fill={INK} />
      <Circle cx="29" cy="63" r="4.2" fill={CREAM} />
      <Circle cx="65" cy="43" r="1.5" fill={CREAM} />
      <Circle cx="71" cy="46.5" r="1" fill={CREAM} opacity="0.6" />
    </G>
  );
}
