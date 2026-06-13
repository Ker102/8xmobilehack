import { DEMO_PAGE } from '@/core/seed';
import type { IconName } from '@/design/Icon';
import type { Page } from '@/core/types';

/**
 * Scripted stand-in for the async formatting agent. The trace below is a
 * legible "agent is thinking + calling tools" sequence — the same shape a real
 * LangGraph run would emit (transcribe -> analyse -> inspect references -> structure
 * -> illustrate -> narrate), but timed and offline so the demo never fails.
 */

export type AgentThought = { kind: 'thought'; text: string; durationMs: number };
export type AgentToolCall = {
  kind: 'tool';
  tool: string;
  icon: IconName;
  args: string;
  result: string;
  durationMs: number;
};
export type AgentEvent = AgentThought | AgentToolCall;

export const AGENT_TRACE: AgentEvent[] = [
  { kind: 'thought', text: 'Listening for the story beats…', durationMs: 1100 },
  {
    kind: 'tool',
    tool: 'transcribe',
    icon: 'audio',
    args: 'story audio · 2:14',
    result: '608 words captured',
    durationMs: 1100,
  },
  {
    kind: 'tool',
    tool: 'read_mood',
    icon: 'sparkles',
    args: 'transcript',
    result: 'chaotic · funny · embarrassed',
    durationMs: 950,
  },
  {
    kind: 'tool',
    tool: 'inspect_photos',
    icon: 'image',
    args: '1 reference image',
    result: 'handcuffs · siren · moon · pocket watch',
    durationMs: 1050,
  },
  { kind: 'thought', text: 'This needs to feel absurd, not mean.', durationMs: 1000 },
  {
    kind: 'tool',
    tool: 'recall_memory',
    icon: 'brain',
    args: 'user · story style',
    result: 'likes deadpan captions · keep family private',
    durationMs: 1200,
  },
  {
    kind: 'tool',
    tool: 'draft_structure',
    icon: 'list',
    args: 'comic escalation · 4 beats',
    result: 'door · spoon · street · wallet',
    durationMs: 1050,
  },
  {
    kind: 'tool',
    tool: 'illustrate',
    icon: 'image',
    args: '4 panels · reference-aware',
    result: '4 panels rendered',
    durationMs: 1300,
  },
  {
    kind: 'tool',
    tool: 'compose_narration',
    icon: 'quote',
    args: 'voice · deadpan',
    result: 'clean storytime narration',
    durationMs: 1000,
  },
  { kind: 'thought', text: 'Done. Saving the page to your shelf.', durationMs: 900 },
];

export const TOTAL_TRACE_MS = AGENT_TRACE.reduce((s, e) => s + e.durationMs, 0);

/** The page the scripted pipeline always resolves to for the demo. */
export function generatePage(_transcript: string): Page {
  return DEMO_PAGE;
}
