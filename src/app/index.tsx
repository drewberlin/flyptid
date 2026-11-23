import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Main screen. Empty for Phase 1; the coin arrives in Phase 2.
// SafeAreaView keeps content clear of the notch / Dynamic Island and home bar.
export default function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Flyptid</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
});
