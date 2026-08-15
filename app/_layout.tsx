import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/colors'
import { useAuthStore } from '@/store/useAuthStore'
import { supabase } from '@/lib/supabase'

export default function RootLayout() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const { setSession, setLoading } = useAuthStore()

  useEffect(() => {
    // Restore existing session on launch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Keep store in sync with Supabase auth events (sign-in, sign-out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? Colors.bgDark : Colors.bgLight,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}
