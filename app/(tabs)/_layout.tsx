import { Redirect, Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/colors'
import { useAuthStore } from '@/store/useAuthStore'

export default function TabsLayout() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const { session, isLoading } = useAuthStore()

  // Guard: unauthenticated users go back to sign-in
  if (!isLoading && !session) {
    return <Redirect href={'/(auth)/sign-in' as never} />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarStyle: {
          backgroundColor: isDark ? Colors.bgDark : Colors.bgLight,
          borderTopColor: isDark ? Colors.borderDark : Colors.borderLight,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
        }}
      />
    </Tabs>
  )
}
