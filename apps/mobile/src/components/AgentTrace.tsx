import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { Otto } from '@/components/Otto';
import { Spinner } from '@/components/Spinner';
import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { AGENT_TRACE, TOTAL_TRACE_MS, type AgentEvent } from '@/core/agent';
import { AppText, Icon } from '@/design';

type Item = { ev: AgentEvent; index: number; status: 'running' | 'done' };

export function AgentTrace({ onDone }: { onDone: () => void }) {
  const [items, setItems] = useState<Item[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const progress = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: TOTAL_TRACE_MS, easing: Easing.inOut(Easing.ease) });
    pulse.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.out(Easing.cubic) }), -1, false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let acc = 0;
    AGENT_TRACE.forEach((ev, index) => {
      timers.push(
        setTimeout(() => {
          setItems((prev) => [...prev, { ev, index, status: ev.kind === 'tool' ? 'running' : 'done' }]);
        }, acc),
      );
      if (ev.kind === 'tool') {
        timers.push(
          setTimeout(
            () => setItems((prev) => prev.map((it) => (it.index === index ? { ...it, status: 'done' } : it))),
            acc + ev.durationMs - 120,
          ),
        );
      }
      acc += ev.durationMs;
    });
    timers.push(setTimeout(onDone, acc + 350));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
    return () => cancelAnimationFrame(id);
  }, [items]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));
  const activeTool = [...items].reverse().find((it) => it.ev.kind === 'tool' && it.status === 'running')?.ev;

  return (
    <View style={styles.root}>
      <View style={styles.head}>
        <View style={styles.ottoStage}>
          <PulseRing pulse={pulse} delay={0} />
          <PulseRing pulse={pulse} delay={0.42} />
          <Otto size={108} energy="happy" state="painting" />
        </View>
        <ThinkingLabel />
        <AppText size={12.5} weight="medium" color="textFaint" letterSpacing={0.5}>
          {activeTool?.kind === 'tool' ? `USING ${activeTool.tool.toUpperCase()}` : 'PREPARING PAGE'}
        </AppText>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {items.map((it) => (it.ev.kind === 'tool' ? (
          <ToolRow key={it.index} item={it} />
        ) : (
          <ThoughtRow key={it.index} text={it.ev.text} />
        )))}
      </ScrollView>
    </View>
  );
}

function PulseRing({ pulse, delay }: { pulse: SharedValue<number>; delay: number }) {
  const style = useAnimatedStyle(() => {
    const phase = (pulse.value + delay) % 1;
    return {
      opacity: interpolate(phase, [0, 0.45, 1], [0.18, 0.1, 0]),
      transform: [{ scale: interpolate(phase, [0, 1], [0.72, 1.42]) }],
    };
  });
  return <Animated.View pointerEvents="none" style={[styles.pulseRing, style]} />;
}

function ThinkingLabel() {
  const o = useSharedValue(0.5);
  const [dots, setDots] = useState('');
  useEffect(() => {
    o.value = withRepeat(withTiming(1, { duration: 850, easing: Easing.inOut(Easing.sin) }), -1, true);
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? '' : d + '·')), 380);
    return () => clearInterval(id);
  }, [o]);
  const style = useAnimatedStyle(() => ({ opacity: o.value }));
  return (
    <Animated.View style={style}>
      <AppText size={15} weight="medium" color="textSecondary" letterSpacing={0.3}>
        Otto is thinking {dots}
      </AppText>
    </Animated.View>
  );
}

function ThoughtRow({ text }: { text: string }) {
  return (
    <Animated.View entering={FadeInUp.duration(360)} style={styles.thought}>
      <Icon name="sparkles" size={14} color={Colors.light.textFaint} strokeWidth={2} />
      <AppText size={14.5} color="textSecondary" style={styles.thoughtText}>
        {text}
      </AppText>
    </Animated.View>
  );
}

function ToolRow({ item }: { item: Item }) {
  const ev = item.ev as Extract<AgentEvent, { kind: 'tool' }>;
  const running = item.status === 'running';
  const highlight = ev.tool === 'recall_memory';
  return (
    <Animated.View entering={FadeInUp.springify().damping(18)} style={[styles.tool, Shadow.soft, highlight && styles.toolHighlight]}>
      <View style={[styles.toolMarker, running && styles.toolMarkerLive, highlight && styles.toolMarkerHighlight]}>
        <Icon
          name={ev.icon}
          size={18}
          color={highlight || running ? Colors.light.accent : Colors.light.textFaint}
          strokeWidth={2.1}
        />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={styles.toolTop}>
          <AppText size={14.5} weight="semibold" letterSpacing={-0.1}>
            {ev.tool}
          </AppText>
          <AppText size={12.5} color="textFaint">
            {ev.args}
          </AppText>
        </View>
        <AppText size={13.5} color={running ? 'textFaint' : 'accentDeep'} weight={running ? 'regular' : 'medium'}>
          {running ? 'working…' : ev.result}
        </AppText>
      </View>
      {running ? <Spinner size={18} /> : <Icon name="check" size={18} color={Colors.light.accent} strokeWidth={2.6} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', width: '100%' },
  head: { alignItems: 'center', gap: Spacing.three, paddingTop: Spacing.four, width: '100%' },
  ottoStage: { width: 132, height: 116, alignItems: 'center', justifyContent: 'center' },
  pulseRing: {
    position: 'absolute',
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 1,
    borderColor: Colors.light.accent,
  },
  track: {
    width: '70%',
    maxWidth: 280,
    height: 5,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.backgroundElement,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: Colors.light.accent, borderRadius: Radius.pill },
  scroll: { flex: 1, alignSelf: 'stretch', marginTop: Spacing.three },
  scrollContent: { gap: Spacing.two, paddingVertical: Spacing.three, paddingBottom: Spacing.six },
  thought: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, paddingHorizontal: Spacing.two, paddingVertical: 2 },
  thoughtText: { flex: 1, fontStyle: 'italic' },
  tool: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    borderLeftWidth: 3,
    borderLeftColor: Colors.light.borderSoft,
    padding: Spacing.three - 2,
  },
  toolHighlight: { borderColor: Colors.light.accent, borderLeftColor: Colors.light.accent },
  toolMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolMarkerLive: { borderWidth: 1, borderColor: Colors.light.accent },
  toolMarkerHighlight: { borderWidth: 1, borderColor: Colors.light.accent },
  toolTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, justifyContent: 'space-between' },
});
