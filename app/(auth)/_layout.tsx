import { Redirect, Stack } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'
import { Colors } from '@/constants/colors'
import { useColorScheme } from 'react-native'

export default function AuthLayout() {
  const { session, isLoading } = useAuthStore()
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  if (!isLoading && session) {
    return <Redirect href={'/(tabs)/' as never} />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: isDark ? Colors.bgDark : Colors.bgLight },
      }}
    />
  )
}
