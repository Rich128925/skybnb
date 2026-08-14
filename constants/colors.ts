// Design tokens — single source of truth for all colors in the app

export const Colors = {
  // Brand
  brand: '#0EA5E9',

  // Light mode
  bgLight: '#FFFFFF',
  surfaceLight: '#F7F7F7',
  borderLight: '#EBEBEB',

  // Dark mode
  bgDark: '#121212',
  surfaceDark: '#1E1E1E',
  borderDark: '#2C2C2C',

  // Text — light mode
  textPrimary: '#222222',
  textSecondary: '#717171',
  textTertiary: '#B0B0B0',

  // Text — dark mode
  textPrimaryDark: '#F5F5F5',
  textSecondaryDark: '#A0A0A0',
  textTertiaryDark: '#606060',

  // Status
  success: '#008A05',
  warning: '#FFB400',
  error: '#C13515',

  // Tab bar
  tabActive: '#0EA5E9',
  tabInactive: '#717171',
} as const
