import { useTheme } from '../theme/ThemeContext';

interface BalanceDisplayProps {
  balance: number;
}

export default function BalanceDisplay({ balance }: BalanceDisplayProps) {
  const { theme } = useTheme();
  const isPositive = balance >= 0;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  return (
    <div 
      className="rounded-lg shadow-md p-6 mb-6"
      style={{ 
        backgroundColor: theme.colors.surface,
        boxShadow: theme.glow 
          ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 20px ${theme.colors.primary}20`
          : undefined
      }}
    >
      <h2 
        className="text-lg font-semibold mb-2"
        style={{ color: theme.colors.textSecondary }}
      >
        Current Balance
      </h2>
      <div 
        className="text-3xl font-bold"
        style={{ 
          color: isPositive ? theme.colors.income : theme.colors.expense 
        }}
      >
        {isPositive ? '+' : '-'}{formatCurrency(balance)}
      </div>
      <p 
        className="text-sm mt-1"
        style={{ color: theme.colors.textMuted }}
      >
        {isPositive ? 'You\'re in the green!' : 'Consider reducing expenses'}
      </p>
    </div>
  );
}
