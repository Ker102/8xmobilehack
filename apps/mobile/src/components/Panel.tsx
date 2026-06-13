import { Image, StyleSheet, View } from 'react-native';

import { Colors, Radius, Swatch } from '@/constants/theme';
import { getDemoImage } from '@/core/imageAssets';
import type { Panel as PanelType } from '@/core/types';
import { Icon } from '@/design/Icon';

type PanelProps = {
  panel: PanelType;
  height?: number;
  width?: number;
  rounded?: number;
  iconSize?: number;
};

/** A page's "scene": a single solid brand swatch with a clean line-icon motif. No gradients. */
export function Panel({ panel, height = 200, width, rounded = Radius.lg, iconSize }: PanelProps) {
  const swatch = Swatch[panel.swatch];
  const image = getDemoImage(panel.imageKey);
  const size = iconSize ?? Math.round(height * 0.26);
  return (
    <View
      style={[
        styles.wrap,
        { height, borderRadius: rounded, backgroundColor: swatch.bg },
        width != null ? { width } : { alignSelf: 'stretch' },
      ]}>
      {image ? (
        <Image source={image} style={styles.image} resizeMode="cover" />
      ) : (
        <Icon name={panel.icon} size={size} color={swatch.fg} strokeWidth={1.75} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
  },
  image: { width: '100%', height: '100%' },
});
