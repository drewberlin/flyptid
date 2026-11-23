import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';

const flipSound = require('../../assets/sounds/flip.wav');

type Options = { soundOn?: boolean; hapticsOn?: boolean };

/**
 * Haptics + sound for a flip. Returns two functions to call at launch and landing.
 * The on/off options will be wired to the Settings screen in Phase 5.
 */
export function useFlipFeedback({ soundOn = true, hapticsOn = true }: Options = {}) {
  const player = useAudioPlayer(flipSound);

  useEffect(() => {
    // playsInSilentMode: false => on iPhone the sound obeys the silent switch.
    // mixWithOthers => it never pauses the user's music or podcast.
    setAudioModeAsync({ playsInSilentMode: false, interruptionMode: 'mixWithOthers' }).catch(() => {});
  }, []);

  const launch = () => {
    if (hapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    if (soundOn) {
      // Rewind first so the sound plays again on every flip.
      player.seekTo(0).catch(() => {});
      player.play();
    }
  };

  const land = () => {
    if (hapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
  };

  return { launch, land };
}
