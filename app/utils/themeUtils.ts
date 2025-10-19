import { Theme } from '../theme/themes';

// Utility functions for consistent themed styling across components
export const getThemedInputStyle = (theme: Theme) => ({
  backgroundColor: theme.colors.background,
  color: theme.colors.textPrimary,
  border: `1px solid ${theme.colors.border}`,
  outline: 'none',
});

export const getThemedCardStyle = (theme: Theme, withGlow = false) => ({
  backgroundColor: theme.colors.surface,
  boxShadow: withGlow && theme.glow
    ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.primary}15`
    : undefined,
});

export const getThemedButtonStyle = (theme: Theme, variant: 'primary' | 'income' | 'expense' | 'savings' | 'secondary' = 'primary') => {
  const baseStyle = {
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  switch (variant) {
    case 'income':
      return {
        ...baseStyle,
        backgroundColor: theme.colors.income,
        color: '#ffffff',
      };
    case 'expense':
      return {
        ...baseStyle,
        backgroundColor: theme.colors.expense,
        color: '#ffffff',
      };
    case 'savings':
      return {
        ...baseStyle,
        backgroundColor: theme.colors.savings,
        color: '#ffffff',
      };
    case 'secondary':
      return {
        ...baseStyle,
        backgroundColor: theme.colors.background,
        color: theme.colors.textSecondary,
        border: `1px solid ${theme.colors.border}`,
      };
    default:
      return {
        ...baseStyle,
        backgroundColor: theme.colors.primary,
        color: '#ffffff',
      };
  }
};

export const handleInputFocus = (theme: Theme) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = theme.colors.borderFocus;
};

export const handleInputBlur = (theme: Theme) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = theme.colors.border;
};

export const handleButtonHover = (isEntering: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.opacity = isEntering ? '0.9' : '1';
};