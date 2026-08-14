import { View, Text, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/colors'

export default function HomeScreen() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const bg = isDark ? Colors.bgDark : Colors.bgLight
  const textPrimary = isDark ? Colors.textPrimaryDark : Colors.textPrimary
  const textSecondary = isDark ? Colors.textSecondaryDark : Colors.textSecondary

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: '800', color: textPrimary, letterSpacing: -1 }}>
          Explore
        </Text>
        <Text style={{ fontSize: 15, color: textSecondary, marginTop: 8 }}>
          Listings coming soon
        </Text>
      </View>
    </SafeAreaView>
  )
}
