import { useEffect } from 'react'
import { Stack, router } from 'expo-router'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/colors'
import { useAuthStore } from '@/store/useAuthStore'

export default function RootLayout() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)/' as never)
    } else {
      router.replace('/(auth)/sign-in' as never)
    }
  }, [user])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? Colors.bgDark : Colors.bgLight,
        },
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}
