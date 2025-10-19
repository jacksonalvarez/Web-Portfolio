'use client';

import { useState } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { Theme } from '../../theme/themes';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

// Preset color swatches organized by families
const colorSwatches = {
  'Blues': ['#3B82F6', '#1D4ED8', '#1E40AF', '#60A5FA', '#93C5FD', '#DBEAFE'],
  'Greens': ['#10B981', '#059669', '#047857', '#34D399', '#6EE7B7', '#D1FAE5'],
  'Reds': ['#EF4444', '#DC2626', '#B91C1C', '#F87171', '#FCA5A5', '#FEE2E2'],
  'Purples': ['#8B5CF6', '#7C3AED', '#6D28D9', '#A78BFA', '#C4B5FD', '#E9D5FF'],
  'Oranges': ['#F59E0B', '#D97706', '#B45309', '#FBBF24', '#FCD34D', '#FEF3C7'],
  'Grays': ['#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'],
  'Teals': ['#14B8A6', '#0D9488', '#0F766E', '#5EEAD4', '#99F6E4', '#CCFBF1'],
  'Indigos': ['#6366F1', '#4F46E5', '#4338CA', '#818CF8', '#A5B4FC', '#E0E7FF'],
  'Pinks': ['#EC4899', '#DB2777', '#BE185D', '#F472B6', '#F9A8D4', '#FCE7F3'],
};

function ColorSwatch({ color, isSelected, onClick }: { color: string; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
        isSelected ? 'border-gray-900 shadow-lg' : 'border-gray-300'
      }`}
      style={{ backgroundColor: color }}
      title={color}
    />
  );
}

function ColorInput({ label, value, onChange, description }: ColorInputProps) {
  const [showSwatches, setShowSwatches] = useState(false);
  return (
    <div className="p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm"
            style={{ backgroundColor: value }}
          />
          <div>
            <div className="font-medium">{label}</div>
            {description && <div className="text-sm text-gray-500">{description}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSwatches(!showSwatches)}
            className="px-3 py-1 text-sm rounded-md border hover:bg-gray-50"
          >
            Swatches
          </button>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-14 h-10 rounded-lg border cursor-pointer"
          />
        </div>
      </div>
      
      {showSwatches && (
        <div className="space-y-3 border-t pt-3">
          {Object.entries(colorSwatches).map(([family, colors]) => (
            <div key={family}>
              <div className="text-xs font-medium text-gray-600 mb-2">{family}</div>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <ColorSwatch
                    key={color}
                    color={color}
                    isSelected={value === color}
                    onClick={() => {
                      onChange(color);
                      setShowSwatches(false);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface CustomThemeEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomThemeEditor({ isOpen, onClose }: CustomThemeEditorProps) {
  const { theme, themeName, updateCustomColors, resetCustomColors, setTheme, updateGlow } = useTheme();
  const [tempColors, setTempColors] = useState<Partial<Theme['colors']>>({});
  const [glowEnabled, setGlowEnabled] = useState(theme.glow || false);

  if (!isOpen) return null;

  const handleColorChange = (colorKey: keyof Theme['colors'], value: string) => {
    const newColors = { ...tempColors, [colorKey]: value };
    setTempColors(newColors);
    updateCustomColors(newColors);
  };

  const handleReset = () => {
    resetCustomColors();
    setTempColors({});
    if (themeName !== 'custom') {
      setTheme('custom');
    }
  };

  const handleExport = () => {
    const customTheme = {
      name: 'My Custom Theme',
      colors: { ...theme.colors, ...tempColors }
    };
    const dataStr = JSON.stringify(customTheme, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'custom-theme.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const colorCategories = {
    'Essential Colors': [
      { key: 'surface', label: 'Cards Color', description: 'Background color for cards and panels' },
      { key: 'background', label: 'Canvas Color', description: 'Main background color' },
      { key: 'textPrimary', label: 'Text Primary', description: 'Main text color' },
      { key: 'textSecondary', label: 'Text Secondary', description: 'Secondary text color' },
      { key: 'textMuted', label: 'Subtext', description: 'Muted/subtle text color' },
      { key: 'hover', label: 'Hover Color', description: 'Color when hovering over buttons and tabs' },
    ],
    'Financial Colors': [
      { key: 'income', label: 'Money Coming In', description: 'Income and positive amounts' },
      { key: 'expense', label: 'Money Going Out', description: 'Expenses and negative amounts' },
      { key: 'savings', label: 'Savings Color', description: 'Savings goals and progress' },
    ],
  };

  const getCurrentColor = (key: keyof Theme['colors']) => {
    return tempColors[key] || theme.colors[key];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        style={{ backgroundColor: theme.colors.surface }}
      >
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ borderColor: theme.colors.border }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 
                className="text-2xl font-bold"
                style={{ color: theme.colors.textPrimary }}
              >
                Custom Theme Editor
              </h2>
              <p 
                className="text-sm mt-1"
                style={{ color: theme.colors.textSecondary }}
              >
                Customize your app's appearance with your own color scheme
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-opacity-10"
              style={{ 
                color: theme.colors.textSecondary,
                backgroundColor: 'transparent'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Glow Effect Toggle */}
          <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: theme.colors.border }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold" style={{ color: theme.colors.textPrimary }}>
                  Glow Effects
                </h3>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                  Add subtle glow effects to cards and elements
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={glowEnabled}
                  onChange={(e) => {
                    const enabled = e.target.checked;
                    setGlowEnabled(enabled);
                    updateGlow(enabled);
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:style={{backgroundColor: theme.colors.surface}} after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {Object.entries(colorCategories).map(([category, colors]) => (
              <div key={category}>
                <h3 
                  className="text-xl font-bold mb-4"
                  style={{ color: theme.colors.textPrimary }}
                >
                  {category}
                </h3>
                <div className="space-y-4">
                  {colors.map(({ key, label, description }) => (
                    <ColorInput
                      key={key}
                      label={label}
                      value={getCurrentColor(key as keyof Theme['colors'])}
                      onChange={(value) => handleColorChange(key as keyof Theme['colors'], value)}
                      description={description}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div 
          className="p-6 border-t flex justify-between items-center"
          style={{ borderColor: theme.colors.border }}
        >
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border font-medium transition-colors"
              style={{ 
                borderColor: theme.colors.border,
                color: theme.colors.textSecondary,
                backgroundColor: 'transparent'
              }}
            >
              Reset to Default
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-lg border font-medium transition-colors"
              style={{ 
                borderColor: theme.colors.border,
                color: theme.colors.textSecondary,
                backgroundColor: 'transparent'
              }}
            >
              Export Theme
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium transition-colors"
              style={{ 
                backgroundColor: theme.colors.primary,
                color: '#ffffff'
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
