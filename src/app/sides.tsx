import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CryptidGrid } from '../components/CryptidGrid';
import { getCryptid } from '../data/cryptids';
import { useSettings } from '../state/settings';
import { theme } from '../theme';

const PADDING = 20;

/** Side picker sheet. Pick a cryptid for each side; one can't be on both. */
export default function SidesScreen() {
  const { settings, setSide } = useSettings();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const gridWidth = width - PADDING * 2;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose sides</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: PADDING, paddingBottom: PADDING + insets.bottom }}>
        <Text style={styles.label}>
          Side A · <Text style={styles.current}>{getCryptid(settings.sideA).name}</Text>
        </Text>
        <CryptidGrid
          width={gridWidth}
          selectedId={settings.sideA}
          disabledId={settings.sideB}
          onSelect={(id) => setSide('A', id)}
        />

        <Text style={[styles.label, styles.second]}>
          Side B · <Text style={styles.current}>{getCryptid(settings.sideB).name}</Text>
        </Text>
        <CryptidGrid
          width={gridWidth}
          selectedId={settings.sideB}
          disabledId={settings.sideA}
          onSelect={(id) => setSide('B', id)}
        />

        {/* Done sits down here (not top-right) so Expo Go's floating gear
            button doesn't cover it during development. */}
        <Pressable
          style={({ pressed }) => [styles.doneButton, pressed && styles.pressed]}
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: {
    alignItems: 'center',
    paddingHorizontal: PADDING,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.border,
  },
  title: { fontSize: 20, fontWeight: '700', color: theme.text },
  doneButton: {
    alignSelf: 'center',
    marginTop: 32,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },
  pressed: { opacity: 0.6 },
  doneText: { fontSize: 16, fontWeight: '600', color: theme.text },
  label: { fontSize: 15, fontWeight: '600', color: theme.muted, marginBottom: 12 },
  current: { color: theme.text },
  second: { marginTop: 28 },
});
