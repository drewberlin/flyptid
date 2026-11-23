import { ReactNode } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { CREAM } from './palette';

type Props = { size: number; color: string; children?: ReactNode };

/**
 * The coin itself: a darker rim, a face in the cryptid's accent colour and a
 * faint inner ring. The cryptid drawing goes on top as children.
 * Everything uses a 100×100 coordinate box, scaled to `size` pixels.
 */
export function CoinFace({ size, color, children }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="49" fill={color} />
      <Circle cx="50" cy="50" r="49" fill="#000000" opacity="0.22" />
      <Circle cx="50" cy="50" r="44" fill={color} />
      <Circle cx="50" cy="50" r="41" fill="none" stroke={CREAM} strokeWidth="0.8" opacity="0.35" />
      {children}
    </Svg>
  );
}
