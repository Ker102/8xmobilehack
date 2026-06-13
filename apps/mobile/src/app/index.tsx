import { Redirect } from 'expo-router';

import { useOtto } from '@/core/store';

export default function Index() {
  const onboarded = useOtto((s) => s.onboarded);
  return <Redirect href={onboarded ? '/shelf' : '/onboarding'} />;
}
