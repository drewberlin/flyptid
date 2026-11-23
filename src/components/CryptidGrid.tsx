import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CRYPTIDS } from '../data/cryptids';
import { theme } from '../theme';
import { CryptidCoin } from './CryptidCoin';

type Props = {
  selectedId: string;
  disabledId: string; // the cryptid already on the other side
  onSelect: (id: string) => void;
  width: number; // available width for the grid
};

const COLUMNS = 5;
const GAP = 10;

/** Grid of coin thumbnails. The selected one gets a ring; the disabled one is greyed out. */
export function CryptidGrid({ selectedId, disabledId, onSelect, width }: Props) {
  const cell = Math.floor((width - GAP * (COLUMNS - 1)) / COLUMNS);
  const coin = cell - 8; // leave room for the selection ring

  return (
    <View style={[styles.grid, { gap: GAP }]}>
      {CRYPTIDS.map((c) => {
        const selected = c.id === selectedId;
        const disabled = c.id === disabledId;
        return (
          <Pressable
            key={c.id}
            disabled={disabled}
            onPress={() => onSelect(c.id)}
            style={[styles.cell, { width: cell }, disabled && styles.disabled]}
            accessibilityRole="button"
            accessibilityLabel={disabled ? `${c.name}, used on the other side` : c.name}
            accessibilityState={{ selected, disabled }}
          >
            <View style={[styles.ring, { width: cell, height: cell, borderRadius: cell / 2 }, selected && styles.ringOn]}>
              <CryptidCoin cryptid={c} size={coin} />
            </View>
            <Text style={[styles.name, selected && styles.nameOn]} numberOfLines={2}>
              {c.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { alignItems: 'center' },
  disabled: { opacity: 0.25 },
  ring: { alignItems: 'center', justifyContent: 'center', borderWidth: 2.5, borderColor: 'transparent' },
  ringOn: { borderColor: theme.text },
  name: { marginTop: 4, fontSize: 11, color: theme.muted, textAlign: 'center' },
  nameOn: { color: theme.text, fontWeight: '700' },
});
