import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, Radius, Shadow, Spacing, Swatch } from '@/constants/theme';
import type { PhotoAttachment } from '@/core/types';
import { AppText, Icon } from '@/design';

type AttachmentStripProps = {
  attachments: PhotoAttachment[];
  title?: string;
  actionLabel?: string;
  onAdd?: () => void;
};

export function AttachmentStrip({
  attachments,
  title = 'Reference photos',
  actionLabel = 'Add photos',
  onAdd,
}: AttachmentStripProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <View style={styles.titleRow}>
          <Icon name="image" size={15} color={Colors.light.textFaint} strokeWidth={2} />
          <AppText size={13.5} weight="semibold" color="textSecondary">
            {title}
          </AppText>
          <AppText size={13} color="textFaint">
            {attachments.length}
          </AppText>
        </View>
        {onAdd ? (
          <Pressable onPress={onAdd} hitSlop={10}>
            <AppText size={13.5} weight="semibold" color="accent">
              {actionLabel}
            </AppText>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.list}>
        {attachments.map((item) => {
          const swatch = Swatch[item.swatch];
          return (
            <View key={item.id} style={[styles.item, Shadow.soft]}>
              <View style={[styles.thumb, { backgroundColor: swatch.bg }]}>
                <Icon name={item.icon} size={24} color={swatch.fg} strokeWidth={1.8} />
              </View>
              <AppText size={12.5} weight="medium" numberOfLines={1}>
                {item.label}
              </AppText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: 'stretch', gap: Spacing.two },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.three },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  list: { flexDirection: 'row', gap: Spacing.two },
  item: {
    flex: 1,
    minWidth: 0,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
    padding: 7,
    gap: 6,
  },
  thumb: {
    height: 58,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
  },
});
