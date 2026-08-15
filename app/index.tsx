import { Redirect } from 'expo-router'
import { View, ActivityIndicator } from 'react-native'
import { useAuthStore } from '@/store/useAuthStore'
import { Colors } from '@/constants/colors'

export default function Index() {
  const { session, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.bgLight }}>
        <ActivityIndicator color={Colors.brand} size="large" />
      </View>
    )
  }

  return session
    ? <Redirect href={'/(tabs)/' as never} />
    : <Redirect href={'/(auth)/sign-in' as never} />
}
