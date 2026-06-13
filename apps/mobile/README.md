# Otto — mobile app

The Otto demo app: a voice journal that turns a day into an animated, illustrated page. Built with **Expo (universal)** so the exact same code runs on iOS, Android, and the web — the web export is what we host and demo.

## Run locally

```bash
cd apps/mobile
npm install
npm run web      # open the printed http://localhost:8081 in a browser
# or: npm start   then press w (web), i (iOS), a (Android)
```

## Build the web bundle (what Vercel serves)

```bash
npm install
npx expo export --platform web   # outputs to ./dist
```

## Architecture (demo)

Everything is local and scripted — no network, no backend — so the demo is bulletproof on stage.

- `src/app/` — Expo Router routes. `(tabs)/` is the 5-tab shell (Shelf, Feed, Record, Otto, You); `session/` holds the full-screen Generating → Reveal flow; `entry/[id]` is the page detail modal.
- `src/design/` — brand primitives: `Screen`, `Text` (Geist), `Button`, `Card`, `Chip`.
- `src/components/` — `Otto` (animated octopus mascot), `PageView`/`Panel` (illustrated page render), `MoodPill`, `OttoTabBar`.
- `src/core/` — domain layer:
  - `types.ts` — `Entry`, `Page`, `Mood`, `FeedItem`, `MemoryItem`, `Achievement`, `CompanionTurn`.
  - `agent.ts` — the scripted stand-in for the async formatting agent (timed generation steps). Swap this for the real LangGraph pipeline in v1.
  - `seed.ts` — hackathon-themed pages, feed, memory, achievements, and Otto's scripted conversation.
  - `store.ts` — Zustand store tying entries, memory, companion chat, and gamification together.

The seams that become real in v1 are intentionally narrow: `agent.ts` (formatting pipeline) and the memory writes in `store.ts`.

## Brand

- Surfaces: warm cream `#F6F3EA`; accent blue `#378ADD`.
- Type: Geist Sans (`@expo-google-fonts/geist`).
- Motion: `react-native-reanimated` (entrances, the recording pulse/waveform, the Otto bob, the generation progress).
