import { Transaction } from '../page';
import { useTheme } from '../theme/ThemeContext';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export default function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const { theme } = useTheme();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (transactions.length === 0) {
    return (
      <div 
        className="rounded-lg shadow-md p-6"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <h2 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.textPrimary }}
        >
          Recent Transactions
        </h2>
        <div className="text-center py-8">
          <div 
            className="text-4xl mb-4"
            style={{ color: theme.colors.textMuted }}
          >
            📊
          </div>
          <p style={{ color: theme.colors.textMuted }}>No transactions yet</p>
          <p 
            className="text-sm"
            style={{ color: theme.colors.textMuted }}
          >
            Add your first transaction to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rounded-lg shadow-md p-6"
      style={{ 
        backgroundColor: theme.colors.surface,
        boxShadow: theme.glow 
          ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.primary}15`
          : undefined
      }}
    >
      <h2 
        className="text-lg font-semibold mb-4"
        style={{ color: theme.colors.textPrimary }}
      >
        Recent Transactions
      </h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg transition-colors"
            style={{ 
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.border}`
            }}
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 
                  className="font-medium"
                  style={{ color: theme.colors.textPrimary }}
                >
                  {transaction.description}
                </h3>
                <span 
                  className="font-semibold"
                  style={{ 
                    color: transaction.type === 'income' 
                      ? theme.colors.income 
                      : theme.colors.expense 
                  }}
                >
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: transaction.type === 'income' 
                      ? `${theme.colors.income}20` 
                      : `${theme.colors.expense}20`,
                    color: transaction.type === 'income' 
                      ? theme.colors.income 
                      : theme.colors.expense
                  }}
                >
                  {transaction.type === 'income' ? '💰 Income' : '💸 Expense'}
                </span>
                <span 
                  className="text-sm"
                  style={{ color: theme.colors.textMuted }}
                >
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => onDeleteTransaction(transaction.id)}
              className="ml-4 transition-colors p-1"
              style={{ 
                color: theme.colors.expense,
                opacity: 0.7
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
              title="Delete transaction"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
