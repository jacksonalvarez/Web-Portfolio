import { useTheme } from '../theme/ThemeContext';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'detailed', label: 'Detailed Overview', icon: '📈' },
  { id: 'income', label: 'Income Sources', icon: '💰' },
  { id: 'expenses', label: 'Expenses', icon: '💸' },
  { id: 'savings', label: 'Savings', icon: '🏦' },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { theme } = useTheme();
  
  return (
    <div 
      className="rounded-lg shadow-md mb-6"
      style={{ backgroundColor: theme.colors.surface }}
    >
      <nav className="flex space-x-0" aria-label="Tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors ${
              index === 0 ? 'rounded-l-lg' : ''
            } ${
              index === tabs.length - 1 ? 'rounded-r-lg' : ''
            }`}
            style={{
              backgroundColor: activeTab === tab.id ? theme.colors.accent : theme.colors.surface,
              color: activeTab === tab.id ? theme.colors.surface : theme.colors.textPrimary,
              borderColor: activeTab === tab.id ? theme.colors.accent : theme.colors.border,
              borderWidth: '1px',
              borderTopWidth: '1px',
              borderBottomWidth: '1px',
              borderLeftWidth: index !== 0 ? '1px' : '1px',
              borderRightWidth: index === tabs.length - 1 ? '1px' : '0px',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = theme.colors.hover;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = theme.colors.surface;
              }
            }}
          >
            <span className="mr-2 text-lg">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
