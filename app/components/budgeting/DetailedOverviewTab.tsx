'use client';

import { useState } from 'react';
import { IncomeSource, RecurringExpense, Transaction } from '../../types/index';
import { useTheme } from '../../theme/ThemeContext';

interface DetailedOverviewTabProps {
  incomeSources: IncomeSource[];
  recurringExpenses: RecurringExpense[];
  transactions: Transaction[];
}

export default function DetailedOverviewTab({ 
  incomeSources,
  recurringExpenses,
  transactions
}: DetailedOverviewTabProps) {
  const { theme } = useTheme();
  const [activeOverview, setActiveOverview] = useState<'income' | 'expenses'>('income');

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

  const getIncomeByCategory = () => {
    const categoryTotals: Record<string, number> = {};
    
    incomeSources
      .filter(source => source.isActive)
      .forEach(source => {
        const multiplier = source.frequency === 'weekly' ? 4.33 
                        : source.frequency === 'bi-weekly' ? 2.0
                        : source.frequency === 'yearly' ? 1/12 
                        : 1;
        const monthlyAmount = source.amount * multiplier;
        
        categoryTotals[source.category] = (categoryTotals[source.category] || 0) + monthlyAmount;
      });

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getExpensesByCategory = () => {
    const categoryTotals: Record<string, number> = {};
    
    recurringExpenses
      .filter(expense => expense.isActive)
      .forEach(expense => {
        const multiplier = expense.frequency === 'weekly' ? 4.33 
                        : expense.frequency === 'bi-weekly' ? 2.0
                        : expense.frequency === 'yearly' ? 1/12 
                        : 1;
        const monthlyAmount = expense.amount * multiplier;
        
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + monthlyAmount;
      });

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getRecentTransactions = (type: 'income' | 'expense') => {
    return transactions
      .filter(t => t.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const monthlyIncome = calculateMonthlyIncome();
  const monthlyExpenses = calculateMonthlyExpenses();
  const netIncome = monthlyIncome - monthlyExpenses;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="rounded-lg shadow-md p-6 text-white"
          style={{ 
            background: 'linear-gradient(to right, #10b981, #059669)',
            boxShadow: theme.glow ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.income}15` : undefined
          }}
        >
          <h3 className="text-lg font-semibold mb-2">Monthly Income</h3>
          <div className="text-2xl font-bold">{formatCurrency(monthlyIncome)}</div>
          <p className="text-green-100 mt-1">
            From {incomeSources.filter(s => s.isActive).length} sources
          </p>
        </div>

        <div 
          className="rounded-lg shadow-md p-6 text-white"
          style={{ 
            background: 'linear-gradient(to right, #ef4444, #dc2626)',
            boxShadow: theme.glow ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.expense}15` : undefined
          }}
        >
          <h3 className="text-lg font-semibold mb-2">Monthly Expenses</h3>
          <div className="text-2xl font-bold">{formatCurrency(monthlyExpenses)}</div>
          <p className="text-red-100 mt-1">
            From {recurringExpenses.filter(e => e.isActive).length} expenses
          </p>
        </div>

        <div 
          className="rounded-lg shadow-md p-6 text-white"
          style={{ 
            background: netIncome >= 0 
              ? 'linear-gradient(to right, #3b82f6, #1d4ed8)' 
              : 'linear-gradient(to right, #f59e0b, #d97706)',
            boxShadow: theme.glow ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.accent}15` : undefined
          }}
        >
          <h3 className="text-lg font-semibold mb-2">Net Income</h3>
          <div className="text-2xl font-bold">{formatCurrency(netIncome)}</div>
          <p className="text-blue-100 mt-1">
            {netIncome >= 0 ? '💰 Surplus' : '⚠️ Deficit'}
          </p>
        </div>
      </div>

      {/* Section Navigation */}
      <div 
        className="flex space-x-1 p-1 rounded-lg"
        style={{ backgroundColor: theme.colors.background }}
      >
        <button
          onClick={() => setActiveOverview('income')}
          className="flex-1 py-3 px-6 rounded-md font-medium transition-colors"
          style={{
            backgroundColor: activeOverview === 'income' ? theme.colors.surface : 'transparent',
            color: activeOverview === 'income' ? theme.colors.income : theme.colors.textSecondary,
            boxShadow: activeOverview === 'income' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (activeOverview !== 'income') {
              e.currentTarget.style.backgroundColor = theme.colors.hover;
            }
          }}
          onMouseLeave={(e) => {
            if (activeOverview !== 'income') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          💰 Income Overview
        </button>
        <button
          onClick={() => setActiveOverview('expenses')}
          className="flex-1 py-3 px-6 rounded-md font-medium transition-colors"
          style={{
            backgroundColor: activeOverview === 'expenses' ? theme.colors.surface : 'transparent',
            color: activeOverview === 'expenses' ? theme.colors.expense : theme.colors.textSecondary,
            boxShadow: activeOverview === 'expenses' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (activeOverview !== 'expenses') {
              e.currentTarget.style.backgroundColor = theme.colors.hover;
            }
          }}
          onMouseLeave={(e) => {
            if (activeOverview !== 'expenses') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          💸 Expense Overview
        </button>
      </div>

      {/* Income Overview Section */}
      {activeOverview === 'income' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income by Category */}
            <div 
              className="rounded-lg shadow-md p-6"
              style={{ 
                backgroundColor: theme.colors.surface,
                boxShadow: theme.glow 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.income}15`
                  : undefined
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.textPrimary }}>
                Income by Category
              </h3>
              
              {getIncomeByCategory().length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">💰</div>
                  <p style={{ color: theme.colors.textSecondary }}>No active income sources</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getIncomeByCategory().map(({ category, amount }) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: theme.colors.income }}
                        ></div>
                        <span style={{ color: theme.colors.textPrimary }}>{category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold" style={{ color: theme.colors.income }}>
                          {formatCurrency(amount)}
                        </div>
                        <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                          {((amount / monthlyIncome) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Income Sources Details */}
            <div 
              className="rounded-lg shadow-md p-6"
              style={{ 
                backgroundColor: theme.colors.surface,
                boxShadow: theme.glow 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.income}15`
                  : undefined
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.textPrimary }}>
                Active Income Sources
              </h3>
              
              {incomeSources.filter(s => s.isActive).length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <p style={{ color: theme.colors.textSecondary }}>No active income sources</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {incomeSources
                    .filter(source => source.isActive)
                    .sort((a, b) => {
                      const aMultiplier = a.frequency === 'weekly' ? 4.33 
                                        : a.frequency === 'bi-weekly' ? 2.0
                                        : a.frequency === 'yearly' ? 1/12 
                                        : 1;
                      const bMultiplier = b.frequency === 'weekly' ? 4.33 
                                        : b.frequency === 'bi-weekly' ? 2.0
                                        : b.frequency === 'yearly' ? 1/12 
                                        : 1;
                      return (b.amount * bMultiplier) - (a.amount * aMultiplier);
                    })
                    .map((source) => {
                      const multiplier = source.frequency === 'weekly' ? 4.33 
                                      : source.frequency === 'bi-weekly' ? 2.0
                                      : source.frequency === 'yearly' ? 1/12 
                                      : 1;
                      const monthlyAmount = source.amount * multiplier;
                      
                      return (
                        <div key={source.id} className="flex items-center justify-between p-3 rounded border"
                             style={{ 
                               borderColor: theme.colors.border,
                               backgroundColor: `${theme.colors.income}05`
                             }}>
                          <div>
                            <div className="font-medium" style={{ color: theme.colors.textPrimary }}>
                              {source.name}
                            </div>
                            <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                              {formatCurrency(source.amount)} / {source.frequency}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold" style={{ color: theme.colors.income }}>
                              {formatCurrency(monthlyAmount)}
                            </div>
                            <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                              monthly
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* Recent Income Transactions */}
          <div 
            className="rounded-lg shadow-md p-6"
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: theme.glow 
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.income}15`
                : undefined
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.textPrimary }}>
              Recent Income Transactions
            </h3>
            
            {getRecentTransactions('income').length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">💵</div>
                <p style={{ color: theme.colors.textSecondary }}>No recent income transactions</p>
              </div>
            ) : (
              <div className="space-y-3">
                {getRecentTransactions('income').map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded border"
                       style={{ 
                         borderColor: theme.colors.border,
                         backgroundColor: `${theme.colors.income}05`
                       }}>
                    <div>
                      <div className="font-medium" style={{ color: theme.colors.textPrimary }}>
                        {transaction.description}
                      </div>
                      <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="font-semibold" style={{ color: theme.colors.income }}>
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Expense Overview Section */}
      {activeOverview === 'expenses' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expenses by Category */}
            <div 
              className="rounded-lg shadow-md p-6"
              style={{ 
                backgroundColor: theme.colors.surface,
                boxShadow: theme.glow 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.expense}15`
                  : undefined
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.textPrimary }}>
                Expenses by Category
              </h3>
              
              {getExpensesByCategory().length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">💸</div>
                  <p style={{ color: theme.colors.textSecondary }}>No active recurring expenses</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getExpensesByCategory().map(({ category, amount }) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: theme.colors.expense }}
                        ></div>
                        <span style={{ color: theme.colors.textPrimary }}>{category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold" style={{ color: theme.colors.expense }}>
                          {formatCurrency(amount)}
                        </div>
                        <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                          {((amount / monthlyExpenses) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recurring Expenses Details */}
            <div 
              className="rounded-lg shadow-md p-6"
              style={{ 
                backgroundColor: theme.colors.surface,
                boxShadow: theme.glow 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.expense}15`
                  : undefined
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.textPrimary }}>
                Active Recurring Expenses
              </h3>
              
              {recurringExpenses.filter(e => e.isActive).length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <p style={{ color: theme.colors.textSecondary }}>No active recurring expenses</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recurringExpenses
                    .filter(expense => expense.isActive)
                    .sort((a, b) => {
                      const aMultiplier = a.frequency === 'weekly' ? 4.33 
                                        : a.frequency === 'bi-weekly' ? 2.0
                                        : a.frequency === 'yearly' ? 1/12 
                                        : 1;
                      const bMultiplier = b.frequency === 'weekly' ? 4.33 
                                        : b.frequency === 'bi-weekly' ? 2.0
                                        : b.frequency === 'yearly' ? 1/12 
                                        : 1;
                      return (b.amount * bMultiplier) - (a.amount * aMultiplier);
                    })
                    .map((expense) => {
                      const multiplier = expense.frequency === 'weekly' ? 4.33 
                                      : expense.frequency === 'bi-weekly' ? 2.0
                                      : expense.frequency === 'yearly' ? 1/12 
                                      : 1;
                      const monthlyAmount = expense.amount * multiplier;
                      
                      return (
                        <div key={expense.id} className="flex items-center justify-between p-3 rounded border"
                             style={{ 
                               borderColor: theme.colors.border,
                               backgroundColor: `${theme.colors.expense}05`
                             }}>
                          <div>
                            <div className="font-medium" style={{ color: theme.colors.textPrimary }}>
                              {expense.name}
                            </div>
                            <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                              {formatCurrency(expense.amount)} / {expense.frequency}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold" style={{ color: theme.colors.expense }}>
                              {formatCurrency(monthlyAmount)}
                            </div>
                            <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                              monthly
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* Recent Expense Transactions */}
          <div 
            className="rounded-lg shadow-md p-6"
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: theme.glow 
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.expense}15`
                : undefined
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.textPrimary }}>
              Recent Expense Transactions
            </h3>
            
            {getRecentTransactions('expense').length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🧾</div>
                <p style={{ color: theme.colors.textSecondary }}>No recent expense transactions</p>
              </div>
            ) : (
              <div className="space-y-3">
                {getRecentTransactions('expense').map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded border"
                       style={{ 
                         borderColor: theme.colors.border,
                         backgroundColor: `${theme.colors.expense}05`
                       }}>
                    <div>
                      <div className="font-medium" style={{ color: theme.colors.textPrimary }}>
                        {transaction.description}
                      </div>
                      <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="font-semibold" style={{ color: theme.colors.expense }}>
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
