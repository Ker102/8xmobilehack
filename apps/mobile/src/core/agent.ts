import { DEMO_PAGE } from '@/core/seed';
import type { IconName } from '@/design/Icon';
import type { Page } from '@/core/types';

/**
 * Scripted stand-in for the async formatting agent. The trace below is a
 * legible "agent is thinking + calling tools" sequence — the same shape a real
 * LangGraph run would emit (transcribe -> analyse -> recall memory -> structure
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
  { kind: 'thought', text: 'Listening to how today actually felt…', durationMs: 1100 },
  {
    kind: 'tool',
    tool: 'transcribe',
    icon: 'audio',
    args: 'audio · 0:48',
    result: '96 words captured',
    durationMs: 1100,
  },
  {
    kind: 'tool',
    tool: 'read_mood',
    icon: 'sparkles',
    args: 'transcript',
    result: 'joyful · high energy',
    durationMs: 950,
  },
  {
    kind: 'tool',
    tool: 'inspect_photos',
    icon: 'image',
    args: '4 reference photos',
    result: 'venue · whiteboard · build · pitch night',
    durationMs: 1050,
  },
  { kind: 'thought', text: 'This connects to what they told me before.', durationMs: 1000 },
  {
    kind: 'tool',
    tool: 'recall_memory',
    icon: 'brain',
    args: 'user · hackathon',
    result: 'building Otto with 2 teammates · pitch tomorrow',
    durationMs: 1200,
  },
  {
    kind: 'tool',
    tool: 'draft_structure',
    icon: 'list',
    args: 'arc · 4 beats',
    result: '4 scenes outlined',
    durationMs: 1050,
  },
  {
    kind: 'tool',
    tool: 'illustrate',
    icon: 'image',
    args: '4 panels · avatar-locked',
    result: '4 panels rendered',
    durationMs: 1300,
  },
  {
    kind: 'tool',
    tool: 'compose_narration',
    icon: 'quote',
    args: 'voice · warm',
    result: 'narration written',
    durationMs: 1000,
  },
  { kind: 'thought', text: 'Done. Saving the page to your shelf.', durationMs: 900 },
];

export const TOTAL_TRACE_MS = AGENT_TRACE.reduce((s, e) => s + e.durationMs, 0);

/** The page the scripted pipeline always resolves to for the demo. */
export function generatePage(_transcript: string): Page {
  return DEMO_PAGE;
}
