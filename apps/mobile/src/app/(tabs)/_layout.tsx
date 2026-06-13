import { Tabs } from 'expo-router';

import { OttoTabBar } from '@/components/OttoTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <OttoTabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' } }}>
      <Tabs.Screen name="shelf" options={{ title: 'Shelf' }} />
      <Tabs.Screen name="feed" options={{ title: 'Feed' }} />
      <Tabs.Screen name="record" options={{ title: 'Record' }} />
      <Tabs.Screen name="companion" options={{ title: 'Otto' }} />
      <Tabs.Screen name="you" options={{ title: 'You' }} />
    </Tabs>
  );
}
