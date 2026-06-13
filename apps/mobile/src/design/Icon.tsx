import {
  AudioLines,
  BatteryLow,
  Bookmark,
  BookMarked,
  BookOpen,
  Brain,
  Image as ImageIcon,
  ListTree,
  LoaderCircle,
  WandSparkles,
  Check,
  ChevronRight,
  Clock,
  Coffee,
  Compass,
  Flame,
  GitMerge,
  Globe,
  HandHeart,
  Heart,
  Hourglass,
  Keyboard,
  Laugh,
  Lightbulb,
  Lock,
  MessageCircle,
  Mic,
  Moon,
  PenTool,
  Play,
  Plug,
  Quote,
  Radio,
  Rocket,
  RotateCcw,
  Send,
  Share2,
  Skull,
  Sparkles,
  Target,
  User,
  Waves,
  X,
  type LucideIcon,
} from 'lucide-react-native';

import { Colors } from '@/constants/theme';

const registry = {
  // navigation
  shelf: BookMarked,
  feed: Compass,
  mic: Mic,
  otto: Waves,
  user: User,
  // actions
  heart: Heart,
  bookmark: Bookmark,
  share: Share2,
  play: Play,
  replay: RotateCcw,
  send: Send,
  keyboard: Keyboard,
  check: Check,
  close: X,
  chevron: ChevronRight,
  // meta
  lock: Lock,
  globe: Globe,
  flame: Flame,
  clock: Clock,
  quote: Quote,
  pages: BookOpen,
  brain: Brain,
  sparkles: Sparkles,
  // reactions
  laugh: Laugh,
  skull: Skull,
  handHeart: HandHeart,
  // scene motifs
  plug: Plug,
  pen: PenTool,
  rocket: Rocket,
  moon: Moon,
  coffee: Coffee,
  target: Target,
  battery: BatteryLow,
  signal: Radio,
  hourglass: Hourglass,
  merge: GitMerge,
  bulb: Lightbulb,
  message: MessageCircle,
  // agent trace
  image: ImageIcon,
  wand: WandSparkles,
  list: ListTree,
  audio: AudioLines,
  loader: LoaderCircle,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
};

export function Icon({ name, size = 22, color = Colors.light.text, strokeWidth = 2, fill = 'none' }: IconProps) {
  const Cmp = registry[name];
  return <Cmp size={size} color={color} strokeWidth={strokeWidth} fill={fill} />;
}
