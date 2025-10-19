// Comprehensive theme replacement script
// This script will systematically fix all hardcoded colors in components

export const THEME_REPLACEMENTS = {
  // Form inputs
  'className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"': 
    'className="w-full p-2 rounded-md transition-colors" style={{backgroundColor: theme.colors.background, color: theme.colors.textPrimary, border: `1px solid ${theme.colors.border}`, outline: "none"}} onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus} onBlur={(e) => e.target.style.borderColor = theme.colors.border}',
  
  'className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"': 
    'className="w-full p-2 rounded-md transition-colors" style={{backgroundColor: theme.colors.background, color: theme.colors.textPrimary, border: `1px solid ${theme.colors.border}`, outline: "none"}} onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus} onBlur={(e) => e.target.style.borderColor = theme.colors.border}',
  
  'className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"': 
    'className="w-full p-2 rounded-md transition-colors" style={{backgroundColor: theme.colors.background, color: theme.colors.textPrimary, border: `1px solid ${theme.colors.border}`, outline: "none"}} onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus} onBlur={(e) => e.target.style.borderColor = theme.colors.border}',
  
  // Labels
  'className="block text-sm font-medium text-gray-700 mb-1"': 
    'className="block text-sm font-medium mb-1" style={{color: theme.colors.textSecondary}}',
  
  // Headings
  'className="text-lg font-semibold text-gray-700 mb-4"': 
    'className="text-lg font-semibold mb-4" style={{color: theme.colors.textPrimary}}',
  
  'className="text-xl font-semibold text-gray-900"': 
    'className="text-xl font-semibold" style={{color: theme.colors.textPrimary}}',
  
  // Cards
  'className="bg-white rounded-lg shadow-md p-6"': 
    'className="rounded-lg shadow-md p-6" style={{backgroundColor: theme.colors.surface, boxShadow: theme.glow ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.primary}15` : undefined}}',
  
  // Text
  'className="text-gray-500"': 
    'style={{color: theme.colors.textMuted}}',
  
  'className="text-sm text-gray-400"': 
    'className="text-sm" style={{color: theme.colors.textMuted}}',
  
  'className="text-gray-600"': 
    'style={{color: theme.colors.textSecondary}}',
  
  'className="font-medium text-gray-900"': 
    'className="font-medium" style={{color: theme.colors.textPrimary}}',
  
  // Progress bars
  'className="bg-white h-2 rounded-full transition-all duration-300"': 
    'className="h-2 rounded-full transition-all duration-300" style={{backgroundColor: theme.colors.background}}',
  
  // Buttons
  'className="bg-red-600 hover:bg-red-700 text-white"': 
    'style={{backgroundColor: theme.colors.expense, color: "#ffffff"}} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}',
  
  'className="bg-green-600 hover:bg-green-700 text-white"': 
    'style={{backgroundColor: theme.colors.income, color: "#ffffff"}} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}',
  
  'className="bg-blue-600 hover:bg-blue-700 text-white"': 
    'style={{backgroundColor: theme.colors.savings, color: "#ffffff"}} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}',
};