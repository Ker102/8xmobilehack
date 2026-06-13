import type { ImageSourcePropType } from 'react-native';

const imageAssets = {
  policeStory: require('../../assets/images/demo-police-story.png'),
} satisfies Record<string, ImageSourcePropType>;

export type DemoImageKey = keyof typeof imageAssets;

export function getDemoImage(key?: string): ImageSourcePropType | undefined {
  if (!key) return undefined;
  return imageAssets[key as DemoImageKey];
}
