import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';

const flipSound = require('../../assets/sounds/flip.wav');

type Options = { soundOn?: boolean; hapticsOn?: boolean };

/**
 * Haptics + sound for a flip: light haptic at launch; heavy haptic + sound on landing.
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
    // Rewind now, while the coin spins, so the sound is ready to play the
    // instant it lands. (The rewind takes a moment; if play() runs before it
    // finishes, the sound is skipped.)
    player.seekTo(0).catch(() => {});
  };

  // Called LANDING_LEAD_MS (in Coin.tsx) before the coin stops, so the sound lines up with the landing.
  const landSound = () => {
    if (soundOn) player.play();
  };

  const land = () => {
    if (hapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
  };

  return { launch, landSound, land };
}
