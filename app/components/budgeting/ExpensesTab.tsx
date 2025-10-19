'use client';

import { useState } from 'react';
import { RecurringExpense, Transaction } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { ThemedSelect } from './ThemedComponents';

interface ExpensesTabProps {
  recurringExpenses: RecurringExpense[];
  transactions: Transaction[];
  onAddRecurringExpense: (expense: Omit<RecurringExpense, 'id'>) => void;
  onUpdateRecurringExpense: (id: string, updates: Partial<RecurringExpense>) => void;
  onDeleteRecurringExpense: (id: string) => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const expenseCategories = [
  'Housing', 'Transportation', 'Food', 'Utilities', 'Insurance', 
  'Healthcare', 'Entertainment', 'Shopping', 'Education', 'Other'
];

export default function ExpensesTab({ 
  recurringExpenses,
  transactions,
  onAddRecurringExpense,
  onUpdateRecurringExpense,
  onDeleteRecurringExpense,
  onAddTransaction
}: ExpensesTabProps) {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<'recurring' | 'oneTime'>('recurring');
  const [showRecurringForm, setShowRecurringForm] = useState(false);
  const [showOneTimeForm, setShowOneTimeForm] = useState(false);
  
  const [recurringFormData, setRecurringFormData] = useState({
    name: '',
    amount: '',
    frequency: 'monthly' as const,
    category: 'Housing',
    nextDue: '',
    startDate: '',
    autoGenerate: true,
    applyImmediately: false
  });

  const [oneTimeFormData, setOneTimeFormData] = useState({
    description: '',
    amount: '',
    category: 'Other'
  });

  const handleRecurringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recurringFormData.name.trim() || !recurringFormData.amount || parseFloat(recurringFormData.amount) <= 0 || !recurringFormData.nextDue) {
      alert('Please fill in all fields with valid values');
      return;
    }

    onAddRecurringExpense({
      name: recurringFormData.name.trim(),
      amount: parseFloat(recurringFormData.amount),
      frequency: recurringFormData.frequency,
      category: recurringFormData.category,
      nextDue: recurringFormData.nextDue,
      autoGenerate: recurringFormData.autoGenerate,
      isActive: true,
      applyImmediately: recurringFormData.applyImmediately
    });

    // Create initial transaction if apply immediately is checked and date is in the past or today
    if (recurringFormData.applyImmediately) {
      const setupDate = recurringFormData.startDate || new Date().toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      
      if (setupDate <= today) {
        onAddTransaction({
          description: `Initial ${recurringFormData.frequency} expense: ${recurringFormData.name.trim()}`,
          amount: parseFloat(recurringFormData.amount),
          type: 'expense',
          date: setupDate,
          category: recurringFormData.category
        });
      }
    }

