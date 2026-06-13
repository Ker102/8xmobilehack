import { Image, Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import type { AvatarChoices } from '@/core/types';
import { AppText, Button, Icon } from '@/design';

type AvatarPreset = {
  id: string;
  label: string;
  hairStyle: string;
  hairColor: string;
  skinTone: string;
  detail: string;
  accessory: string;
  source: ImageSourcePropType;
};

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: 'wavy-brown-freckles',
    label: 'Wavy',
    hairStyle: 'wavy',
    hairColor: 'brown',
    skinTone: 'warm',
    detail: 'freckles',
    accessory: 'none',
    source: require('../../assets/avatars/01_wavy_brown_hair_freckles.png'),
  },
  {
    id: 'curly-brown',
    label: 'Curly',
    hairStyle: 'curly',
    hairColor: 'brown',
    skinTone: 'warm',
    detail: 'soft',
    accessory: 'none',
    source: require('../../assets/avatars/02_curly_brown_hair.png'),
  },
  {
    id: 'black-bob',
    label: 'Bob',
    hairStyle: 'bob',
    hairColor: 'black',
    skinTone: 'light',
    detail: 'soft',
    accessory: 'none',
    source: require('../../assets/avatars/03_black_bob.png'),
  },
  {
    id: 'short-curls',
    label: 'Curls',
    hairStyle: 'short-curls',
    hairColor: 'black',
    skinTone: 'deep',
    detail: 'soft',
    accessory: 'none',
    source: require('../../assets/avatars/04_short_black_curls.png'),
  },
  {
    id: 'long-wavy',
    label: 'Long',
    hairStyle: 'long-wavy',
    hairColor: 'brown',
    skinTone: 'warm',
    detail: 'freckles',
    accessory: 'none',
    source: require('../../assets/avatars/05_long_wavy_brown_hair.png'),
  },
  {
    id: 'blue-beanie',
    label: 'Beanie',
    hairStyle: 'long',
    hairColor: 'brown',
    skinTone: 'warm',
    detail: 'soft',
    accessory: 'beanie',
    source: require('../../assets/avatars/06_blue_beanie_long_hair.png'),
  },
  {
    id: 'red-freckles',
    label: 'Red',
    hairStyle: 'curly',
    hairColor: 'red',
    skinTone: 'light',
    detail: 'freckles',
    accessory: 'none',
    source: require('../../assets/avatars/07_curly_red_hair_freckles.png'),
  },
  {
    id: 'blonde-waves',
    label: 'Blonde',
    hairStyle: 'waves',
    hairColor: 'blonde',
    skinTone: 'light',
    detail: 'soft',
    accessory: 'none',
    source: require('../../assets/avatars/08_long_blonde_waves.png'),
  },
  {
    id: 'glasses',
    label: 'Glasses',
    hairStyle: 'wavy',
    hairColor: 'black',
    skinTone: 'medium',
    detail: 'soft',
    accessory: 'glasses',
    source: require('../../assets/avatars/09_black_wavy_hair_glasses.png'),
  },
  {
    id: 'bun-earrings',
    label: 'Bun',
    hairStyle: 'bun',
    hairColor: 'black',
    skinTone: 'medium',
    detail: 'soft',
    accessory: 'earrings',
    source: require('../../assets/avatars/10_black_hair_bun_earrings.png'),
  },
];

const SKIN_TONES = [
  { id: 'light', color: '#F1D6BD' },
  { id: 'warm', color: '#DFAF7B' },
  { id: 'tan', color: '#B97843' },
  { id: 'deep', color: '#75482B' },
  { id: 'dark', color: '#3A241A' },
];

const HAIR_COLORS = [
  { id: 'black', color: '#1E120D' },
  { id: 'brown', color: '#5C351F' },
  { id: 'red', color: '#A95A24' },
  { id: 'blonde', color: '#DDA85A' },
  { id: 'gray', color: '#8C8880' },
];

const DETAIL_OPTIONS = ['freckles', 'soft', 'sparkle', 'heart', 'none'];
const ACCESSORY_OPTIONS = ['none', 'beanie', 'earrings', 'glasses'];

type AvatarBuilderProps = {
  value: AvatarChoices;
  onChange: (value: AvatarChoices) => void;
  onDone: () => void;
  onBack: () => void;
};

