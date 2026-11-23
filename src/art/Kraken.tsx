import { Circle, G, Path } from 'react-native-svg';
import { CREAM, INK } from './palette';
import { Water } from './Water';

// Kraken: giant squid rising from the sea, tentacles curling.
// Placeholder art (v1). Drawn in a 100×100 box; CoinFace adds the coin behind it.
export default function KrakenArt() {
  return (
    <G>
      <Path d="M28 66 C18 62 15 52 20 47" stroke={INK} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <Path d="M72 66 C82 62 85 52 80 47" stroke={INK} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <Path d="M36 64 C28 56 22 46 26 38 C29 33 35 35 33 40" stroke={INK} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <Path d="M64 64 C72 56 78 46 74 38 C71 33 65 35 67 40" stroke={INK} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <Path d="M38 64 C36 45 42 30 50 30 C58 30 64 45 62 64 Z" fill={INK} />
      <Circle cx="45" cy="51" r="2.6" fill={CREAM} />
      <Circle cx="55" cy="51" r="2.6" fill={CREAM} />
      <Circle cx="45.6" cy="51.6" r="1.1" fill={INK} />
      <Circle cx="55.6" cy="51.6" r="1.1" fill={INK} />
      <Water />
    </G>
  );
}
