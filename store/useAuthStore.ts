import { create } from 'zustand'

type AuthUser = {
  id: string
  email: string
} | null

type AuthStore = {
  user: AuthUser
  isLoading: boolean
  setUser: (user: AuthUser) => void
  setLoading: (loading: boolean) => void
  signOut: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  signOut: () => set({ user: null }),
}))
