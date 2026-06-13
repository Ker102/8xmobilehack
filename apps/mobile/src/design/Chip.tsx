import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';
import { Icon, type IconName } from '@/design/Icon';
import { AppText } from '@/design/Text';

type ChipProps = {
  label: string;
  tone?: 'neutral' | 'accent';
  icon?: IconName;
  style?: ViewStyle;
};

export function Chip({ label, tone = 'neutral', icon, style }: ChipProps) {
  const isAccent = tone === 'accent';
  const background = isAccent ? Colors.light.accentSoft : Colors.light.backgroundElement;
  const textColor = isAccent ? Colors.light.accentDeep : Colors.light.textSecondary;

  return (
    <View style={[styles.chip, { backgroundColor: background }, style]}>
      {icon ? <Icon name={icon} size={12} color={textColor} strokeWidth={2.4} /> : null}
      <AppText size={12.5} weight="medium" color={textColor} letterSpacing={0.1}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
});
