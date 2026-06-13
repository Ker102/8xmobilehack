import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { PageView } from '@/components/PageView';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useOtto } from '@/core/store';
import { AppText, Button, Card, Icon, Screen } from '@/design';

export default function EntryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const entry = useOtto((s) => s.getEntry(id));
  const shareEntry = useOtto((s) => s.shareEntry);

  return (
    <Screen>
      <View style={styles.topBar}>
        <AppText size={13} weight="medium" color="textFaint" letterSpacing={0.2}>
          {entry ? formatDate(entry.dateISO) : 'Entry'}
        </AppText>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.close}>
          <Icon name="close" size={17} color={Colors.light.textSecondary} strokeWidth={2.4} />
        </Pressable>
      </View>

      {!entry ? (
        <AppText size={16} color="textSecondary">
          This page is no longer here.
        </AppText>
      ) : (
        <View style={{ gap: Spacing.five }}>
          <PageView page={entry.page} animate />

          <Card tone="cream" elevated={false} style={{ gap: Spacing.two }}>
            <View style={styles.quoteHead}>
              <Icon name="quote" size={14} color={Colors.light.textFaint} strokeWidth={2.2} />
              <AppText size={12.5} weight="semibold" color="textFaint" letterSpacing={0.6}>
                WHAT YOU SAID
              </AppText>
            </View>
            <AppText size={15.5} lineHeight={23} color="text">
              {entry.transcript}
            </AppText>
          </Card>

          {entry.privacy === 'private' ? (
            <Button label="Share to Feed" icon="share" variant="secondary" fullWidth onPress={() => shareEntry(entry.id)} />
          ) : (
            <View style={styles.sharedNote}>
              <Icon name="globe" size={15} color={Colors.light.accentDeep} strokeWidth={2.2} />
              <AppText size={14} weight="medium" color="accentDeep">
                Shared to the feed
              </AppText>
            </View>
          )}
        </View>
      )}
    </Screen>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.three },
  close: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.light.backgroundElement,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sharedNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.light.accentTint,
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
});
