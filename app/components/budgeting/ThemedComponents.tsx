// Quick fix utility - comprehensive theme application
import React from 'react';

// This component wraps any element with proper theme styling
export const ThemedCard = ({ children, theme, className = "", style = {}, withGlow = false, glowColor }: any) => (
  <div 
    className={`rounded-lg shadow-md p-6 ${className}`}
    style={{
      backgroundColor: theme.colors.surface,
      boxShadow: withGlow && theme.glow 
        ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${glowColor || theme.colors.primary}15`
        : undefined,
      ...style
    }}
  >
    {children}
  </div>
);

export const ThemedInput = ({ theme, className = "", style = {}, ...props }: any) => (
  <input
    {...props}
    className={`w-full p-2 rounded-md transition-colors ${className}`}
    style={{
      backgroundColor: theme.colors.background,
      color: theme.colors.textPrimary,
      border: `1px solid ${theme.colors.border}`,
      outline: 'none',
      ...style
    }}
    onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus}
    onBlur={(e) => e.target.style.borderColor = theme.colors.border}
  />
);

export const ThemedSelect = ({ theme, className = "", style = {}, ...props }: any) => (
  <select
    {...props}
    className={`w-full p-3 rounded-md transition-all duration-200 ${className}`}
    style={{
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      border: `2px solid ${theme.colors.border}`,
      outline: 'none',
      fontSize: '14px',
      boxShadow: theme.glow 
        ? `0 2px 4px rgba(0, 0, 0, 0.1), 0 0 8px ${theme.colors.accent}08`
        : '0 2px 4px rgba(0, 0, 0, 0.1)',
      ...style
    }}
    onFocus={(e) => {
      e.target.style.borderColor = theme.colors.accent;
      e.target.style.boxShadow = theme.glow 
        ? `0 2px 8px rgba(0, 0, 0, 0.15), 0 0 12px ${theme.colors.accent}20`
        : '0 2px 8px rgba(0, 0, 0, 0.15)';
    }}
    onBlur={(e) => {
      e.target.style.borderColor = theme.colors.border;
      e.target.style.boxShadow = theme.glow 
        ? `0 2px 4px rgba(0, 0, 0, 0.1), 0 0 8px ${theme.colors.accent}08`
        : '0 2px 4px rgba(0, 0, 0, 0.1)';
    }}
    onMouseEnter={(e) => {
      const target = e.target as HTMLSelectElement;
      if (target !== document.activeElement) {
        target.style.borderColor = theme.colors.accent + '80';
      }
    }}
    onMouseLeave={(e) => {
      const target = e.target as HTMLSelectElement;
      if (target !== document.activeElement) {
        target.style.borderColor = theme.colors.border;
      }
    }}
  />
);

export const ThemedLabel = ({ children, theme, className = "", style = {} }: any) => (
  <label 
    className={`block text-sm font-medium mb-1 ${className}`}
    style={{ color: theme.colors.textSecondary, ...style }}
  >
    {children}
  </label>
);

export const ThemedButton = ({ children, theme, variant = 'primary', className = "", style = {}, ...props }: any) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'income': return theme.colors.income;
      case 'expense': return theme.colors.expense;
      case 'savings': return theme.colors.savings;
      case 'secondary': return theme.colors.background;
      default: return theme.colors.primary;
    }
  };

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
      style={{
        backgroundColor: getVariantColor(),
        color: variant === 'secondary' ? theme.colors.textPrimary : '#ffffff',
        border: variant === 'secondary' ? `1px solid ${theme.colors.border}` : 'none',
        ...style
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
    >
      {children}
    </button>
  );
};

export const ThemedHeading = ({ children, theme, level = 2, className = "", style = {} }: any) => {
  const sizeClasses = {
    1: 'text-2xl',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
  };

  // Use proper switch statement for dynamic heading levels
  const headingStyle = {
    color: theme?.colors?.text || '#000',
    ...style
  };
  const combinedClassName = `${sizeClasses[level as keyof typeof sizeClasses] || 'text-base'} ${className}`;

  switch (level) {
    case 1:
      return React.createElement('h1', { className: combinedClassName, style: headingStyle }, children);
    case 2:
      return React.createElement('h2', { className: combinedClassName, style: headingStyle }, children);
    case 3:
      return React.createElement('h3', { className: combinedClassName, style: headingStyle }, children);
    case 4:
      return React.createElement('h4', { className: combinedClassName, style: headingStyle }, children);
    default:
      return React.createElement('h2', { className: combinedClassName, style: headingStyle }, children);
  }
};
