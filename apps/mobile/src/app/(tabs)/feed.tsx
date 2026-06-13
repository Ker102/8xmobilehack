import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { MoodPill } from '@/components/MoodPill';
import { NumberTicker } from '@/components/NumberTicker';
import { Panel } from '@/components/Panel';
import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { useOtto } from '@/core/store';
import type { FeedItem } from '@/core/types';
import { AppText, Icon, Screen } from '@/design';

export default function FeedScreen() {
  const feed = useOtto((s) => s.feed);

  return (
    <Screen>
      <View style={styles.header}>
        <AppText size={30} weight="bold" letterSpacing={-0.5}>
          Feed
        </AppText>
        <AppText size={14.5} color="textSecondary">
          Hackathon pages people chose to share
        </AppText>
      </View>

      <View style={styles.list}>
        {feed.map((item, i) => (
          <Animated.View key={item.id} entering={FadeIn.delay(i * 90).duration(460)}>
            <FeedCard item={item} />
          </Animated.View>
        ))}
      </View>
    </Screen>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  const cover = item.page.panels[0];
  return (
    <View style={[styles.card, Shadow.card]}>
      <View style={styles.cardBody}>
        <View style={styles.copy}>
          <View style={styles.metaRow}>
            <View style={[styles.avatarDot, { backgroundColor: item.authorColor }]} />
            <AppText size={13.5} color="textSecondary">
              {item.authorName} · {item.genre}
            </AppText>
          </View>
          <AppText size={23} weight="bold" letterSpacing={-0.45} lineHeight={27}>
            {item.page.title}
          </AppText>
          <AppText size={15} color="textSecondary" lineHeight={21} numberOfLines={3}>
            {item.page.narration[0]}
          </AppText>
          <MoodPill mood={item.page.mood} />
        </View>
        <Panel panel={cover} height={88} width={88} rounded={Radius.md} iconSize={28} />
      </View>

      <View style={styles.actions}>
        {item.reactions.map((r) => (
          <View key={r.icon} style={styles.action}>
            <Icon name={r.icon} size={20} color={Colors.light.text} strokeWidth={2} />
            <NumberTicker value={r.count} format={compact} size={13} weight="medium" color="textSecondary" />
          </View>
        ))}
        <View style={{ flex: 1 }} />
        <Icon name="share" size={20} color={Colors.light.text} strokeWidth={2} />
        <Icon name="bookmark" size={20} color={Colors.light.text} strokeWidth={2} />
      </View>

    </View>
  );
}

function compact(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

const styles = StyleSheet.create({
  header: { marginBottom: Spacing.four, gap: 3 },
  list: { gap: Spacing.four },
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    padding: Spacing.three,
  },
  cardBody: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.three },
  copy: { flex: 1, gap: 7 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  avatarDot: { width: 8, height: 8, borderRadius: 4 },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingTop: Spacing.three,
  },
  action: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
