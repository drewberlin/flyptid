# Flyptid — CLAUDE.md

## What this is
Flyptid is a coin-flip app where the two sides of the coin are cryptids (legendary creatures) instead of heads and tails. It also has a hidden "prank mode" that weights the result toward one side.

**Why it exists:** Andrew (the developer) wants to go through the full App Store and Google Play release process with a small, fun app that has no backend. Shipping it cleanly matters more than adding features.

**About the developer:** he knows intermediate Python and C, but React and JavaScript are new to him. Explain each step briefly in plain language, and tell him what to run and what he should see when he runs it.

## Hard constraints
- No backend, no accounts, no analytics, no ads, no tracking, no network calls
- The only things saved are settings and flip history, on the phone, using AsyncStorage
- Version 1 is **free** with no in-app purchases
- English only
- iPhone only (`supportsTablet: false`), portrait only. Android phones are supported too.
- The app asks for no permissions. On Android, remove any permissions that get added by default.
- All artwork must be original. No copyrighted characters, no emoji as artwork.

## Stack
- **Expo**: use the current stable SDK that works with Expo Go, plus TypeScript
- **Navigation:** expo-router (main screen plus modal sheets)
- **Animation:** react-native-reanimated (3D coin flip)
- **Graphics:** react-native-svg (cryptid art)
- **Feedback:** expo-haptics, and expo-audio for sound (not the deprecated expo-av)
- **Storage:** @react-native-async-storage/async-storage
- **Tests:** jest, used for the skew and best-of logic only
- **Builds:** EAS Build and EAS Submit, but only in the release phase

Ask Andrew before adding any dependency that isn't on this list.

## Config
- App name: `Flyptid`, slug: `flyptid`
- iOS `bundleIdentifier` and Android `package`: `com.drewberlin.flyptid`
- Version `1.0.0`
- Project folder: `~/Desktop/projects/Claude projects/flyptid/`
- GitHub repo: `drewberlin/flyptid`

## Cryptids (10)
| id | Name | Default |
|---|---|---|
| chupacabra | Chupacabra | **Side A** |
| ogopogo | Ogopogo | **Side B** |
| manatee | Manatee | (the joke one, not actually a cryptid) |
| sasquatch | Sasquatch | |
| yeti | Yeti | |
| nessie | Nessie | |
| mothman | Mothman | |
| jerseydevil | Jersey Devil | |
| jackalope | Jackalope | |
| kraken | Kraken | |

- Store this list as one data file (`src/data/cryptids.ts`), so that adding or swapping a cryptid means editing that file only
- Each cryptid has an `id`, a `name`, an accent colour and an SVG component
- **Art for version 1:** simple, original, flat vector drawings in one consistent style, sitting on a coin face (a circle with a rim). They are placeholders and will be replaced later, so keep each one in its own file under `src/art/`.

## Features

### 1. Flip (main screen)
- One large coin in the centre, with side A's name on the left and side B's name on the right
- **Tap the coin:** it flips with a 3D animation of about 1.2–1.8 s (several spins, then it eases to a stop), lands on the result, and the result name appears below
- Play a haptic on launch and a stronger one on landing, plus a short flip sound
- Sound follows the phone's silent switch (on iOS, set `playsInSilentMode` to false)
- Ignore taps while the coin is mid-flip
- Decide the result **before** the animation starts, then animate to that face

### 2. Side picker
- Opened with a button on the main screen, as a modal sheet
- Two rows, "Side A" and "Side B", each showing the 10 cryptids as a grid of coin thumbnails
- **The same cryptid cannot be on both sides:** whatever is chosen for one side is disabled (greyed out) in the other side's grid
- Choices are saved and restored on the next launch

### 3. Prank mode (the hidden skew)
- **Long-press the coin (about 600 ms)** to open the prank sheet. A long press must never also trigger a flip.
- The sheet has a slider from 0 to 100, labelled with side A's name on the left and side B's on the right, showing the chance of side A (e.g. "Chupacabra 80% · Ogopogo 20%")
- Default is 50. The full range from 0 to 100 is allowed, so one side can win every time.
- Add a "Reset to fair" button
- The setting is saved and stays on until the user changes it (it does **not** reset when the app closes)
- **Indicator:** when the skew isn't 50, show a tiny, subtle dot (about 4 px, low contrast) near the bottom edge of the coin. It's meant for the owner only, nothing more obvious.
- **Logic:** `resultIsA = Math.random() < pA / 100`. Write this as a pure function in `src/logic/flip.ts`, with unit tests covering 0, 50 and 100.

### 4. Extras
- **History:** a sheet listing the last 50 flips (cryptid, time), with a "Clear" button. Saved on the phone. Don't mark which flips were skewed.
- **Best of 3 / 5:** a toggle on the main screen with three settings: Off / Best of 3 / Best of 5. Show the running score (e.g. "Chupacabra 1 – 0 Ogopogo"). When a side reaches the majority, announce the winner and offer "New round". Write this as pure logic in `src/logic/series.ts`, with tests.

### 5. Settings / About (modal)
- Toggles for sound on/off and haptics on/off
- A **"How it works"** section that briefly mentions prank mode: "Long-press the coin to weight the odds. Perfect for settling arguments in your favour." Apple rule 2.3.1 requires every feature to be clear to users and to App Review, so this section must stay in.
- A link to the privacy policy, and the app version

## Release materials (in the repo)
- `docs/privacy.html`: a one-page privacy policy saying the app collects no data, keeps settings only on the phone, and has no third-party services. It will be published on GitHub Pages at `https://drewberlin.github.io/flyptid/privacy.html`.
- `store/description.md`: App Store and Google Play listing text that names prank mode explicitly
- `store/review-notes.md`: notes for App Review saying: "Prank mode: long-press the coin for ~0.6 s to open a slider that weights the odds toward one side. This is a deliberate entertainment feature, described in the app's How it works section and in the store description. The app has no account, no network access and no data collection."
- App icon (1024×1024, no transparency) and splash screen, in the same art style

## Build phases
Stop at the end of each phase so Andrew can test it in Expo Go, then commit to git.

1. **Setup:** create the Expo project, push it to GitHub, run the app in Expo Go with an empty main screen
2. **Coin:** coin component with placeholder faces, flip animation, flip logic and tests, haptics, sound
3. **Cryptids:** data file, 10 SVG drawings, side picker with the blocking rule, saving to the phone
4. **Prank mode:** long-press sheet, slider, indicator dot, saving to the phone
5. **Extras:** history, best of 3/5, settings/about
6. **Polish:** icon, splash screen, check small and large iPhone screen sizes, Android check (back button, safe areas)
7. **Release materials:** privacy page, store text, review notes, `eas.json`
8. **Release:** walk Andrew through it step by step. He has to do the account and payment steps himself.
   - iOS: enrol in the Apple Developer Program, create the app in App Store Connect (and reserve the name), EAS build, TestFlight, submit
   - Android: Play Console account (US$25), closed test with at least 12 testers for 14 days, then apply for production

## Working rules for Claude Code
- Never run `eas submit`, publish anything, or change store or account settings without Andrew saying yes first
- Keep components small and readable. Comment anything that isn't obvious.
- After each phase, summarise in 3–5 lines what was done and what Andrew should test

## Out of scope for version 1
Paid version, in-app purchases, iPad support, other languages, custom cryptid names, user-uploaded images, widgets, Apple Watch.
