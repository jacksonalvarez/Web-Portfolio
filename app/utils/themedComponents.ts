// Utility to replace all hardcoded colors in components with theme-aware styling
// This will be a comprehensive replacement for all the main styling issues

export const createThemedFormInput = (theme: any) => ({
  className: "w-full p-2 rounded-md transition-colors",
  style: {
    backgroundColor: theme.colors.background,
    color: theme.colors.textPrimary,
    border: `1px solid ${theme.colors.border}`,
    outline: 'none',
  },
  onFocus: (e: any) => e.target.style.borderColor = theme.colors.borderFocus,
  onBlur: (e: any) => e.target.style.borderColor = theme.colors.border,
});

export const createThemedLabel = (theme: any) => ({
  className: "block text-sm font-medium mb-1",
  style: { color: theme.colors.textSecondary }
});

export const createThemedCard = (theme: any, withGlow = false, glowColor = theme.colors.primary) => ({
  className: "rounded-lg shadow-md p-6",
  style: {
    backgroundColor: theme.colors.surface,
    boxShadow: withGlow && theme.glow 
      ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${glowColor}15`
      : undefined
  }
});

export const createThemedButton = (theme: any, variant = 'primary') => {
  const colors = {
    primary: theme.colors.primary,
    income: theme.colors.income,
    expense: theme.colors.expense,
    savings: theme.colors.savings,
    secondary: theme.colors.background
  };
  
  return {
    className: "px-4 py-2 rounded-md font-medium transition-colors",
    style: {
      backgroundColor: colors[variant as keyof typeof colors] || theme.colors.primary,
      color: variant === 'secondary' ? theme.colors.textPrimary : '#ffffff',
      border: variant === 'secondary' ? `1px solid ${theme.colors.border}` : 'none',
    },
    onMouseEnter: (e: any) => e.currentTarget.style.opacity = '0.9',
    onMouseLeave: (e: any) => e.currentTarget.style.opacity = '1',
  };
};