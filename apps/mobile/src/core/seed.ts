import { Palette } from '@/constants/theme';
import type { Achievement, CompanionTurn, Entry, FeedItem, MemoryItem, Page } from '@/core/types';

/** The page produced live during the demo (the hackathon "build day"). */
export const DEMO_PAGE: Page = {
  title: 'The Day We Built Otto',
  mood: 'joy',
  narration: [
    'Today started at a long table full of strangers and three power strips fighting for one outlet.',
    'By noon the strangers were a team, and the whiteboard finally said something we believed in.',
    'We shipped the first screen at 2pm and actually gasped when the animation landed.',
    'It is late now. The room hums. Tomorrow we pitch — but tonight, this felt like something.',
  ],
  panels: [
    { id: 'p1', caption: 'One outlet, three laptops, zero plan.', icon: 'plug', swatch: 'sand' },
    { id: 'p2', caption: 'The whiteboard finally made sense.', icon: 'bulb', swatch: 'sky' },
    { id: 'p3', caption: 'First screen shipped. We gasped.', icon: 'rocket', swatch: 'blue' },
    { id: 'p4', caption: 'Late-night hum before the pitch.', icon: 'moon', swatch: 'mist' },
  ],
};

export const DEMO_TRANSCRIPT =
  "Okay so today was the hackathon. We started with basically nothing, just a table and a name. " +
  'Spent the morning arguing about the idea, but around noon it clicked and we finally agreed. ' +
  'We got the first screen working in the afternoon and the animation actually looked amazing. ' +
  "It's super late now and we still have to pitch tomorrow, but honestly this is the best I've felt all week.";

const arrivePage: Page = {
  title: 'Check-in & Caffeine',
  mood: 'warm',
  narration: [
    'Registration line, a lanyard, and a tote bag of stickers I will never use.',
    'Found a corner with an outlet — the real prize of any hackathon.',
  ],
  panels: [
    { id: 'a1', caption: 'Lanyard on. It begins.', icon: 'coffee', swatch: 'peach' },
    { id: 'a2', caption: 'Claimed an outlet. Victory.', icon: 'plug', swatch: 'sand' },
  ],
};

const ideaPage: Page = {
  title: 'The Idea Argument',
  mood: 'calm',
  narration: [
    'Four ideas on the board, three opinions, two hours, one snack run.',
    'We circled the one nobody could stop talking about.',
  ],
  panels: [
    { id: 'i1', caption: 'Too many sticky notes.', icon: 'pen', swatch: 'sky' },
    { id: 'i2', caption: 'The one we kept returning to.', icon: 'target', swatch: 'blue' },
  ],
};

export const SEED_ENTRIES: Entry[] = [
  {
    id: 'entry-arrive',
    dateISO: '2026-06-12T09:30:00.000Z',
    transcript: 'Just got to the venue, grabbed my badge and found a seat near an outlet.',
    page: arrivePage,
    privacy: 'private',
  },
  {
    id: 'entry-idea',
    dateISO: '2026-06-12T13:00:00.000Z',
    transcript: 'We argued about the idea for ages but finally picked one everyone is excited about.',
    page: ideaPage,
    privacy: 'public',
  },
];

export const SEED_FEED: FeedItem[] = [
  {
    id: 'feed-1',
    authorName: 'mara.builds',
    authorColor: Palette.moodJoy,
    genre: 'Hackathon',
    page: {
      title: 'We Demoed With 4% Battery',
      mood: 'joy',
      narration: [
        'The charger was across the room and the timer was already counting down.',
        'We pitched anyway. The screen died on the thank-you slide. We still won the round.',
      ],
      panels: [
        { id: 'f1a', caption: '4% and climbing the stage.', icon: 'battery', swatch: 'peach' },
        { id: 'f1b', caption: 'Died on the thank-you slide.', icon: 'mic', swatch: 'blue' },
      ],
    },
    reactions: [
      { icon: 'laugh', count: 212 },
      { icon: 'flame', count: 98 },
      { icon: 'handHeart', count: 41 },
    ],
  },
  {
    id: 'feed-2',
    authorName: 'devon.exe',
    authorColor: Palette.moodCalm,
    genre: 'Hackathon',
    page: {
      title: 'Our API Worked Once',
      mood: 'calm',
      narration: [
        'It returned 200 exactly one time, during the rehearsal nobody recorded.',
        'For the judges it returned vibes and a spinner. We narrated the vibes.',
      ],
      panels: [
        { id: 'f2a', caption: 'The legendary single 200.', icon: 'signal', swatch: 'sky' },
        { id: 'f2b', caption: 'Judges got the spinner.', icon: 'hourglass', swatch: 'mist' },
      ],
    },
    reactions: [
      { icon: 'skull', count: 167 },
      { icon: 'laugh', count: 120 },
    ],
  },
  {
    id: 'feed-3',
    authorName: 'sana.ships',
    authorColor: Palette.moodWarm,
    genre: 'Hackathon',
    page: {
      title: 'Slept Under The Table',
      mood: 'warm',
      narration: [
        'Hoodie as a pillow, tote bag as a blanket, a USB-C cable as a nightlight.',
        'Woke up to free breakfast and a merge conflict the size of a novel.',
      ],
      panels: [
        { id: 'f3a', caption: 'Hoodie pillow, 3am.', icon: 'moon', swatch: 'mist' },
        { id: 'f3b', caption: 'Merge conflict: the sequel.', icon: 'merge', swatch: 'blue' },
      ],
    },
    reactions: [
      { icon: 'handHeart', count: 88 },
      { icon: 'laugh', count: 73 },
    ],
  },
];

export const SEED_MEMORY: MemoryItem[] = [
  { id: 'm1', label: 'Team', value: 'Building Otto with two teammates', source: 'onboarding' },
  { id: 'm2', label: 'Goal', value: 'Pitch the demo tomorrow morning', source: 'entry' },
];

export const SEED_ACHIEVEMENTS: Achievement[] = [
  { id: 'first-page', title: 'First Page', description: 'Created your first Otto page.', icon: 'pages', unlocked: true },
  { id: 'night-owl', title: 'Night Owl', description: 'Journaled after midnight.', icon: 'moon', unlocked: true },
  { id: 'opened-up', title: 'Opened Up', description: 'Shared a page to the feed.', icon: 'globe', unlocked: true },
  { id: 'streak-3', title: 'Steady', description: 'Three days in a row.', icon: 'flame', unlocked: false },
  { id: 'deep-dive', title: 'Deep Dive', description: 'Answered five of Otto’s questions.', icon: 'otto', unlocked: false },
];

export const COMPANION_SCRIPT: CompanionTurn[] = [
  {
    ottoPrompt: 'You sound wired tonight. What actually made today click?',
    userReply: 'The moment our first screen animated and the whole team gasped.',
    memory: { label: 'Proud moment', value: 'First screen animation made the team gasp', source: 'chat' },
    personalization: 'Added “the gasp moment” as the emotional peak of today’s page.',
  },
  {
    ottoPrompt: 'Who was right there with you when it happened?',
    userReply: 'My two teammates — we basically became a team today.',
    memory: { label: 'People', value: 'Two teammates who became close today', source: 'chat' },
  },
  {
    ottoPrompt: 'How are you feeling about the pitch tomorrow — honestly?',
    userReply: 'Nervous, but the good kind. I think we have something real.',
    memory: { label: 'Tomorrow', value: 'Nervous-excited about the pitch', source: 'chat' },
  },
];

export const INITIAL_GAMIFICATION = {
  level: 3,
  xp: 240,
  xpToNext: 400,
  streak: 3,
};
