import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Root layout: wraps every screen in the app.
// A Stack navigator lets later phases open modal sheets (side picker,
// prank mode, history, settings) on top of the main screen.
export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </>
  );
}
