import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AttachmentStrip } from '@/components/AttachmentStrip';
import { Otto } from '@/components/Otto';
import { PageView } from '@/components/PageView';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { DEMO_ATTACHMENTS, DEMO_PAGE } from '@/core/seed';
import { useOtto } from '@/core/store';
import { MOODS } from '@/core/types';
import { AppText, Button, Icon, Screen } from '@/design';

const REACTIONS: Record<string, string> = {
  joy: 'Otto blinked twice. “That was absolute chaos — I kept it deadpan.”',
  warm: 'Otto glowed softly. “A good, warm day. I kept it cozy.”',
  calm: 'Otto settled in close. “Calm suits you. Page kept gentle.”',
  low: 'Otto dimmed and sat near. “Heavy day. I held it carefully.”',
};

export default function RevealScreen() {
  const router = useRouter();
  const lastId = useOtto((s) => s.lastCreatedEntryId);
  const entries = useOtto((s) => s.entries);
  const addAttachmentToEntry = useOtto((s) => s.addAttachmentToEntry);
  const shareEntry = useOtto((s) => s.shareEntry);

  const entry = lastId ? entries.find((e) => e.id === lastId) : undefined;
  const page = entry?.page ?? DEMO_PAGE;
  const attachments = entry?.attachments ?? DEMO_ATTACHMENTS;
  const [replayKey, setReplayKey] = useState(0);
  const [playing, setPlaying] = useState(false);

  const onSave = () => router.replace('/shelf');
  const onShare = () => {
    if (entry) shareEntry(entry.id);
    router.replace('/feed');
  };

  return (
    <Screen bottomInset={Spacing.six}>
      <Animated.View entering={FadeIn.duration(420)} style={styles.ottoRow}>
        <Otto size={72} energy="happy" />
        <AppText size={15} weight="medium" color="text" lineHeight={21} style={{ flex: 1 }}>
          {REACTIONS[page.mood]}
        </AppText>
      </Animated.View>

      <Pressable style={styles.playPill} onPress={() => setPlaying((p) => !p)}>
        <Icon name="play" size={15} color={Colors.light.accentDeep} strokeWidth={2.4} fill={Colors.light.accentDeep} />
        <AppText size={14} weight="semibold" color="accentDeep">
          {playing ? 'Narration playing' : 'Play narration'}
        </AppText>
        <View style={[styles.playDot, { backgroundColor: MOODS[page.mood].color }]} />
      </Pressable>

      <AttachmentStrip
        attachments={attachments}
        title="Image Otto used"
        actionLabel="Add more"
        onAdd={entry ? () => addAttachmentToEntry(entry.id) : undefined}
      />

      <View key={replayKey} style={styles.page}>
        <PageView page={page} animate />
      </View>

      <View style={styles.actions}>
        <Button label="Save to Shelf" icon="shelf" fullWidth onPress={onSave} />
        <Button label="Share to Feed" icon="share" variant="secondary" fullWidth onPress={onShare} />
        <Pressable onPress={() => setReplayKey((k) => k + 1)} style={styles.replay}>
          <Icon name="replay" size={15} color={Colors.light.textFaint} strokeWidth={2.2} />
          <AppText size={14} weight="medium" color="textFaint">
            Replay
          </AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  ottoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, marginBottom: Spacing.three },
  playPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 3,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.accentTint,
    marginBottom: Spacing.three,
  },
  playDot: { width: 7, height: 7, borderRadius: 4 },
  page: { marginTop: Spacing.five, marginBottom: Spacing.five },
  actions: { gap: Spacing.two + 2 },
  replay: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'center', paddingVertical: Spacing.two },
});
