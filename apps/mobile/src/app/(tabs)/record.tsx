import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { AttachmentStrip } from '@/components/AttachmentStrip';
import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { useOtto } from '@/core/store';
import { AppText, Button, Icon, Screen } from '@/design';

const PROMPTS = [
  'How was today?',
  'What happened that you want to remember?',
  'Tell me about a moment from today.',
  'What made today feel like today?',
];

export default function RecordScreen() {
  const router = useRouter();
  const setDraft = useOtto((s) => s.setDraft);
  const attachments = useOtto((s) => s.draftAttachments);
  const attachDemoPhotos = useOtto((s) => s.attachDemoPhotos);

  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    if (typing) return;
    const id = setInterval(() => setPromptIndex((i) => (i + 1) % PROMPTS.length), 3200);
    return () => clearInterval(id);
  }, [typing]);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const goGenerate = (transcript?: string) => {
    if (transcript && transcript.trim().length > 0) setDraft(transcript);
    router.push('/session/generating');
  };

  const onRecordPress = () => {
    if (!recording) {
      setRecording(true);
      setSeconds(0);
    } else {
      setRecording(false);
      goGenerate();
    }
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <Animated.View key={typing ? 'typing' : promptIndex} entering={FadeIn.duration(400)}>
          <AppText size={23} weight="semibold" center color="text" letterSpacing={-0.3}>
            {typing ? 'Type your day' : PROMPTS[promptIndex]}
          </AppText>
        </Animated.View>

        <AttachmentStrip
          attachments={attachments}
          title="Attached for this page"
          actionLabel="Add photos"
          onAdd={attachDemoPhotos}
        />

        {typing ? (
          <View style={styles.typeBox}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Today I…"
              placeholderTextColor={Colors.light.textFaint}
              multiline
              style={styles.input}
              autoFocus
            />
            <Button label="Create my page" icon="sparkles" fullWidth onPress={() => goGenerate(text)} />
            <Pressable onPress={() => setTyping(false)} style={styles.switchRow}>
              <Icon name="mic" size={15} color={Colors.light.textFaint} strokeWidth={2.2} />
              <AppText size={14} weight="medium" color="textFaint">
                use voice instead
              </AppText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.recordArea}>
            <RecordButton recording={recording} onPress={onRecordPress} />
            {recording ? (
              <View style={styles.recordingMeta}>
                <Waveform />
                <AppText size={16} weight="semibold" color="accent">
                  {formatTime(seconds)}
                </AppText>
                <AppText size={13} color="textFaint">
                  tap to finish
                </AppText>
              </View>
            ) : (
              <Pressable onPress={() => setTyping(true)} hitSlop={10} style={styles.switchRow}>
                <Icon name="keyboard" size={16} color={Colors.light.textFaint} strokeWidth={2.2} />
                <AppText size={14.5} weight="medium" color="textFaint">
                  type instead
                </AppText>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </Screen>
  );
}

function RecordButton({ recording, onPress }: { recording: boolean; onPress: () => void }) {
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = recording
      ? withRepeat(withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.sin) }), -1, false)
      : withTiming(0);
  }, [recording, pulse]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pulse.value * 0.28 }],
    opacity: 0.18 * (1 - pulse.value),
  }));

  return (
    <View style={styles.recordButtonWrap}>
      <Animated.View style={[styles.pulseRing, ringStyle]} />
      <Pressable
        onPress={onPress}
        style={[styles.recordButton, Shadow.floating, recording && styles.recordButtonActive]}>
        {recording ? (
          <View style={styles.stopIcon} />
        ) : (
          <Icon name="mic" size={38} color={Colors.light.accent} strokeWidth={1.9} />
        )}
      </Pressable>
    </View>
  );
}

function Waveform() {
  const bars = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);
  return (
    <View style={styles.waveform}>
      {bars.map((i) => (
        <WaveBar key={i} index={i} />
      ))}
    </View>
  );
}

function WaveBar({ index }: { index: number }) {
  const h = useSharedValue(0.3);
  useEffect(() => {
    const peak = 0.45 + ((index * 37) % 50) / 100;
    h.value = withRepeat(
      withTiming(peak, { duration: 480 + (index % 5) * 90, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [h, index]);
  const style = useAnimatedStyle(() => ({ height: `${h.value * 100}%` }));
  return <Animated.View style={[styles.waveBar, style]} />;
}

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.four },
  recordArea: { alignItems: 'center', gap: Spacing.four },
  recordButtonWrap: { alignItems: 'center', justifyContent: 'center' },
  pulseRing: { position: 'absolute', width: 132, height: 132, borderRadius: 66, backgroundColor: Colors.light.accent },
  recordButton: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: Colors.light.surface,
    borderWidth: 1.5,
    borderColor: Colors.light.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonActive: { backgroundColor: Colors.light.accentSoft, borderColor: Colors.light.accent },
  stopIcon: { width: 34, height: 34, borderRadius: 9, backgroundColor: Colors.light.accent },
  recordingMeta: { alignItems: 'center', gap: Spacing.two },
  waveform: { flexDirection: 'row', alignItems: 'center', gap: 4, height: 44, width: 210, justifyContent: 'center' },
  waveBar: { width: 4, borderRadius: 2, backgroundColor: Colors.light.accent },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'center' },
  typeBox: { alignSelf: 'stretch', gap: Spacing.three },
  input: {
    minHeight: 150,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    fontFamily: 'Geist_400Regular',
    fontSize: 17,
    color: Colors.light.text,
    textAlignVertical: 'top',
    ...Shadow.soft,
  },
});
