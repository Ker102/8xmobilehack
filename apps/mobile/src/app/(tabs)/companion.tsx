import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

import { Otto } from '@/components/Otto';
import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { COMPANION_SCRIPT } from '@/core/seed';
import { useOtto } from '@/core/store';
import type { ChatMessage, CompanionTurn } from '@/core/types';
import { AppText, Button, Icon, Screen } from '@/design';

export default function CompanionScreen() {
  const chat = useOtto((s) => s.chat);
  const companionIndex = useOtto((s) => s.companionIndex);
  const advance = useOtto((s) => s.advanceCompanion);
  const reset = useOtto((s) => s.resetCompanion);
  const memoryCount = useOtto((s) => s.memory.length);

  const [lastTurn, setLastTurn] = useState<CompanionTurn | null>(null);
  const done = companionIndex >= COMPANION_SCRIPT.length;

  const onAnswer = () => {
    const turn = advance();
    if (turn) setLastTurn(turn);
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <Otto size={104} energy="rest" />
        <AppText size={22} weight="bold" letterSpacing={-0.3}>
          Otto
        </AppText>
        <View style={styles.remember}>
          <Icon name="brain" size={13} color={Colors.light.textFaint} strokeWidth={2} />
          <AppText size={13.5} color="textFaint">
            remembers {memoryCount} things about you
          </AppText>
        </View>
      </View>

      <View style={styles.chat}>
        {chat.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
      </View>

      {lastTurn?.memory ? (
        <Animated.View key={`mem-${companionIndex}`} entering={FadeIn.duration(380)} style={styles.noteWrap}>
          <View style={styles.note}>
            <Icon name="brain" size={16} color={Colors.light.accentDeep} strokeWidth={2.2} />
            <View style={{ flex: 1 }}>
              <AppText size={13.5} weight="semibold" color="accentDeep">
                Saved to memory · {lastTurn.memory.label}
              </AppText>
              <AppText size={13.5} color="textSecondary">
                {lastTurn.memory.value}
              </AppText>
            </View>
          </View>
          {lastTurn.personalization ? (
            <View style={[styles.note, styles.noteHighlight]}>
              <Icon name="sparkles" size={16} color={Colors.light.accentDeep} strokeWidth={2.2} />
              <View style={{ flex: 1 }}>
                <AppText size={13.5} weight="semibold" color="accentDeep">
                  Otto updated today’s page
                </AppText>
                <AppText size={13.5} color="textSecondary">
                  {lastTurn.personalization}
                </AppText>
              </View>
            </View>
          ) : null}
        </Animated.View>
      ) : null}

      <View style={styles.action}>
        {done ? (
          <>
            <AppText size={14} color="textFaint" center>
              Otto’s all caught up for today.
            </AppText>
            <Button label="Start over" variant="secondary" icon="replay" onPress={() => { reset(); setLastTurn(null); }} />
          </>
        ) : (
          <Button label="Answer Otto" icon="send" fullWidth onPress={onAnswer} />
        )}
      </View>
    </Screen>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const isOtto = message.role === 'otto';
  return (
    <Animated.View
      entering={FadeInUp.duration(320)}
      style={[styles.bubbleRow, { justifyContent: isOtto ? 'flex-start' : 'flex-end' }]}>
      <View style={[isOtto ? styles.ottoBubble : styles.userBubble, !isOtto && Shadow.soft]}>
        <AppText size={15} lineHeight={21} color={isOtto ? 'text' : '#fff'}>
          {message.text}
        </AppText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: 8, marginBottom: Spacing.four },
  remember: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  chat: { gap: Spacing.two },
  bubbleRow: { flexDirection: 'row' },
  ottoBubble: {
    maxWidth: '82%',
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    borderRadius: Radius.lg,
    borderTopLeftRadius: 6,
    paddingVertical: Spacing.two + 3,
    paddingHorizontal: Spacing.three,
  },
  userBubble: {
    maxWidth: '82%',
    backgroundColor: Colors.light.accent,
    borderRadius: Radius.lg,
    borderTopRightRadius: 6,
    paddingVertical: Spacing.two + 3,
    paddingHorizontal: Spacing.three,
  },
  noteWrap: { gap: Spacing.two, marginTop: Spacing.three },
  note: {
    flexDirection: 'row',
    gap: Spacing.two,
    backgroundColor: Colors.light.accentTint,
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  noteHighlight: { borderWidth: 1, borderColor: Colors.light.accent },
  action: { marginTop: Spacing.four, gap: Spacing.two },
});
