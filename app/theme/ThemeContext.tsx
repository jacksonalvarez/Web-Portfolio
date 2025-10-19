'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeName, themes, defaultTheme, updateCustomTheme, resetCustomTheme } from './themes';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  availableThemes: typeof themes;
  updateCustomColors: (colors: Partial<Theme['colors']>) => void;
  resetCustomColors: () => void;
  updateGlow: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>('default');
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('budgetAppTheme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
      setTheme(themes[savedTheme]);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('budgetAppTheme', themeName);
  }, [themeName]);

  const handleSetTheme = (newThemeName: ThemeName) => {
    setThemeName(newThemeName);
    setTheme(themes[newThemeName]);
  };

  const updateCustomColors = (colors: Partial<Theme['colors']>) => {
    const updatedTheme = updateCustomTheme(colors);
    themes.custom = updatedTheme;
    if (themeName === 'custom') {
      setTheme(updatedTheme);
    }
    // Save custom theme to localStorage
    localStorage.setItem('customTheme', JSON.stringify(updatedTheme.colors));
  };

  const resetCustomColors = () => {
    const resetTheme = resetCustomTheme();
    themes.custom = resetTheme;
    if (themeName === 'custom') {
      setTheme(resetTheme);
    }
    localStorage.removeItem('customTheme');
  };

  const updateGlow = (enabled: boolean) => {
    if (themeName === 'custom') {
      const updatedTheme = { ...theme, glow: enabled };
      themes.custom = updatedTheme;
      setTheme(updatedTheme);
      // Save glow setting to localStorage
      localStorage.setItem('customThemeGlow', JSON.stringify(enabled));
    }
  };

  // Load custom theme from localStorage on mount
  useEffect(() => {
    const savedCustomTheme = localStorage.getItem('customTheme');
    if (savedCustomTheme) {
      try {
        const customColors = JSON.parse(savedCustomTheme);
        themes.custom = updateCustomTheme(customColors);
      } catch (error) {
        console.warn('Failed to load custom theme from localStorage');
      }
    }
  }, []);

  const value: ThemeContextType = {
    theme,
    themeName,
    setTheme: handleSetTheme,
    availableThemes: themes,
    updateCustomColors,
    resetCustomColors,
    updateGlow,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}