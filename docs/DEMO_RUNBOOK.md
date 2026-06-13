# Otto — Demo Runbook

A fully scripted, offline demo. No network calls, no live model, no backend — the whole thing runs from local seed data so it cannot fail on stage.

## Hosting (Vercel)

The app is an Expo universal app; we deploy its **web export** as a static site.

**One-time Vercel project setup:**

1. Import the GitHub repo into Vercel.
2. Set **Root Directory** = `apps/mobile`.
3. Vercel reads `apps/mobile/vercel.json`:
   - Install: `npm install`
   - Build: `expo export --platform web`
   - Output: `dist`
   - Framework preset: Other.
4. Deploy. Every push to the default branch ships a new build.

To verify a production build locally before pushing:

```bash
cd apps/mobile
npm install
npx expo export --platform web
npx serve dist          # open the printed URL
```

## Presenting

Open the deployed URL full-screen on a phone browser (or a phone-sized window). Backups: an Expo Go QR for the same code, plus screen mirroring.

## The scripted run of show

0. **Onboarding (cold open).** A fresh load opens on the intro — *Welcome → Build your avatar → Meet Otto → How it works*. On the avatar step, pick one of the pre-rendered avatar presets and tap **that’s me!**. "In ten seconds: you become the character, you talk, Otto illustrates, Otto remembers." Tap **Start journaling** (or **Skip** to jump straight in). *(The intro shows on every fresh load, so it's a reliable opener; use Skip if you'd rather start on the Shelf.)*
1. **Shelf.** "This is my private journal — every page started as me just talking about my day. It's private by default." Point out the hackathon entries, moods, the streak.
2. **Tap Record (center).** The prompt rotates and four demo reference photos are already attached: venue table, whiteboard, first screen, pitch night. "I can speak, and Otto can also use the photos around the moment." Tap the mic → waveform + timer. Tap again to finish. *(Or tap "type instead" for the most bulletproof path.)*
3. **Generating — the agent at work.** Otto "thinks" while tool-call cards stream in: `transcribe → read_mood → inspect_photos → recall_memory → draft_structure → illustrate → compose_narration`, each going running → done. Call out **`inspect_photos`** using the four references and **`recall_memory`** surfacing a real stored fact. "A real async agent would emit exactly this trace — transcribe, read the mood, inspect context photos, *pull from memory*, structure, illustrate, narrate. Here it's scripted so it never fails on stage."
4. **Reveal.** The illustrated page plays in with Otto's mood reaction and shows the photos Otto used, with an **Add more** affordance for after-the-fact context. "Speak a day → a narrated, illustrated page, in under a minute. This is the magic and the moat."
5. **Share to Feed.** "The wild ones — one tap — go public." Land on the Feed of hackathon pages. "The feed seeds itself from the shareable subset. And it works for one user on day one, so no empty-feed death."
6. **Open Otto.** Tap **Answer Otto** once or twice. Show the inline "Saved to memory" (brain icon) and "Otto updated today's page" notes. "Otto remembers you and folds it back into your pages — a relationship, not a tool."
7. **You.** Level, streak, achievements, and **What Otto remembers**. "Gentle gamification; Otto never nags."

## If something goes wrong

- Prefer the **typed** record path; it's the most deterministic.
- If a gesture misfires, deep-link directly: `/onboarding`, `/shelf`, `/feed`, `/companion`, `/you`, `/record`, `/session/reveal`.
- The reveal route renders the canonical demo page even with no prior session, so it's always safe to jump to.
