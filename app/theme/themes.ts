export interface ThemeColors {
  // Background colors
  primary: string;
  secondary: string;
  surface: string;
  background: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Accent colors
  accent: string;
  accentHover: string;
  
  // Status colors
  success: string;
  successHover: string;
  error: string;
  errorHover: string;
  warning: string;
  warningHover: string;
  info: string;
  infoHover: string;
  
  // Border colors
  border: string;
  borderLight: string;
  borderFocus: string;
  
  // Interaction colors
  hover: string;
  
  // Income/Expense specific
  income: string;
  incomeLight: string;
  expense: string;
  expenseLight: string;
  savings: string;
  savingsLight: string;
}

export interface Theme {
  name: string;
  displayName: string;
  colors: ThemeColors;
  isDark: boolean;
  glow?: boolean;
}

// Default Theme (Light)
export const defaultTheme: Theme = {
  name: 'default',
  displayName: 'Default Light',
  isDark: false,
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    surface: '#FFFFFF',
    background: '#F9FAFB',
    
    textPrimary: '#111827',
    textSecondary: '#374151',
    textMuted: '#6B7280',
    
    accent: '#3B82F6',
    accentHover: '#2563EB',
    
    success: '#10B981',
    successHover: '#059669',
    error: '#EF4444',
    errorHover: '#DC2626',
    warning: '#F59E0B',
    warningHover: '#D97706',
    info: '#3B82F6',
    infoHover: '#2563EB',
    
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    borderFocus: '#DBEAFE',
    
    hover: '#F3F4F6',
    
    income: '#10B981',
    incomeLight: '#D1FAE5',
    expense: '#EF4444',
    expenseLight: '#FEE2E2',
    savings: '#3B82F6',
    savingsLight: '#DBEAFE',
  }
};

// Dark Theme
export const darkTheme: Theme = {
  name: 'dark',
  displayName: 'Dark Mode',
  isDark: true,
  colors: {
    primary: '#60A5FA',
    secondary: '#9CA3AF',
    surface: '#1F2937',
    background: '#111827',
    
    textPrimary: '#F9FAFB',
    textSecondary: '#E5E7EB',
    textMuted: '#9CA3AF',
    
    accent: '#60A5FA',
    accentHover: '#3B82F6',
    
    success: '#34D399',
    successHover: '#10B981',
    error: '#F87171',
    errorHover: '#EF4444',
    warning: '#FBBF24',
    warningHover: '#F59E0B',
    info: '#60A5FA',
    infoHover: '#3B82F6',
    
    border: '#374151',
    borderLight: '#4B5563',
    borderFocus: '#60A5FA',
    
    hover: '#374151',
    
    income: '#34D399',
    incomeLight: '#064E3B',
    expense: '#F87171',
    expenseLight: '#7F1D1D',
    savings: '#60A5FA',
    savingsLight: '#1E3A8A',
  }
};

// High Contrast Theme
export const highContrastTheme: Theme = {
  name: 'high-contrast',
  displayName: 'High Contrast',
  isDark: false,
  colors: {
    primary: '#000000',
    secondary: '#4B5563',
    surface: '#FFFFFF',
    background: '#FFFFFF',
    
    textPrimary: '#000000',
    textSecondary: '#000000',
    textMuted: '#4B5563',
    
    accent: '#000000',
    accentHover: '#374151',
    
    success: '#059669',
    successHover: '#047857',
    error: '#DC2626',
    errorHover: '#B91C1C',
    warning: '#D97706',
    warningHover: '#B45309',
    info: '#000000',
    infoHover: '#374151',
    
    border: '#000000',
    borderLight: '#6B7280',
    borderFocus: '#000000',
    
    hover: '#F3F4F6',
    
    income: '#059669',
    incomeLight: '#ECFDF5',
    expense: '#DC2626',
    expenseLight: '#FEF2F2',
    savings: '#000000',
    savingsLight: '#F3F4F6',
  }
};

// Colorful Theme
export const colorfulTheme: Theme = {
  name: 'colorful',
  displayName: 'Vibrant Colors',
  isDark: false,
  colors: {
    primary: '#8B5CF6',
    secondary: '#6B7280',
    surface: '#FFFFFF',
    background: '#FAF5FF',
    
    textPrimary: '#1F2937',
    textSecondary: '#374151',
    textMuted: '#6B7280',
    
    accent: '#8B5CF6',
    accentHover: '#7C3AED',
    
    success: '#059669',
    successHover: '#047857',
    error: '#DC2626',
    errorHover: '#B91C1C',
    warning: '#D97706',
    warningHover: '#B45309',
    info: '#0EA5E9',
    infoHover: '#0284C7',
    
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    borderFocus: '#8B5CF6',
    
    hover: '#F3F4F6',
    
    income: '#059669',
    incomeLight: '#ECFDF5',
    expense: '#DC2626',
    expenseLight: '#FEF2F2',
    savings: '#0EA5E9',
    savingsLight: '#F0F9FF',
  }
};

// Soft Theme
export const softTheme: Theme = {
  name: 'soft',
  displayName: 'Soft & Minimal',
  isDark: false,
  colors: {
    primary: '#6366F1',
    secondary: '#8B8B8B',
    surface: '#FEFEFE',
    background: '#FAFAFA',
    
    textPrimary: '#2D3748',
    textSecondary: '#4A5568',
    textMuted: '#718096',
    
    accent: '#6366F1',
    accentHover: '#5B5BF6',
    
    success: '#48BB78',
    successHover: '#38A169',
    error: '#F56565',
    errorHover: '#E53E3E',
    warning: '#ED8936',
    warningHover: '#DD6B20',
    info: '#4299E1',
    infoHover: '#3182CE',
    
    border: '#E2E8F0',
    borderLight: '#EDF2F7',
    borderFocus: '#6366F1',
    
    hover: '#F7FAFC',
    
    income: '#48BB78',
    incomeLight: '#F0FFF4',
    expense: '#F56565',
    expenseLight: '#FED7D7',
    savings: '#4299E1',
    savingsLight: '#EBF8FF',
  }
};

// Custom theme that can be modified by users
export const customTheme: Theme = {
  name: 'custom',
  displayName: 'Custom',
  isDark: false,
  glow: false,
  colors: {
    primary: '#3B82F6',
    secondary: '#64748B',
    surface: '#FFFFFF',
    background: '#F8FAFC',
    
    textPrimary: '#1E293B',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    
    accent: '#3B82F6',
    accentHover: '#2563EB',
    
    success: '#10B981',
    successHover: '#059669',
    error: '#EF4444',
    errorHover: '#DC2626',
    warning: '#F59E0B',
    warningHover: '#D97706',
    info: '#3B82F6',
    infoHover: '#2563EB',
    
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    borderFocus: '#DBEAFE',
    
    hover: '#F8FAFC',
    
    income: '#10B981',
    incomeLight: '#D1FAE5',
    expense: '#EF4444',
    expenseLight: '#FEE2E2',
    savings: '#3B82F6',
    savingsLight: '#DBEAFE',
  }
};

export const themes = {
  default: defaultTheme,
  dark: darkTheme,
  'high-contrast': highContrastTheme,
  colorful: colorfulTheme,
  soft: softTheme,
  custom: customTheme,
};

export type ThemeName = keyof typeof themes;

// Helper functions for custom theme management
export const updateCustomTheme = (updates: Partial<Theme['colors']>): Theme => {
  return {
    ...customTheme,
    colors: {
      ...customTheme.colors,
      ...updates,
    }
  };
};

export const resetCustomTheme = (): Theme => {
  return { ...defaultTheme, name: 'custom', displayName: 'Custom' };
};