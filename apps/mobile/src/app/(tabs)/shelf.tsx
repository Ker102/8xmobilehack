import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { MoodPill } from '@/components/MoodPill';
import { Panel } from '@/components/Panel';
import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { useOtto } from '@/core/store';
import type { Entry } from '@/core/types';
import { AppText, Icon, Screen } from '@/design';

export default function ShelfScreen() {
  const router = useRouter();
  const entries = useOtto((s) => s.entries);
  const streak = useOtto((s) => s.gamification.streak);

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <AppText size={34} weight="bold" letterSpacing={-0.8}>
            Your Shelf
          </AppText>
          <AppText size={14.5} color="textSecondary">
            {entries.length} pages · private by default
          </AppText>
        </View>
        <View style={styles.streak}>
          <Icon name="flame" size={15} color={Colors.light.accent} strokeWidth={2} />
          <AppText size={14} weight="medium" color="textSecondary">
            {streak}-day streak
          </AppText>
        </View>
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
      <Panel panel={cover} height={104} width={104} rounded={Radius.lg - 4} iconSize={34} />
      <View style={styles.cardBody}>
        <AppText size={21} weight="bold" numberOfLines={2} letterSpacing={-0.45} lineHeight={25}>
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
      <View style={styles.privacy}>
        <Icon name={shared ? 'globe' : 'lock'} size={18} color={Colors.light.textFaint} strokeWidth={1.9} />
      </View>
    </Pressable>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.three, marginBottom: Spacing.five },
  titleBlock: { flex: 1, gap: 4 },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 8 },
  list: { gap: Spacing.four },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    padding: Spacing.three,
  },
  pressed: { opacity: 0.85 },
  cardBody: { flex: 1, gap: 9 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  dotSep: { width: 3, height: 3, borderRadius: 2, backgroundColor: Colors.light.textFaint },
  privacy: { alignSelf: 'center', paddingLeft: Spacing.one },
});
