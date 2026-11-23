import { useRef, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Coin, FlipRequest, PlaceholderFace } from '../components/Coin';
import { useFlipFeedback } from '../hooks/useFlipFeedback';
import { decideFlip, Side } from '../logic/flip';

// Placeholder sides until the cryptids arrive in Phase 3.
const SIDES: Record<Side, { name: string; color: string }> = {
  A: { name: 'Side A', color: '#C0573E' },
  B: { name: 'Side B', color: '#3E7CA8' },
};

export default function MainScreen() {
  const { width } = useWindowDimensions();
  const coinSize = Math.min(width * 0.68, 300);

  const [flipRequest, setFlipRequest] = useState<FlipRequest | null>(null);
  const [result, setResult] = useState<Side | null>(null);
  // A ref (not state) so a second tap in the same instant is blocked immediately.
  const isFlipping = useRef(false);
  const feedback = useFlipFeedback();

  const handlePress = () => {
    if (isFlipping.current) return; // ignore taps mid-flip
    isFlipping.current = true;
    const to = decideFlip(50); // result decided BEFORE the animation (prank odds come in Phase 4)
    setResult(null);
    setFlipRequest({ to, id: Date.now() });
    feedback.launch();
  };

  const handleLanded = (side: Side) => {
    isFlipping.current = false;
    setResult(side);
    feedback.land();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.namesRow}>
        <Text style={[styles.sideName, { color: SIDES.A.color }]}>{SIDES.A.name}</Text>
        <Text style={[styles.sideName, { color: SIDES.B.color }]}>{SIDES.B.name}</Text>
      </View>

      <View style={styles.coinArea}>
        <Coin
          size={coinSize}
          faceA={<PlaceholderFace label="A" color={SIDES.A.color} size={coinSize} />}
          faceB={<PlaceholderFace label="B" color={SIDES.B.color} size={coinSize} />}
          flipRequest={flipRequest}
          onLanded={handleLanded}
          onPress={handlePress}
          accessibilityLabel="Coin. Tap to flip."
        />
        {/* Fixed height so the layout doesn't jump when the result appears. */}
        <View style={styles.resultBox}>
          {result ? (
            <Text style={[styles.result, { color: SIDES[result].color }]}>{SIDES[result].name}!</Text>
          ) : (
            <Text style={styles.hint}>{flipRequest ? '' : 'Tap the coin to flip'}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7F2' },
  namesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  sideName: { fontSize: 20, fontWeight: '700' },
  coinArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  resultBox: { height: 80, justifyContent: 'center', marginTop: 32 },
  result: { fontSize: 34, fontWeight: '800' },
  hint: { fontSize: 16, color: '#8A847C' },
});
