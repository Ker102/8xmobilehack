import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { Otto } from '@/components/Otto';
import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { useOtto } from '@/core/store';
import { AppText, Button, Icon, Screen, type IconName } from '@/design';

type Bullet = { icon: IconName; title: string; sub: string };

type Step = {
  ottoSize: number;
  eyebrow: string;
  title: string;
  body?: string;
  bullets?: Bullet[];
  cta: string;
};

const STEPS: Step[] = [
  {
    ottoSize: 158,
    eyebrow: 'Welcome to',
    title: 'Otto',
    body: 'Speak your day. Otto turns your words into an illustrated page you’ll actually want to revisit.',
    cta: 'Continue',
  },
  {
    ottoSize: 104,
    eyebrow: 'Say hi to',
    title: 'Meet Otto',
    bullets: [
      { icon: 'mic', title: 'Just talk', sub: 'Ramble for a minute — no formatting, no pressure.' },
      { icon: 'image', title: 'Get a page', sub: 'Otto illustrates your day into scenes with narration.' },
      { icon: 'brain', title: 'Remembers you', sub: 'He keeps what matters and weaves it into tomorrow.' },
    ],
    cta: 'Continue',
  },
  {
    ottoSize: 104,
    eyebrow: 'The flow',
    title: 'How it works',
    bullets: [
      { icon: 'mic', title: 'Speak or type', sub: 'Capture how today actually felt.' },
      { icon: 'wand', title: 'Otto’s agent works', sub: 'It thinks, recalls, and illustrates — live.' },
      { icon: 'pages', title: 'Lands on your shelf', sub: 'A private page, yours to keep or share.' },
    ],
    cta: 'Start journaling',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const setOnboarded = useOtto((s) => s.setOnboarded);
  const [step, setStep] = useState(0);
  const data = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const finish = (href: '/record' | '/shelf') => {
    setOnboarded(true);
    router.replace(href);
  };

  return (
    <Screen scroll={false} bottomInset={Spacing.five}>
      <View style={styles.root}>
        <Pressable style={styles.skip} onPress={() => finish('/shelf')} hitSlop={10}>
          <AppText size={14} weight="medium" color="textFaint">
            Skip
          </AppText>
        </Pressable>

        <View style={styles.center}>
          <Animated.View key={`art-${step}`} entering={FadeIn.duration(420)} style={styles.art}>
            <Otto size={data.ottoSize} energy="happy" />
          </Animated.View>

          <Animated.View key={`copy-${step}`} entering={FadeInDown.duration(420)} style={styles.copy}>
            <AppText size={13} weight="semibold" color="accent" letterSpacing={1.2} center>
              {data.eyebrow.toUpperCase()}
            </AppText>
            <AppText size={32} weight="bold" letterSpacing={-0.6} center>
              {data.title}
            </AppText>
            {data.body ? (
              <AppText size={16} color="textSecondary" lineHeight={24} center style={styles.body}>
                {data.body}
              </AppText>
            ) : null}

            {data.bullets ? (
              <View style={styles.bullets}>
                {data.bullets.map((b) => (
                  <View key={b.title} style={[styles.bullet, Shadow.soft]}>
                    <View style={styles.bulletIcon}>
                      <Icon name={b.icon} size={20} color={Colors.light.accentDeep} strokeWidth={2.1} />
                    </View>
                    <View style={{ flex: 1, gap: 2 }}>
                      <AppText size={15.5} weight="semibold">
                        {b.title}
                      </AppText>
                      <AppText size={13.5} color="textSecondary" lineHeight={19}>
                        {b.sub}
                      </AppText>
                    </View>
                  </View>
                ))}
              </View>
            ) : null}
          </Animated.View>
        </View>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {STEPS.map((_, i) => (
              <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
            ))}
          </View>
          <Button
            label={data.cta}
            icon={isLast ? 'mic' : undefined}
            fullWidth
            onPress={() => (isLast ? finish('/record') : setStep((s) => s + 1))}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, width: '100%' },
  skip: { position: 'absolute', top: 0, right: 0, padding: Spacing.two, zIndex: 2 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.five },
  art: { alignItems: 'center' },
  copy: { alignItems: 'center', gap: Spacing.two, width: '100%' },
  body: { maxWidth: 320 },
  bullets: { width: '100%', gap: Spacing.three, marginTop: Spacing.three },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    padding: Spacing.three,
  },
  bulletIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: Colors.light.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { gap: Spacing.four, paddingTop: Spacing.three },
  dots: { flexDirection: 'row', gap: 7, justifyContent: 'center' },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.light.backgroundElement },
  dotActive: { width: 22, backgroundColor: Colors.light.accent },
});
