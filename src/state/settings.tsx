import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { DEFAULT_SIDE_A, DEFAULT_SIDE_B, isCryptidId } from '../data/cryptids';
import type { Side } from '../logic/flip';

/**
 * App settings, shared by every screen and saved on the phone (AsyncStorage).
 * Later phases add more fields here (prank odds, sound, haptics...).
 */
export type Settings = {
  sideA: string; // cryptid id
  sideB: string; // cryptid id, never the same as sideA
};

const DEFAULTS: Settings = { sideA: DEFAULT_SIDE_A, sideB: DEFAULT_SIDE_B };
const STORAGE_KEY = 'flyptid:settings';

/** Turn whatever was saved (maybe old, maybe broken) into valid settings. */
function sanitize(raw: unknown): Settings {
  const s = { ...DEFAULTS };
  if (raw && typeof raw === 'object') {
    const r = raw as Record<string, unknown>;
    if (isCryptidId(r.sideA)) s.sideA = r.sideA;
    if (isCryptidId(r.sideB)) s.sideB = r.sideB;
  }
  // The same cryptid on both sides is never allowed.
  if (s.sideA === s.sideB) return { ...DEFAULTS };
  return s;
}

type SettingsContextValue = {
  settings: Settings;
  /** Choose a cryptid for one side. Ignored if it's already on the other side. */
  setSide: (side: Side, id: string) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  // 1. On launch, read the saved settings once.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => setSettings(sanitize(json ? JSON.parse(json) : null)))
      .catch(() => {}) // unreadable? just use the defaults
      .finally(() => setLoaded(true));
  }, []);

  // 2. Whenever settings change (after loading), save them.
  useEffect(() => {
    if (loaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch(() => {});
  }, [settings, loaded]);

  const setSide = (side: Side, id: string) =>
    setSettings((prev) => {
      const other = side === 'A' ? prev.sideB : prev.sideA;
      if (id === other || !isCryptidId(id)) return prev; // blocking rule
      return side === 'A' ? { ...prev, sideA: id } : { ...prev, sideB: id };
    });

  // Don't draw the app until saved settings are in, so it never flashes the defaults.
  if (!loaded) return null;

  return <SettingsContext.Provider value={{ settings, setSide }}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