    setRecurringFormData({
      name: '',
      amount: '',
      frequency: 'monthly',
      category: 'Housing',
      nextDue: '',
      startDate: '',
      autoGenerate: true,
      applyImmediately: false
    });
    setShowRecurringForm(false);
  };

  const handleOneTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!oneTimeFormData.description.trim() || !oneTimeFormData.amount || parseFloat(oneTimeFormData.amount) <= 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    onAddTransaction({
      description: oneTimeFormData.description.trim(),
      amount: parseFloat(oneTimeFormData.amount),
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      category: oneTimeFormData.category
    });

    setOneTimeFormData({
      description: '',
      amount: '',
      category: 'Other'
    });
    setShowOneTimeForm(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateMonthlyRecurringExpenses = () => {
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

  const generateRecurringExpense = (expense: RecurringExpense) => {
    onAddTransaction({
      description: `${expense.name} (Auto-generated)`,
      amount: expense.amount,
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      category: expense.category
    });

    // Update next due date
    const nextDue = new Date(expense.nextDue);
    if (expense.frequency === 'weekly') {
      nextDue.setDate(nextDue.getDate() + 7);
    } else if (expense.frequency === 'monthly') {
      nextDue.setMonth(nextDue.getMonth() + 1);
    } else if (expense.frequency === 'yearly') {
      nextDue.setFullYear(nextDue.getFullYear() + 1);
    }

    onUpdateRecurringExpense(expense.id, { 
      nextDue: nextDue.toISOString().split('T')[0] 
    });
  };

  const recentExpenses = transactions
    .filter(t => t.type === 'expense')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Monthly Expense Overview</h2>
        <div className="text-3xl font-bold">{formatCurrency(calculateMonthlyRecurringExpenses())}</div>
        <p className="text-red-100 mt-1">From {recurringExpenses.filter(e => e.isActive).length} recurring expenses</p>
      </div>

      {/* Section Navigation */}
      <div 
        className="flex space-x-1 p-1 rounded-lg"
        style={{ backgroundColor: theme.colors.background }}
      >
        <button
          onClick={() => setActiveSection('recurring')}
          className="flex-1 py-2 px-4 rounded-md font-medium transition-colors"
          style={{
            backgroundColor: activeSection === 'recurring' ? theme.colors.surface : 'transparent',
            color: activeSection === 'recurring' ? theme.colors.expense : theme.colors.textSecondary,
            boxShadow: activeSection === 'recurring' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (activeSection !== 'recurring') {
              e.currentTarget.style.backgroundColor = theme.colors.hover;
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== 'recurring') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          🔄 Recurring Expenses
        </button>
        <button
          onClick={() => setActiveSection('oneTime')}
          className="flex-1 py-2 px-4 rounded-md font-medium transition-colors"
          style={{
            backgroundColor: activeSection === 'oneTime' ? theme.colors.surface : 'transparent',
            color: activeSection === 'oneTime' ? theme.colors.expense : theme.colors.textSecondary,
            boxShadow: activeSection === 'oneTime' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (activeSection !== 'oneTime') {
              e.currentTarget.style.backgroundColor = theme.colors.hover;
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== 'oneTime') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          💸 One-time Expenses
        </button>
      </div>

      {/* Recurring Expenses Section */}
      {activeSection === 'recurring' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 
              className="text-xl font-semibold"
              style={{ color: theme.colors.textPrimary }}
            >
              Recurring Expenses
            </h2>
            <button
              onClick={() => setShowRecurringForm(!showRecurringForm)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {showRecurringForm ? 'Cancel' : '+ Add Recurring'}
            </button>
          </div>

          {/* Add Recurring Expense Form */}
          {showRecurringForm && (
            <div 
              className="rounded-lg shadow-md p-6"
              style={{ 
                backgroundColor: theme.colors.surface,
                boxShadow: theme.glow 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.expense}15`
                  : undefined
              }}
            >
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: theme.colors.textPrimary }}
              >
                Add Recurring Expense
              </h3>
              
              <form onSubmit={handleRecurringSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                      Expense Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Rent, Internet, Car Payment"
                      value={recurringFormData.name}
                      onChange={(e) => setRecurringFormData({...recurringFormData, name: e.target.value})}
                      className="w-full p-2 rounded-md transition-colors" style={{ backgroundColor: theme.colors.background, color: theme.colors.textPrimary, border: `1px solid ${theme.colors.border}`, outline: "none" }} onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus} onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                      Category
                    </label>
                    <ThemedSelect
                      theme={theme}
                      value={recurringFormData.category}
                      onChange={(e: any) => setRecurringFormData({...recurringFormData, category: e.target.value})}
                    >
                      {expenseCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </ThemedSelect>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={recurringFormData.amount}
                      onChange={(e) => setRecurringFormData({...recurringFormData, amount: e.target.value})}
                      className="w-full p-2 rounded-md transition-colors" style={{ backgroundColor: theme.colors.background, color: theme.colors.textPrimary, border: `1px solid ${theme.colors.border}`, outline: "none" }} onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus} onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                      Frequency
                    </label>
                    <ThemedSelect
                      theme={theme}
                      value={recurringFormData.frequency}
                      onChange={(e: any) => setRecurringFormData({...recurringFormData, frequency: e.target.value as any})}
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </ThemedSelect>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                      Next Due Date
                    </label>
                    <input
                      type="date"
                      value={recurringFormData.nextDue}
                      onChange={(e) => setRecurringFormData({...recurringFormData, nextDue: e.target.value})}
                      className="w-full p-2 rounded-md transition-colors" style={{ backgroundColor: theme.colors.background, color: theme.colors.textPrimary, border: `1px solid ${theme.colors.border}`, outline: "none" }} onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus} onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoGenerate"
                    checked={recurringFormData.autoGenerate}
                    onChange={(e) => setRecurringFormData({...recurringFormData, autoGenerate: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="autoGenerate" className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    Auto-generate expense transactions (recommended)
                  </label>
                </div>

                {/* Start Date Selection */}
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                    Start Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={recurringFormData.startDate || ''}
                    onChange={(e) => setRecurringFormData({...recurringFormData, startDate: e.target.value})}
                    className="w-full p-2 rounded-md transition-colors" style={{ backgroundColor: theme.colors.background, color: theme.colors.textPrimary, border: `1px solid ${theme.colors.border}`, outline: "none" }} onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus} onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  />
                  <p className="text-xs mt-1" style={{ color: theme.colors.textSecondary }}>
                    Leave blank to start from today
                  </p>
                </div>

                {/* Apply Immediately Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="applyImmediatelyExpense"
                    checked={recurringFormData.applyImmediately || false}
                    onChange={(e) => setRecurringFormData({...recurringFormData, applyImmediately: e.target.checked})}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="applyImmediatelyExpense" className="ml-2 block text-sm" style={{ color: theme.colors.textSecondary }}>
                    Create initial transaction for setup date
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Add Recurring Expense
                </button>
              </form>
            </div>
          )}

          {/* Recurring Expenses List */}
          <div className="style={{backgroundColor: theme.colors.surface}} rounded-lg shadow-md p-6">
            {recurringExpenses.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔄</div>
                <p className="text-gray-500">No recurring expenses set up yet</p>
                <p className="text-sm text-gray-400">Add recurring expenses to automate your budgeting!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recurringExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      expense.isActive ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{expense.name}</h3>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(expense.amount)} / {expense.frequency}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {expense.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            Next: {new Date(expense.nextDue).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <span className={`text-sm ${expense.autoGenerate ? 'text-green-600' : 'text-gray-500'}`}>
                            {expense.autoGenerate ? '🤖 Auto-generated' : '📝 Manual only'}
                          </span>
                          <span className={`text-sm ${expense.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                            {expense.isActive ? '✅ Active' : '⏸️ Paused'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex space-x-2">
                        {expense.autoGenerate && expense.isActive && (
                          <button
                            onClick={() => generateRecurringExpense(expense)}
                            className="bg-blue-200 text-blue-700 hover:bg-blue-300 px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Generate Now
                          </button>
                        )}
                        <button
                          onClick={() => onUpdateRecurringExpense(expense.id, { isActive: !expense.isActive })}
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            expense.isActive 
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-green-200 text-green-700 hover:bg-green-300'
                          }`}
                        >
                          {expense.isActive ? 'Pause' : 'Activate'}
                        </button>
                        <button
                          onClick={() => onDeleteRecurringExpense(expense.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                          title="Delete recurring expense"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* One-time Expenses Section */}
      {activeSection === 'oneTime' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">One-time Expenses</h2>
            <button
              onClick={() => setShowOneTimeForm(!showOneTimeForm)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {showOneTimeForm ? 'Cancel' : '+ Add Expense'}
            </button>
          </div>

          {/* Add One-time Expense Form */}
          {showOneTimeForm && (
            <div className="style={{backgroundColor: theme.colors.surface}} rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Add One-time Expense</h3>
              
              <form onSubmit={handleOneTimeSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Grocery shopping, Gas, Dinner out"
                      value={oneTimeFormData.description}
                      onChange={(e) => setOneTimeFormData({...oneTimeFormData, description: e.target.value})}
                      className="w-full p-2 rounded-md transition-colors" style={{ backgroundColor: theme.colors.background, color: theme.colors.textPrimary, border: `1px solid ${theme.colors.border}`, outline: "none" }} onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus} onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                      Category
                    </label>
                    <ThemedSelect
                      theme={theme}
                      value={oneTimeFormData.category}
                      onChange={(e: any) => setOneTimeFormData({...oneTimeFormData, category: e.target.value})}
                    >
                      {expenseCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </ThemedSelect>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={oneTimeFormData.amount}
                    onChange={(e) => setOneTimeFormData({...oneTimeFormData, amount: e.target.value})}
                    className="w-full p-2 rounded-md transition-colors" style={{ backgroundColor: theme.colors.background, color: theme.colors.textPrimary, border: `1px solid ${theme.colors.border}`, outline: "none" }} onFocus={(e) => e.target.style.borderColor = theme.colors.borderFocus} onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Add Expense
                </button>
              </form>
            </div>
          )}

          {/* Recent Expenses */}
          <div className="style={{backgroundColor: theme.colors.surface}} rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Expenses</h3>
            {recentExpenses.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">💸</div>
                <p className="text-gray-500">No expenses recorded yet</p>
                <p className="text-sm text-gray-400">Add your first expense to start tracking!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{expense.description}</h4>
                        <span className="font-semibold text-red-600">
                          -{formatCurrency(expense.amount)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {expense.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </div>
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
