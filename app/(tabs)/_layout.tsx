import { Tabs } from 'expo-router'
import { Colors } from '@/constants/colors'
import { useColorScheme } from 'react-native'

export default function TabsLayout() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

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
