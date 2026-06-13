import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { Spacing } from '@/constants/theme';
import type { Page } from '@/core/types';
import { MoodPill } from '@/components/MoodPill';
import { Panel } from '@/components/Panel';
import { AppText } from '@/design/Text';

type PageViewProps = {
  page: Page;
  animate?: boolean;
};

export function PageView({ page, animate = false }: PageViewProps) {
  return (
    <View style={{ gap: Spacing.five }}>
      <Animated.View entering={animate ? FadeIn.duration(450) : undefined} style={styles.header}>
        <AppText size={30} weight="bold" lineHeight={36} letterSpacing={-0.5}>
          {page.title}
        </AppText>
        <MoodPill mood={page.mood} />
      </Animated.View>

      {page.panels.map((panel, i) => {
        const Wrapper = animate ? Animated.View : View;
        const entering = animate ? FadeInDown.delay(120 + i * 130).duration(480) : undefined;
        return (
          <Wrapper key={panel.id} entering={entering} style={{ gap: Spacing.three }}>
            <Panel panel={panel} height={210} />
            <View style={{ gap: 6 }}>
              <AppText size={14} weight="semibold" color="text" letterSpacing={0.1}>
                {panel.caption}
              </AppText>
              {page.narration[i] ? (
                <AppText size={15.5} color="textSecondary" lineHeight={24}>
                  {page.narration[i]}
                </AppText>
              ) : null}
            </View>
          </Wrapper>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { gap: Spacing.two },
});
