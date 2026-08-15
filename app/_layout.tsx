import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/colors'
import { useAuthStore } from '@/store/useAuthStore'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'

export default function RootLayout() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const { session, setSession, setLoading } = useAuthStore()

  useEffect(() => {
    // Check for an existing session on app launch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for sign-in / sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      router.replace('/(tabs)/' as never)
    } else {
      router.replace('/(auth)/sign-in' as never)
    }
  }, [session])

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
