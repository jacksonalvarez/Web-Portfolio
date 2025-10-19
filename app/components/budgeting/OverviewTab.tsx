import { Transaction, IncomeSource, RecurringExpense, SavingsGoal } from '../types';
import { useTheme } from '../theme/ThemeContext';
import BalanceDisplay from './BalanceDisplay';
import TransactionList from './TransactionList';

interface OverviewTabProps {
  transactions: Transaction[];
  incomeSources: IncomeSource[];
  recurringExpenses: RecurringExpense[];
  savingsGoals: SavingsGoal[];
  onDeleteTransaction: (id: string) => void;
  onBalanceAdjustment: (newBalance: number) => void;
}

export default function OverviewTab({ 
  transactions, 
  incomeSources, 
  recurringExpenses, 
  savingsGoals,
  onDeleteTransaction,
  onBalanceAdjustment
}: OverviewTabProps) {
  const { theme } = useTheme();
  const calculateBalance = () => {
    return transactions.reduce((balance, transaction) => {
      return transaction.type === 'income' 
        ? balance + transaction.amount 
        : balance - transaction.amount;
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateMonthlyIncome = () => {
    return incomeSources
      .filter(source => source.isActive)
      .reduce((total, source) => {
        const multiplier = source.frequency === 'weekly' ? 4.33 
                        : source.frequency === 'bi-weekly' ? 2.0
                        : source.frequency === 'yearly' ? 1/12 
                        : 1;
        return total + (source.amount * multiplier);
      }, 0);
  };

  const calculateMonthlyExpenses = () => {
    return recurringExpenses
      .filter(expense => expense.isActive)
      .reduce((total, expense) => {
        const multiplier = expense.frequency === 'weekly' ? 4.33 
                        : expense.frequency === 'bi-weekly' ? 2.0
                        : expense.frequency === 'yearly' ? 1/12 
                        : 1;
        return total + (expense.amount * multiplier);
      }, 0);
  };

  const totalSavingsProgress = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalSavingsTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  const recentTransactions = transactions.slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Display */}
        <div className="lg:col-span-1">
          <BalanceDisplay 
            balance={calculateBalance()} 
          />
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Monthly Income */}
          <div 
            className="rounded-lg shadow-md p-4"
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: theme.glow 
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 12px ${theme.colors.income}20`
                : undefined
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Monthly Income
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.income }}
                >
                  {formatCurrency(calculateMonthlyIncome())}
                </p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.colors.textMuted }}
            >
              From {incomeSources.filter(s => s.isActive).length} sources
            </p>
          </div>

          {/* Monthly Expenses */}
          <div 
            className="rounded-lg shadow-md p-4"
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: theme.glow 
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 12px ${theme.colors.expense}20`
                : undefined
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Monthly Expenses
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.expense }}
                >
                  {formatCurrency(calculateMonthlyExpenses())}
                </p>
              </div>
              <div className="text-3xl">💸</div>
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.colors.textMuted }}
            >
              From {recurringExpenses.filter(e => e.isActive).length} recurring
            </p>
          </div>

          {/* Savings Progress */}
          <div 
            className="rounded-lg shadow-md p-4"
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: theme.glow 
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 12px ${theme.colors.savings}20`
                : undefined
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Savings Progress
                </p>
                <p 
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.savings }}
                >
                  {formatCurrency(totalSavingsProgress)}
                </p>
              </div>
              <div className="text-3xl">🏦</div>
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.colors.textMuted }}
            >
              {totalSavingsTarget > 0 ? Math.round((totalSavingsProgress / totalSavingsTarget) * 100) : 0}% of goal
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Budget Overview */}
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
          Monthly Budget Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income vs Expenses */}
          <div>
            <h3 
              className="font-medium mb-3"
              style={{ color: theme.colors.textSecondary }}
            >
              Income vs Expenses
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span 
                  className="text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Monthly Income
                </span>
                <span 
                  className="font-semibold"
                  style={{ color: theme.colors.income }}
                >
                  +{formatCurrency(calculateMonthlyIncome())}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span 
                  className="text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Monthly Expenses
                </span>
                <span 
                  className="font-semibold"
                  style={{ color: theme.colors.expense }}
                >
                  -{formatCurrency(calculateMonthlyExpenses())}
                </span>
              </div>
              <hr style={{ borderColor: theme.colors.border }} />
              <div className="flex justify-between items-center">
                <span 
                  className="font-medium"
                  style={{ color: theme.colors.textPrimary }}
                >
                  Net Monthly
                </span>
                <span 
                  className="font-bold"
                  style={{ 
                    color: calculateMonthlyIncome() - calculateMonthlyExpenses() >= 0 
                      ? theme.colors.income 
                      : theme.colors.expense 
                  }}
                >
                  {formatCurrency(calculateMonthlyIncome() - calculateMonthlyExpenses())}
                </span>
              </div>
            </div>
          </div>

          {/* Savings Goals Summary */}
          <div>
            <h3 
              className="font-medium mb-3"
              style={{ color: theme.colors.textSecondary }}
            >
              Savings Goals ({savingsGoals.length})
            </h3>
            <div className="space-y-2">
              {savingsGoals.slice(0, 3).map((goal) => {
                const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
                return (
                  <div key={goal.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span 
                          className="truncate"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {goal.name}
                        </span>
                        <span 
                          style={{ color: theme.colors.textMuted }}
                        >
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div 
                        className="w-full rounded-full h-1 mt-1"
                        style={{ backgroundColor: theme.colors.border }}
                      >
                        <div 
                          className="h-1 rounded-full transition-all duration-300" 
                          style={{ 
                            width: `${progress}%`,
                            backgroundColor: theme.colors.savings
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {savingsGoals.length > 3 && (
                <p 
                  className="text-xs"
                  style={{ color: theme.colors.textMuted }}
                >
                  +{savingsGoals.length - 3} more goals
                </p>
              )}
              {savingsGoals.length === 0 && (
                <p 
                  className="text-sm italic"
                  style={{ color: theme.colors.textMuted }}
                >
                  No savings goals set
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="lg:col-span-2">
        <TransactionList 
          transactions={recentTransactions} 
          onDeleteTransaction={onDeleteTransaction} 
        />
      </div>
    </div>
  );
}
