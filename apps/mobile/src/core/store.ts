import { create } from 'zustand';

import { generatePage } from '@/core/agent';
import {
  COMPANION_SCRIPT,
  DEMO_ATTACHMENTS,
  DEMO_TRANSCRIPT,
  INITIAL_GAMIFICATION,
  SEED_ACHIEVEMENTS,
  SEED_ENTRIES,
  SEED_FEED,
  SEED_MEMORY,
} from '@/core/seed';
import type {
  Achievement,
  ChatMessage,
  CompanionTurn,
  Entry,
  FeedItem,
  MemoryItem,
  PhotoAttachment,
} from '@/core/types';

let idCounter = 0;
const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${(idCounter++).toString(36)}`;

type Gamification = typeof INITIAL_GAMIFICATION;

type OttoState = {
  entries: Entry[];
  feed: FeedItem[];
  memory: MemoryItem[];
  achievements: Achievement[];
  gamification: Gamification;

  draftTranscript: string;
  draftAttachments: PhotoAttachment[];
  lastCreatedEntryId: string | null;
  personalizations: string[];

  chat: ChatMessage[];
  companionIndex: number;

  onboarded: boolean;
  setOnboarded: (v: boolean) => void;

  setDraft: (text: string) => void;
  attachDemoPhotos: () => void;
  addAttachmentToEntry: (id: string) => void;
  commitEntry: () => Entry;
  shareEntry: (id: string) => void;
  getEntry: (id: string) => Entry | undefined;
  addMemory: (item: Omit<MemoryItem, 'id'>) => void;
  advanceCompanion: () => CompanionTurn | null;
  resetCompanion: () => void;
  addXp: (amount: number) => void;
};

export const useOtto = create<OttoState>((set, get) => ({
  entries: SEED_ENTRIES,
  feed: SEED_FEED,
  memory: SEED_MEMORY,
  achievements: SEED_ACHIEVEMENTS,
  gamification: { ...INITIAL_GAMIFICATION },

  draftTranscript: '',
  draftAttachments: DEMO_ATTACHMENTS,
  lastCreatedEntryId: null,
  personalizations: [],

  chat: [
    {
      id: uid('msg'),
      role: 'otto',
      text: 'Hey. I saw you made a page today. Want to tell me about it?',
    },
  ],
  companionIndex: 0,

  onboarded: false,
  setOnboarded: (v) => set({ onboarded: v }),

  setDraft: (text) => set({ draftTranscript: text }),
  attachDemoPhotos: () => set({ draftAttachments: DEMO_ATTACHMENTS }),
  addAttachmentToEntry: (id) =>
    set((s) => ({
      entries: s.entries.map((e) => {
        if (e.id !== id) return e;
        const existing = new Set(e.attachments.map((a) => a.id));
        const next = DEMO_ATTACHMENTS.find((a) => !existing.has(a.id));
        return next ? { ...e, attachments: [...e.attachments, next] } : e;
      }),
    })),

  commitEntry: () => {
    const transcript = get().draftTranscript.trim() || DEMO_TRANSCRIPT;
    const attachments = get().draftAttachments.length ? get().draftAttachments : DEMO_ATTACHMENTS;
    const entry: Entry = {
      id: uid('entry'),
      dateISO: new Date().toISOString(),
      transcript,
      page: generatePage(transcript),
      attachments,
      privacy: 'private',
    };
    set((s) => ({
      entries: [entry, ...s.entries],
      lastCreatedEntryId: entry.id,
      draftTranscript: '',
    }));
    get().addXp(60);
    return entry;
  },

  shareEntry: (id) =>
    set((s) => {
      const entry = s.entries.find((e) => e.id === id);
      if (!entry) return s;
      const alreadyInFeed = s.feed.some((f) => f.id === `feed-${id}`);
      const feed = alreadyInFeed
        ? s.feed
        : [
            {
              id: `feed-${id}`,
              authorName: 'you',
              authorColor: '#378ADD',
              genre: 'Hackathon',
              page: entry.page,
              reactions: [{ icon: 'heart', count: 3 }],
            } as FeedItem,
            ...s.feed,
          ];
      return {
        feed,
        entries: s.entries.map((e) => (e.id === id ? { ...e, privacy: 'public' } : e)),
      };
    }),

  getEntry: (id) => get().entries.find((e) => e.id === id),

  addMemory: (item) => set((s) => ({ memory: [{ id: uid('mem'), ...item }, ...s.memory] })),

  advanceCompanion: () => {
    const idx = get().companionIndex;
    if (idx >= COMPANION_SCRIPT.length) return null;
    const turn = COMPANION_SCRIPT[idx];
    set((s) => ({
      chat: [
        ...s.chat,
        { id: uid('msg'), role: 'otto', text: turn.ottoPrompt },
        { id: uid('msg'), role: 'user', text: turn.userReply },
      ],
      companionIndex: s.companionIndex + 1,
      memory: turn.memory ? [{ id: uid('mem'), ...turn.memory }, ...s.memory] : s.memory,
      personalizations: turn.personalization
        ? [...s.personalizations, turn.personalization]
        : s.personalizations,
    }));
    if (turn.memory) get().addXp(20);
    return turn;
  },

  resetCompanion: () =>
    set({
      companionIndex: 0,
      chat: [
        {
          id: uid('msg'),
          role: 'otto',
          text: 'Hey. I saw you made a page today. Want to tell me about it?',
        },
      ],
    }),

  addXp: (amount) =>
    set((s) => {
      let { level, xp, xpToNext, streak } = s.gamification;
      xp += amount;
      while (xp >= xpToNext) {
        xp -= xpToNext;
        level += 1;
        xpToNext = Math.round(xpToNext * 1.3);
      }
      return { gamification: { level, xp, xpToNext, streak } };
    }),
}));
