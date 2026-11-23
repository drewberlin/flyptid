import { ReactNode, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import type { Side } from '../logic/flip';

/** A request to flip. `id` changes on every flip so the same result twice still animates. */
export type FlipRequest = { to: Side; id: number };

type Props = {
  size: number;
  faceA: ReactNode;
  faceB: ReactNode;
  flipRequest: FlipRequest | null;
  onLanded: (side: Side) => void;
  onPress: () => void;
  accessibilityLabel: string;
};

/**
 * A two-sided coin that spins around its vertical axis (rotateY).
 *
 * How it works: `rotation` is an angle in degrees. Face A is drawn at that
 * angle, face B at angle + 180, so exactly one faces the viewer. Whenever the
 * angle is a multiple of 360 face A is up; an odd multiple of 180 means B is up.
 * The result is decided *before* this runs; we just pick a target angle that
 * ends on the right face.
 */
export function Coin({ size, faceA, faceB, flipRequest, onLanded, onPress, accessibilityLabel }: Props) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const faceUp = useRef<Side>('A'); // which face is showing right now

  useEffect(() => {
    if (!flipRequest) return;
    const { to } = flipRequest;

    // A few full spins for show, plus half a turn if we need to change faces.
    const spins = 4 + Math.floor(Math.random() * 2); // 4 or 5 (visual only)
    const halfTurn = faceUp.current === to ? 0 : 180;
    const target = rotation.value + spins * 360 + halfTurn;
    const duration = 1400 + Math.random() * 300; // 1.4–1.7 s
    faceUp.current = to;

    // Fast at first, then eases to a stop on the target face.
    rotation.value = withTiming(
      target,
      { duration, easing: Easing.out(Easing.cubic) },
      (finished) => {
        'worklet'; // runs on the animation thread, so hop back to JS for the callback
        if (finished) scheduleOnRN(onLanded, to);
      },
    );
    // A slight grow-and-shrink makes it feel tossed toward you.
    scale.value = withSequence(
      withTiming(1.12, { duration: duration * 0.35, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: duration * 0.65, easing: Easing.inOut(Easing.quad) }),
    );
    // Only re-run when a new flip is requested (not when onLanded changes identity).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipRequest?.id]);

  // Is face A pointing at the viewer for this angle?
  const showsA = (deg: number) => {
    'worklet';
    const r = ((deg % 360) + 360) % 360;
    return r < 90 || r > 270;
  };

  // Opacity switching hides the back face reliably on both iOS and Android
  // (backfaceVisibility alone is inconsistent on Android).
  const styleA = useAnimatedStyle(() => ({
    opacity: showsA(rotation.value) ? 1 : 0,
    transform: [{ perspective: 900 }, { rotateY: `${rotation.value}deg` }],
  }));
  const styleB = useAnimatedStyle(() => ({
    opacity: showsA(rotation.value) ? 0 : 1,
    transform: [{ perspective: 900 }, { rotateY: `${rotation.value + 180}deg` }],
  }));
  const styleScale = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}>
      <Animated.View style={[{ width: size, height: size }, styleScale]}>
        <Animated.View style={[styles.face, styleA]}>{faceA}</Animated.View>
        <Animated.View style={[styles.face, styleB]}>{faceB}</Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  face: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
});

/** Stand-in coin face until the cryptid art arrives in Phase 3. */
export function PlaceholderFace({ label, color, size }: { label: string; color: string; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        borderWidth: size * 0.05,
        borderColor: '#00000033', // darker rim
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.4, fontWeight: '800', color: '#ffffffdd' }}>
        {label}
      </Text>
    </View>
  );
}
