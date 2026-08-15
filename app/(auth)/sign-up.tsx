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

export default function SignUpScreen() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const bg = isDark ? Colors.bgDark : Colors.bgLight
  const surface = isDark ? Colors.surfaceDark : Colors.surfaceLight
  const border = isDark ? Colors.borderDark : Colors.borderLight
  const textPrimary = isDark ? Colors.textPrimaryDark : Colors.textPrimary
  const textSecondary = isDark ? Colors.textSecondaryDark : Colors.textSecondary

  async function handleSignUp() {
    setError('')
    if (!fullName.trim()) {
      setError('Please enter your full name.')
      return
    }
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          role: 'user',
        },
      },
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
          <Text style={[styles.heading, { color: textPrimary }]}>Create account</Text>
          <Text style={[styles.subheading, { color: textSecondary }]}>
            Join thousands of travellers discovering amazing stays
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.fieldWrapper}>
              <Text style={[styles.label, { color: textSecondary }]}>Full name</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: surface, borderColor: border, color: textPrimary },
                ]}
                placeholder="Jane Smith"
                placeholderTextColor={isDark ? Colors.textTertiaryDark : Colors.textTertiary}
                autoCapitalize="words"
                autoCorrect={false}
                value={fullName}
                onChangeText={setFullName}
                underlineColorAndroid="transparent"
              />
            </View>

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
                placeholder="At least 6 characters"
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
              onPress={handleSignUp}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryBtnText}>Create account</Text>
              )}
            </TouchableOpacity>

            <Text style={[styles.termsText, { color: textSecondary }]}>
              By signing up, you agree to our{' '}
              <Text style={{ color: Colors.brand, fontWeight: '600' }}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={{ color: Colors.brand, fontWeight: '600' }}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: textSecondary }]}>
              Already have an account?{' '}
            </Text>
            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: Colors.brand }]}>Sign in</Text>
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
    marginBottom: 32,
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
  termsText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
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
