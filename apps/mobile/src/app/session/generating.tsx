import { useRouter } from 'expo-router';

import { AgentTrace } from '@/components/AgentTrace';
import { Spacing } from '@/constants/theme';
import { useOtto } from '@/core/store';
import { Screen } from '@/design';

export default function GeneratingScreen() {
  const router = useRouter();
  const commitEntry = useOtto((s) => s.commitEntry);

  return (
    <Screen scroll={false} bottomInset={Spacing.three}>
      <AgentTrace
        onDone={() => {
          commitEntry();
          router.replace('/session/reveal');
        }}
      />
    </Screen>
  );
}