export function AvatarBuilder({ value, onChange, onDone, onBack }: AvatarBuilderProps) {
  const preset = AVATAR_PRESETS.find((p) => p.id === value.presetId) ?? AVATAR_PRESETS[0];

  const update = (patch: Partial<AvatarChoices>) => onChange({ ...value, ...patch });
  const selectPreset = (next: AvatarPreset) => {
    onChange({
      presetId: next.id,
      skinTone: next.skinTone,
      hairStyle: next.hairStyle,
      hairColor: next.hairColor,
      detail: next.detail,
      accessory: next.accessory,
    });
  };

  return (
    <Animated.View entering={FadeInDown.duration(420)} style={styles.root}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
        <Icon name="chevron" size={22} color={Colors.light.text} strokeWidth={2.2} />
      </Pressable>

      <View style={styles.header}>
        <AppText size={30} weight="bold" letterSpacing={-0.8} center>
          build your avatar
        </AppText>
        <AppText size={18} color="textSecondary" center>
          this is you, in your stories.
        </AppText>
      </View>

      <View style={[styles.preview, Shadow.soft]}>
        <AppText size={24} color="textFaint" style={[styles.spark, styles.sparkLeft]}>
          *
        </AppText>
        <Image source={preset.source} style={styles.avatar} resizeMode="contain" />
        <AppText size={24} color="textFaint" style={[styles.spark, styles.sparkRight]}>
          *
        </AppText>
      </View>

      <View style={styles.controls}>
        <DotRow
          label="skin tone"
          items={SKIN_TONES}
          selected={value.skinTone}
          onSelect={(skinTone) => update({ skinTone })}
        />
        <PresetRow selected={value.presetId} onSelect={selectPreset} />
        <DotRow
          label="hair colour"
          items={HAIR_COLORS}
          selected={value.hairColor}
          onSelect={(hairColor) => update({ hairColor })}
        />
        <TextOptionRow label="details" items={DETAIL_OPTIONS} selected={value.detail} onSelect={(detail) => update({ detail })} />
        <TextOptionRow
          label="accessory"
          optional
          items={ACCESSORY_OPTIONS}
          selected={value.accessory}
          onSelect={(accessory) => update({ accessory })}
        />
      </View>

      <Button label="that’s me!" fullWidth onPress={onDone} />
    </Animated.View>
  );
}

function RowLabel({ label, optional }: { label: string; optional?: boolean }) {
  return (
    <View style={styles.labelWrap}>
      <AppText size={15.5} weight="semibold">
        {label}
      </AppText>
      {optional ? (
        <AppText size={12.5} color="textFaint">
          optional
        </AppText>
      ) : null}
    </View>
  );
}

function DotRow({
  label,
  items,
  selected,
  onSelect,
}: {
  label: string;
  items: { id: string; color: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.optionRow}>
      <RowLabel label={label} />
      <View style={styles.choices}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.id)}
            style={[styles.dotChoice, selected === item.id && styles.selectedRing]}>
            <View style={[styles.colorDot, { backgroundColor: item.color }]} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function PresetRow({ selected, onSelect }: { selected: string; onSelect: (preset: AvatarPreset) => void }) {
  return (
    <View style={styles.optionRow}>
      <RowLabel label="hair style" />
      <View style={styles.choices}>
        {AVATAR_PRESETS.slice(0, 5).map((preset) => (
          <Pressable
            key={preset.id}
            onPress={() => onSelect(preset)}
            style={[styles.miniAvatarWrap, selected === preset.id && styles.selectedRing]}>
            <Image source={preset.source} style={styles.miniAvatar} resizeMode="contain" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function TextOptionRow({
  label,
  optional,
  items,
  selected,
  onSelect,
}: {
  label: string;
  optional?: boolean;
  items: string[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.optionRow}>
      <RowLabel label={label} optional={optional} />
      <View style={styles.choices}>
        {items.map((item) => (
          <Pressable key={item} onPress={() => onSelect(item)} style={[styles.textOption, selected === item && styles.selectedRing]}>
            <AppText size={11.5} weight="medium" color={selected === item ? 'accent' : 'textSecondary'}>
              {item === 'none' ? 'none' : item}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, width: '100%', gap: Spacing.three, justifyContent: 'center' },
  back: { position: 'absolute', top: 4, left: 0, zIndex: 2, transform: [{ rotate: '180deg' }] },
  header: { alignItems: 'center', gap: 4, marginTop: Spacing.three },
  preview: {
    height: 236,
    borderRadius: Radius.xl,
    backgroundColor: Colors.light.surface,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
  },
  avatar: { width: 224, height: 224 },
  spark: { position: 'absolute' },
  sparkLeft: { left: 36, top: 42 },
  sparkRight: { right: 34, top: 56 },
  controls: { gap: Spacing.two + 2 },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  labelWrap: { width: 92, flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  choices: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 },
  dotChoice: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  colorDot: { width: 32, height: 32, borderRadius: 16 },
  miniAvatarWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.light.surface,
  },
  miniAvatar: { width: 42, height: 42 },
  textOption: {
    minWidth: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.borderSoft,
  },
  selectedRing: { borderWidth: 2, borderColor: Colors.light.accent, backgroundColor: Colors.light.surface },
});
