import { Redirect } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'

export default function Index() {
  const { session } = useAuthStore()
  return session
    ? <Redirect href={'/(tabs)/' as never} />
    : <Redirect href={'/(auth)/sign-in' as never} />
}
