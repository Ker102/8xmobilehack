import { StyleSheet, View } from 'react-native';

import { NumberTicker } from '@/components/NumberTicker';
import { Otto } from '@/components/Otto';
import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { useOtto } from '@/core/store';
import type { Achievement, MemoryItem } from '@/core/types';
import { AppText, Icon, Screen, type IconName } from '@/design';

export default function YouScreen() {
  const entries = useOtto((s) => s.entries);
  const achievements = useOtto((s) => s.achievements);
  const memory = useOtto((s) => s.memory);
  const streak = useOtto((s) => s.gamification.streak);

  const shared = entries.filter((e) => e.privacy === 'public').length;

  return (
    <Screen>
      <View style={styles.hero}>
        <Otto size={92} />
        <View style={{ gap: 3, alignItems: 'center' }}>
          <AppText size={24} weight="bold" letterSpacing={-0.4}>
            You
          </AppText>
          <AppText size={14} color="textFaint">
            journaling with Otto
          </AppText>
        </View>
      </View>

      <View style={styles.stats}>
        <Stat icon="pages" value={entries.length} label="Pages" />
        <Stat icon="flame" value={streak} label="Day streak" />
        <Stat icon="globe" value={shared} label="Shared" />
      </View>

      <SectionTitle>Milestones</SectionTitle>
      <View style={styles.milestones}>
        {achievements.map((a) => (
          <Milestone key={a.id} achievement={a} />
        ))}
      </View>

      <SectionTitle>What Otto remembers</SectionTitle>
      <View style={styles.memCard}>
        {memory.map((m, i) => (
          <MemoryRow key={m.id} item={m} last={i === memory.length - 1} />
        ))}
      </View>
    </Screen>
  );
}

function Stat({ icon, value, label }: { icon: IconName; value: number; label: string }) {
  return (
    <View style={[styles.stat, Shadow.soft]}>
      <Icon name={icon} size={18} color={Colors.light.accent} strokeWidth={2.2} />
      <NumberTicker value={value} size={24} weight="bold" letterSpacing={-0.5} />
      <AppText size={12.5} color="textFaint">
        {label}
      </AppText>
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <AppText size={13} weight="semibold" color="textFaint" letterSpacing={0.6} style={styles.sectionTitle}>
      {children.toUpperCase()}
    </AppText>
  );
}

function Milestone({ achievement }: { achievement: Achievement }) {
  const on = achievement.unlocked;
  return (
    <View style={styles.milestone}>
      <View style={styles.milestoneIcon}>
        <Icon
          name={achievement.icon}
          size={19}
          color={on ? Colors.light.accent : Colors.light.textFaint}
          strokeWidth={2}
        />
      </View>
      <View style={{ flex: 1 }}>
        <AppText size={15} weight="semibold" color={on ? 'text' : 'textFaint'}>
          {achievement.title}
        </AppText>
        <AppText size={13} color="textFaint">
          {achievement.description}
        </AppText>
      </View>
      {on ? <Icon name="check" size={16} color={Colors.light.accent} strokeWidth={2.6} /> : null}
    </View>
  );
}

function MemoryRow({ item, last }: { item: MemoryItem; last: boolean }) {
  return (
    <View style={[styles.memRow, !last && styles.memDivider]}>
      <AppText size={14.5} weight="semibold">
        {item.label}
      </AppText>
      <AppText size={14.5} color="textSecondary" style={{ flex: 1 }} numberOfLines={2}>
        {item.value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: Spacing.three, marginBottom: Spacing.four },
  stats: { flexDirection: 'row', gap: Spacing.three },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
    paddingVertical: Spacing.three,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
  },
  sectionTitle: { marginTop: Spacing.five, marginBottom: Spacing.three },
  milestones: {
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    paddingHorizontal: Spacing.three,
    ...Shadow.soft,
  },
  milestone: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.three },
  milestoneIcon: { width: 26, alignItems: 'center', justifyContent: 'center' },
  memCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.one,
    ...Shadow.soft,
  },
  memRow: { flexDirection: 'row', gap: Spacing.three, alignItems: 'flex-start', paddingVertical: Spacing.three },
  memDivider: { borderBottomWidth: 1, borderBottomColor: Colors.light.borderSoft },
});
