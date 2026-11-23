import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SettingsProvider } from '../state/settings';

// Root layout: wraps every screen in the app.
// SettingsProvider makes the saved settings available everywhere.
// The Stack shows the main screen, with sheets (modals) opening on top.
export default function RootLayout() {
  return (
    <SettingsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sides" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="dark" />
    </SettingsProvider>
  );
}
