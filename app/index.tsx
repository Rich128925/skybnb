// This file intentionally left empty.
// The root _layout.tsx handles routing to (auth) or (tabs).
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'

export default function Index() {
  const { user } = useAuthStore()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return user ? <Redirect href={'/(tabs)/' as any} /> : <Redirect href={'/(auth)/sign-in' as any} />
}
