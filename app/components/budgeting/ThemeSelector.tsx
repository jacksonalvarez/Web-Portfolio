'use client';

import { useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { ThemeName } from '../theme/themes';
import CustomThemeEditor from './CustomThemeEditor';

export default function ThemeSelector() {
  const { theme, themeName, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    setIsOpen(false);
    
    // If custom theme is selected, open the editor
    if (newTheme === 'custom') {
      setIsEditorOpen(true);
    }
  };

  const openCustomEditor = () => {
    setTheme('custom');
    setIsEditorOpen(true);
    setIsOpen(false);
  };

  const getThemeIcon = (name: ThemeName) => {
    switch (name) {
      case 'default':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'high-contrast':
        return '⚪';
      case 'colorful':
        return '🌈';
      case 'soft':
        return '🌸';
      case 'custom':
        return '🎨';
      default:
        return '🎨';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
        style={{
          backgroundColor: theme.colors.surface,
          border: `2px solid ${theme.colors.border}`,
          color: theme.colors.textPrimary,
          boxShadow: theme.glow 
            ? `0 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px ${theme.colors.accent}10`
            : '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.colors.hover;
          e.currentTarget.style.borderColor = theme.colors.accent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.colors.surface;
          e.currentTarget.style.borderColor = theme.colors.border;
        }}
        title="Change theme"
      >
        <span className="text-lg">{getThemeIcon(themeName)}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {availableThemes[themeName].displayName}
        </span>
        <svg 
          className={`w-4 h-4 transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ color: theme.colors.textSecondary }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div 
            className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl z-20 overflow-hidden"
            style={{
              backgroundColor: theme.colors.surface,
              border: `2px solid ${theme.colors.border}`,
              boxShadow: theme.glow 
                ? `0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 0 20px ${theme.colors.accent}20`
                : '0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div 
              className="px-4 py-3 text-sm font-semibold"
              style={{ 
                backgroundColor: theme.colors.accent + '15',
                color: theme.colors.textPrimary,
                borderBottom: `1px solid ${theme.colors.border}`
              }}
            >
              🎨 Choose Theme
            </div>
            
            {Object.entries(availableThemes).map(([name, themeConfig]) => (
              <button
                key={name}
                onClick={() => handleThemeChange(name as ThemeName)}
                className="w-full flex items-center justify-between px-4 py-3 transition-all duration-200"
                style={{
                  backgroundColor: themeName === name 
                    ? theme.colors.accent + '20' 
                    : 'transparent',
                  color: theme.colors.textPrimary,
                  borderLeft: themeName === name 
                    ? `3px solid ${theme.colors.accent}`
                    : '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (themeName !== name) {
                    e.currentTarget.style.backgroundColor = theme.colors.hover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (themeName !== name) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getThemeIcon(name as ThemeName)}</span>
                  <div className="text-left">
                    <div className="font-medium text-sm">{themeConfig.displayName}</div>
                    <div 
                      className="text-xs mt-0.5"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {themeConfig.isDark ? '🌙 Dark theme' : '☀️ Light theme'}
                    </div>
                  </div>
                </div>
                
                {themeName === name && (
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: theme.colors.accent }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
            
            {/* Theme Preview */}
            <div 
              className="px-4 py-3 border-t"
              style={{ 
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background + '50'
              }}
            >
              <div 
                className="text-sm font-medium mb-3"
                style={{ color: theme.colors.textPrimary }}
              >
                Current Colors
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="text-center">
                  <div 
                    className="h-6 w-6 rounded-full mx-auto mb-1 border-2"
                    style={{ 
                      backgroundColor: theme.colors.income,
                      borderColor: theme.colors.border
                    }}
                    title="Income color"
                  />
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Income</div>
                </div>
                <div className="text-center">
                  <div 
                    className="h-6 w-6 rounded-full mx-auto mb-1 border-2"
                    style={{ 
                      backgroundColor: theme.colors.expense,
                      borderColor: theme.colors.border
                    }}
                    title="Expense color"
                  />
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Expense</div>
                </div>
                <div className="text-center">
                  <div 
                    className="h-6 w-6 rounded-full mx-auto mb-1 border-2"
                    style={{ 
                      backgroundColor: theme.colors.savings,
                      borderColor: theme.colors.border
                    }}
                    title="Savings color"
                  />
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Savings</div>
                </div>
                <div className="text-center">
                  <div 
                    className="h-6 w-6 rounded-full mx-auto mb-1 border-2"
                    style={{ 
                      backgroundColor: theme.colors.accent,
                      borderColor: theme.colors.border
                    }}
                    title="Accent color"
                  />
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Accent</div>
                </div>
                <div className="text-center">
                  <div 
                    className="h-6 w-6 rounded-full mx-auto mb-1 border-2"
                    style={{ 
                      backgroundColor: theme.colors.warning,
                      borderColor: theme.colors.border
                    }}
                    title="Warning color"
                  />
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Warning</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom Theme Editor Button */}
          <div 
            className="border-t"
            style={{ borderColor: theme.colors.border }}
          >
            <button
              onClick={openCustomEditor}
              className="w-full px-4 py-4 text-left transition-all duration-200 flex items-center justify-between"
              style={{ 
                backgroundColor: themeName === 'custom' 
                  ? theme.colors.accent + '20' 
                  : 'transparent',
                color: theme.colors.textPrimary,
                borderLeft: themeName === 'custom' 
                  ? `3px solid ${theme.colors.accent}`
                  : '3px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (themeName !== 'custom') {
                  e.currentTarget.style.backgroundColor = theme.colors.hover;
                }
              }}
              onMouseLeave={(e) => {
                if (themeName !== 'custom') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">🎨</span>
                <div>
                  <div className="font-medium text-sm">Custom Theme</div>
                  <div className="text-xs mt-0.5" style={{ color: theme.colors.textSecondary }}>
                    🎨 Create your own color scheme
                  </div>
                </div>
              </div>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </>
      )}
      
      <CustomThemeEditor 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
      />
    </div>
  );
}
