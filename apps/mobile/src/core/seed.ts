import { Palette } from '@/constants/theme';
import type { Achievement, CompanionTurn, Entry, FeedItem, MemoryItem, Page, PhotoAttachment } from '@/core/types';

export const DEMO_ATTACHMENTS: PhotoAttachment[] = [
  {
    id: 'photo-police-props',
    label: '2am evidence',
    caption: 'Handcuffs, siren, moon, pocket watch',
    icon: 'lock',
    swatch: 'blue',
    imageKey: 'policeStory',
  },
];

/** The page produced live during the demo (the storytime showcase). */
export const DEMO_PAGE: Page = {
  title: 'All I saw was the police arresting my naked dad at 2am.',
  mood: 'joy',
  narration: [
    'I woke up to violent banging downstairs and someone shouting, “Police! Open the door!”',
    'Dad ran past my bedroom wearing nothing but one grey sock, holding a wooden spoon like a medieval weapon.',
    'Outside, three officers watched him check his car while every porch light on the street came alive.',
    'After the handcuffs came off, Mum pointed to the kitchen counter. His wallet had been beside the kettle the whole time.',
  ],
  panels: [
    { id: 'p1', caption: 'Police at the door, 2am.', icon: 'clock', swatch: 'mist', imageKey: 'policeStory' },
    { id: 'p2', caption: 'One sock, one spoon, zero context.', icon: 'skull', swatch: 'peach' },
    { id: 'p3', caption: 'The whole street quietly woke up.', icon: 'globe', swatch: 'sky' },
    { id: 'p4', caption: 'The wallet was beside the kettle.', icon: 'coffee', swatch: 'sand' },
  ],
};

export const DEMO_TRANSCRIPT =
  'I woke up to violent banging downstairs, followed by someone shouting, “Police! Open the door!” ' +
  'Dad sprinted past my bedroom wearing absolutely nothing except one grey sock, holding a wooden spoon, and whispered, “Don’t panic.” ' +
  'By the time I reached the hallway he was in front of three police officers, naked, pointing the spoon like it was a weapon. ' +
  'They were looking for someone trying car doors, but Dad ran outside to check his car, still naked, still wearing one sock, still holding the spoon. ' +
  'The neighbours woke up, Dad got handcuffed against his own car, and after everyone realised he was just half-asleep, Mum pointed out that his wallet had been beside the kettle the whole time.';

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
    attachments: DEMO_ATTACHMENTS.slice(0, 2),
    privacy: 'private',
  },
  {
    id: 'entry-idea',
    dateISO: '2026-06-12T13:00:00.000Z',
    transcript: 'We argued about the idea for ages but finally picked one everyone is excited about.',
    page: ideaPage,
    attachments: DEMO_ATTACHMENTS.slice(1, 3),
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
  { id: 'm1', label: 'Story style', value: 'Likes deadpan captions for chaotic family stories', source: 'onboarding' },
  { id: 'm2', label: 'Privacy', value: 'Keep family details playful and anonymised', source: 'entry' },
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
    ottoPrompt: 'That story is chaos. Which detail should I make the funniest without being mean?',
    userReply: 'The wooden spoon. He genuinely held it like it could protect him.',
    memory: { label: 'Comedic detail', value: 'Wooden spoon is the funniest beat', source: 'chat' },
    personalization: 'Made the spoon the recurring visual gag across the page.',
  },
  {
    ottoPrompt: 'Should I keep your dad anonymous if this ever gets shared?',
    userReply: 'Yes. Make it funny, but do not make him identifiable.',
    memory: { label: 'Family privacy', value: 'Keep dad anonymous in shared story pages', source: 'chat' },
  },
  {
    ottoPrompt: 'What tone should the page use — dramatic, deadpan, or full cartoon?',
    userReply: 'Deadpan. The story is already ridiculous enough.',
    memory: { label: 'Tone', value: 'Prefers deadpan narration for ridiculous stories', source: 'chat' },
  },
];

export const INITIAL_GAMIFICATION = {
  level: 3,
  xp: 240,
  xpToNext: 400,
  streak: 3,
};
