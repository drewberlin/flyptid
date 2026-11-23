import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Coin, FlipRequest } from '../components/Coin';
import { CryptidCoin } from '../components/CryptidCoin';
import { getCryptid } from '../data/cryptids';
import { useFlipFeedback } from '../hooks/useFlipFeedback';
import { decideFlip, Side } from '../logic/flip';
import { useSettings } from '../state/settings';
import { theme } from '../theme';

export default function MainScreen() {
  const { width } = useWindowDimensions();
  const coinSize = Math.min(width * 0.68, 300);

  const { settings } = useSettings();
  const sides = { A: getCryptid(settings.sideA), B: getCryptid(settings.sideB) };

  const [flipRequest, setFlipRequest] = useState<FlipRequest | null>(null);
  const [result, setResult] = useState<Side | null>(null);
  // A ref (not state) so a second tap in the same instant is blocked immediately.
  const isFlipping = useRef(false);
  const feedback = useFlipFeedback();

  // New sides => the old result no longer means anything.
  useEffect(() => setResult(null), [settings.sideA, settings.sideB]);

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
        <SideLabel name={sides.A.name} />
        <SideLabel name={sides.B.name} alignRight />
      </View>

      <View style={styles.coinArea}>
        <Coin
          size={coinSize}
          faceA={<CryptidCoin cryptid={sides.A} size={coinSize} />}
          faceB={<CryptidCoin cryptid={sides.B} size={coinSize} />}
          flipRequest={flipRequest}
          onLanded={handleLanded}
          onAboutToLand={feedback.landSound}
          onPress={handlePress}
          accessibilityLabel={`Coin: ${sides.A.name} or ${sides.B.name}. Tap to flip.`}
        />
        {/* Fixed height so the layout doesn't jump when the result appears. */}
        <View style={styles.resultBox}>
          {result ? (
            <Text style={styles.result}>{sides[result].name}!</Text>
          ) : (
            <Text style={styles.hint}>{flipRequest ? '' : 'Tap the coin to flip'}</Text>
          )}
        </View>
      </View>

      <View style={styles.toolbar}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => router.push('/sides')}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Choose sides</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SideLabel({ name, alignRight }: { name: string; alignRight?: boolean }) {
  return (
    <Text style={[styles.sideName, alignRight && styles.right]} numberOfLines={1}>
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  namesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  sideName: { flex: 1, fontSize: 20, fontWeight: '700', color: theme.text },
  right: { textAlign: 'right' },
  coinArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  resultBox: { height: 80, justifyContent: 'center', marginTop: 32 },
  result: { fontSize: 34, fontWeight: '800', color: theme.text },
  hint: { fontSize: 16, color: theme.muted },
  toolbar: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 16 },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },
  buttonPressed: { opacity: 0.6 },
  buttonText: { fontSize: 16, fontWeight: '600', color: theme.text },
});
