import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/colors'
import { supabase } from '@/lib/supabase'

export default function SignInScreen() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const bg = isDark ? Colors.bgDark : Colors.bgLight
  const surface = isDark ? Colors.surfaceDark : Colors.surfaceLight
  const border = isDark ? Colors.borderDark : Colors.borderLight
  const textPrimary = isDark ? Colors.textPrimaryDark : Colors.textPrimary
  const textSecondary = isDark ? Colors.textSecondaryDark : Colors.textSecondary

  async function handleSignIn() {
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)

    if (authError) {
      setError(authError.message)
      return
    }

    // Navigation is handled automatically by onAuthStateChange in _layout.tsx
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo / brand */}
          <View style={styles.logoRow}>
            <LinearGradient
              colors={['#0EA5E9', '#0284C7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoMark}
            >
              <Text style={styles.logoText}>S</Text>
            </LinearGradient>
            <Text style={[styles.brandName, { color: textPrimary }]}>skybnb</Text>
          </View>

          {/* Heading */}
          <Text style={[styles.heading, { color: textPrimary }]}>Welcome back</Text>
          <Text style={[styles.subheading, { color: textSecondary }]}>
            Sign in to continue booking your perfect stay
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.fieldWrapper}>
              <Text style={[styles.label, { color: textSecondary }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: surface, borderColor: border, color: textPrimary },
                ]}
                placeholder="you@example.com"
                placeholderTextColor={isDark ? Colors.textTertiaryDark : Colors.textTertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.fieldWrapper}>
              <Text style={[styles.label, { color: textSecondary }]}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: surface, borderColor: border, color: textPrimary },
                ]}
                placeholder="••••••••"
                placeholderTextColor={isDark ? Colors.textTertiaryDark : Colors.textTertiary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                underlineColorAndroid="transparent"
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
              onPress={handleSignIn}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryBtnText}>Sign in</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
              <Text style={[styles.forgotText, { color: Colors.brand }]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: border }]} />
            <Text style={[styles.dividerText, { color: textSecondary }]}>or</Text>
            <View style={[styles.dividerLine, { backgroundColor: border }]} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: textSecondary }]}>
              Don&apos;t have an account?{' '}
            </Text>
            <Link href="/(auth)/sign-up" asChild>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: Colors.brand }]}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 40,
  },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 36,
  },
  form: {
    gap: 16,
  },
  fieldWrapper: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  errorText: {
    fontSize: 13,
    color: Colors.error,
    fontWeight: '500',
  },
  primaryBtn: {
    height: 54,
    borderRadius: 999,
    backgroundColor: Colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryBtnDisabled: {
    opacity: 0.7,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.2,
  },
  forgotBtn: {
    alignSelf: 'center',
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
  },
})
