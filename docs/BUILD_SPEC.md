# Otto — Build Specification

> A voice journal that turns a spoken day into an animated illustrated page. Private by default; one-tap share to a feed of the wildest public pages.

This is the functional spec. It describes **what the app does** — every screen, state, and interaction. Each section marks **[HACKATHON]** for what to cut or fake in the demo build, and **[IN DEMO]** for what the Expo app in `apps/mobile` actually implements today.

**Decisions locked:** Name **Otto** · Companion **Otto** (octopus) · Wedge **Hackathons** · Brand cream `#F6F3EA` + blue `#378ADD`, Geist Sans · Demo is a fully scripted, offline Expo web build hosted on Vercel.

---

## 0. Glossary

- **Entry** — one journaling session: the audio, transcript, generated page, mood, privacy state.
- **Page** — the visual artifact an entry produces: animated illustration + narration + captions.
- **Avatar** — the user's character, created once, appearing inside every page.
- **Companion (Otto)** — the octopus mascot; reacts to entries, remembers, lives on its own screen.
- **Shelf** — the user's private archive of their own pages.
- **Feed** — the public stream of pages users have chosen to share.

---

## 1. Navigation

Bottom tab bar, 5 tabs, hidden during recording/generation and onboarding:

`Shelf · Feed · Record (center, emphasised) · Otto · You`

Default tab on launch: **Shelf** for returning users, **Record** for brand-new users.

**[IN DEMO]** Custom 5-tab bar with a raised center Record button; Shelf is the default route; generation/reveal are full-screen routes that cover the bar.

---

## 2. Onboarding (first-run only)

1. **Welcome** — one-line promise + an example page playing. "Begin".
2. **Build your avatar** — ≤6 quick choices with live preview. "That's me".
3. **Meet Otto** — the octopus introduces itself in 1–2 lines. "Hi".
4. **First entry** — drop straight into Record. Deliver the magic *before* asking for an account.
5. **Account/save** — only *after* the first page is revealed.

**[HACKATHON]** Keep 2 + 4 + the reveal. Hardcode the avatar. Skip accounts (local only).
**[IN DEMO]** Cut for now; the app opens on a living Shelf and the Record→Reveal magic is one tap away.

---

## 3. Record (the core loop)

### 3.1 Idle — large central record button; rotating prompt above ("How was today?"); "type instead" below.
### 3.2 Recording — animated button + live waveform + elapsed time; tap to stop.
### 3.3 Generating — companion-themed "developing" beat; calm rotating status lines ("listening…", "sketching your day…", "adding colour…"); never a raw spinner. On failure, keep the transcript and offer gentle retry.
### 3.4 Reveal — finished page plays (illustration + narration + captions); Otto reacts with a mood; controls: **replay**, **Save (private)** [primary], **Share** [secondary], edit-mood.
### 3.5 Typed path — same loop with a text box; the reliable demo path.

**[HACKATHON]** Text path is the reliable demo path; pre-cache one page as stage fallback.
**[IN DEMO]** Both an animated record button (waveform + timer) and the typed path feed a scripted 5-step Generating sequence (Otto animating), which resolves to the pre-authored page and reveals it with Otto's mood reaction, a narration play affordance, Save→Shelf and Share→Feed.

---

## 4. Shelf (private archive)

Reverse-chronological pages; each shows date, thumbnail, mood, private/shared badge. Tap → full page replay. Gentle streak indicator; "On this day"; search/filter (v1). Warm empty state.

**[HACKATHON]** Pre-seed 2–3 pages; cut search/streaks/"on this day".
**[IN DEMO]** Pre-seeded hackathon entries with gradient thumbnails, mood + privacy chips, a gentle streak chip; tap opens the full page in a modal with the original transcript and a share action.

---

## 5. Feed (public, the upside)

Vertical full-screen scroll of **public** pages; autoplay with captions; engagement-ranked; seeded in one wedge genre. Per-page: react, save, share/export, report. **No comments at v1.** Sharing is explicit, reversible, with a voice choice. Off-platform watermarked export is a primary growth lever.

**[HACKATHON]** Pre-seed ~10–15 hackathon pages; hand-order; cut reactions/report/comments.
**[IN DEMO]** Scrollable feed of hackathon pages (author, mood, illustrated panel, narration, reaction counts, Export affordance). Sharing your own page from Reveal or the Shelf adds it to the feed as "you".

---

## 6. Companion (Otto the octopus)

Its own screen; reacts to recent entries. **Mood reactions:** good day → lights up, warm note; hard day → quiet, gentle, sits closer, never "cheer up"; silence → present, patient, **no guilt/streak-shaming**; milestone → small genuine celebration. **Prompts:** gentle, specific follow-ups from past entries, feeding the Record prompt. **Memory:** references earlier entries (continuity = key differentiator). **Guardrails:** warm, sparing, soulful, never therapy-speak, never breaks character.

**[HACKATHON]** Mascot + 2–3 scripted mood reactions; fake memory with a hardcoded callback; cut generated prompts.
**[IN DEMO]** Animated octopus with mood states; a scripted chat where each answer **visibly writes to per-user memory** and can **personalize today's page** — the memory backbone made tangible for judges.

---

## 7. Trust & safety (gate before any public posting)

Block real named people, sexual content, minors, how-to-harm. Report flow → review queue. Clear wild-but-fine vs harmful line enforced at share time. A **launch requirement** for the feed.

**[HACKATHON]** Not needed (founder-seeded content only); mention as designed-in.

---

## 8. You / settings

Avatar re-edit; default share voice; privacy defaults (entries always private by default; cannot be globally flipped public); gentle optional notifications; streak/stats; subscription; export/delete data.

**[IN DEMO]** Profile with level + XP, streak, achievements (locked/unlocked), and a "What Otto remembers" list backed by the live memory store.

---

## 9. Monetisation

Free: journaling + feed. Paid: unlimited generations, higher-quality animation, longer narration, premium styles. Habit free; generation volume + quality is the paywall. **[HACKATHON]** Cut.

---

## 10. Cross-cutting rules

- **Private by default, always.** Public is deliberate, per-entry, reversible.
- **The shared artifact is the page, not the transcript.**
- **Speed of first delight** — opening to first page under 60 seconds.
- **Otto never nags.** Every retention mechanic is gentle.
- **Captions always available.**

---

## 11. Build order

0. **De-risk:** prove avatar/style **consistency** across scenes (the untested core risk).
1. **Hackathon:** onboarding-lite → record (text) → generate → reveal → shelf + pre-seeded feed + scripted Otto. ← *this repo*
2. **v1:** full voice + audio + captions, consistency pipeline, real shelf, share + engagement feed, Otto prompts + memory, moderation floor, subscription.
3. **Growth:** "on this day", Wrapped montage, smarter ranking, genre expansion.

---

## 12. Resolved decisions

1. **Name** — Otto.
2. **Wedge genre** — Hackathons.
3. **Consistency feasibility** — to prototype in Phase 0 (per-user avatar + memory-conditioned image pipeline).
4. **Companion** — Otto: warm, sparing, soulful octopus; reacts in colour/proximity more than words.
