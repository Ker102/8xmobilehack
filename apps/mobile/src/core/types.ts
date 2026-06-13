import { Palette, type SwatchName } from '@/constants/theme';
import type { IconName } from '@/design/Icon';

export type MoodId = 'joy' | 'warm' | 'calm' | 'low';

export type Mood = {
  id: MoodId;
  label: string;
  color: string;
};

export const MOODS: Record<MoodId, Mood> = {
  joy: { id: 'joy', label: 'Joyful', color: Palette.moodJoy },
  warm: { id: 'warm', label: 'Warm', color: Palette.moodWarm },
  calm: { id: 'calm', label: 'Calm', color: Palette.moodCalm },
  low: { id: 'low', label: 'Heavy', color: Palette.moodLow },
};

/** One illustrated panel of a page: a solid scene swatch + a clean line-icon motif. */
export type Panel = {
  id: string;
  caption: string;
  icon: IconName;
  swatch: SwatchName;
  imageKey?: string;
};

export type Page = {
  title: string;
  panels: Panel[];
  narration: string[];
  mood: MoodId;
};

export type PhotoAttachment = {
  id: string;
  label: string;
  caption: string;
  icon: IconName;
  swatch: SwatchName;
  imageKey?: string;
};

export type AvatarChoices = {
  presetId: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  detail: string;
  accessory: string;
};

export type Privacy = 'private' | 'public';

export type Entry = {
  id: string;
  dateISO: string;
  transcript: string;
  page: Page;
  attachments: PhotoAttachment[];
  privacy: Privacy;
};

export type Reaction = { icon: IconName; count: number };

export type FeedItem = {
  id: string;
  authorName: string;
  authorColor: string;
  genre: string;
  page: Page;
  reactions: Reaction[];
};

export type MemorySource = 'chat' | 'entry' | 'onboarding';

export type MemoryItem = {
  id: string;
  label: string;
  value: string;
  source: MemorySource;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  unlocked: boolean;
};

export type ChatRole = 'otto' | 'user';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

export type CompanionTurn = {
  ottoPrompt: string;
  userReply: string;
  memory?: Omit<MemoryItem, 'id'>;
  personalization?: string;
};
