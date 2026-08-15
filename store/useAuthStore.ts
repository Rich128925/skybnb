import { create } from 'zustand'
import type { Session, User } from '@supabase/supabase-js'

type AuthStore = {
  session: Session | null
  user: User | null
  isLoading: boolean
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  user: null,
  isLoading: true, // true on first load while we check for an existing session
  setSession: (session) => set({ session, user: session?.user ?? null }),
  setLoading: (isLoading) => set({ isLoading }),
}))
