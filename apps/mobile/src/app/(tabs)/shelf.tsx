import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { MoodPill } from '@/components/MoodPill';
import { Panel } from '@/components/Panel';
import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { useOtto } from '@/core/store';
import type { Entry } from '@/core/types';
import { AppText, Chip, Icon, Screen } from '@/design';

export default function ShelfScreen() {
  const router = useRouter();
  const entries = useOtto((s) => s.entries);
  const streak = useOtto((s) => s.gamification.streak);

  return (
    <Screen>
      <View style={styles.header}>
        <View style={{ flex: 1, gap: 3 }}>
          <AppText size={30} weight="bold" letterSpacing={-0.5}>
            Your Shelf
          </AppText>
          <AppText size={14.5} color="textSecondary">
            {entries.length} pages · private by default
          </AppText>
        </View>
        <Chip label={`${streak}-day streak`} tone="accent" icon="flame" />
      </View>

      <View style={styles.list}>
        {entries.map((entry, i) => (
          <Animated.View key={entry.id} entering={FadeInDown.delay(i * 70).duration(420)}>
            <EntryCard entry={entry} onPress={() => router.push(`/entry/${entry.id}`)} />
          </Animated.View>
        ))}
      </View>
    </Screen>
  );
}

function EntryCard({ entry, onPress }: { entry: Entry; onPress: () => void }) {
  const cover = entry.page.panels[0];
  const shared = entry.privacy === 'public';
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, Shadow.card, pressed && styles.pressed]}>
      <Panel panel={cover} height={84} width={84} rounded={Radius.md} iconSize={30} />
      <View style={styles.cardBody}>
        <AppText size={16.5} weight="semibold" numberOfLines={2} letterSpacing={-0.2}>
          {entry.page.title}
        </AppText>
        <View style={styles.metaRow}>
          <MoodPill mood={entry.page.mood} />
          <View style={styles.dotSep} />
          <AppText size={13} color="textFaint">
            {formatDate(entry.dateISO)}
          </AppText>
        </View>
      </View>
      <Icon name={shared ? 'globe' : 'lock'} size={16} color={Colors.light.textFaint} strokeWidth={2} />
    </Pressable>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, marginBottom: Spacing.four },
  list: { gap: Spacing.three },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    padding: Spacing.two + 2,
    paddingRight: Spacing.three,
  },
  pressed: { opacity: 0.85 },
  cardBody: { flex: 1, gap: 7 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  dotSep: { width: 3, height: 3, borderRadius: 2, backgroundColor: Colors.light.textFaint },
});
