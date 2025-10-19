'use client';

import { useState } from 'react';
import { IncomeSource, Transaction } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { ThemedSelect } from './ThemedComponents';

interface IncomeTabProps {
  incomeSources: IncomeSource[];
  transactions: Transaction[];
  onAddIncomeSource: (source: Omit<IncomeSource, 'id'>) => void;
  onUpdateIncomeSource: (id: string, updates: Partial<IncomeSource>) => void;
  onDeleteIncomeSource: (id: string) => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const incomeCategories = [
  'Salary', 'Freelance', 'Business', 'Investments', 'Rental', 'Side Hustle', 'Other'
];

export default function IncomeTab({ 
  incomeSources,
  transactions,
  onAddIncomeSource,
  onUpdateIncomeSource,
  onDeleteIncomeSource,
  onAddTransaction
}: IncomeTabProps) {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<'recurring' | 'oneTime'>('recurring');
  const [showRecurringForm, setShowRecurringForm] = useState(false);
  const [showOneTimeForm, setShowOneTimeForm] = useState(false);
  
  const [recurringFormData, setRecurringFormData] = useState({
    name: '',
    amount: '',
    frequency: 'monthly' as 'weekly' | 'bi-weekly' | 'monthly' | 'yearly',
    category: 'Salary',
    recurringDay: '',
    startDate: '',
    applyImmediately: false
  });

  const [oneTimeFormData, setOneTimeFormData] = useState({
    description: '',
    amount: '',
    category: 'Other'
  });

  const handleRecurringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recurringFormData.name.trim() || !recurringFormData.amount || parseFloat(recurringFormData.amount) <= 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    // Validate recurring day if frequency requires it
    if ((recurringFormData.frequency === 'weekly' || recurringFormData.frequency === 'bi-weekly' || recurringFormData.frequency === 'monthly') && !recurringFormData.recurringDay) {
      alert('Please specify when this income should recur');
      return;
    }

    const recurringDay = recurringFormData.recurringDay ? parseInt(recurringFormData.recurringDay) : undefined;
    
    onAddIncomeSource({
      name: recurringFormData.name.trim(),
      amount: parseFloat(recurringFormData.amount),
      frequency: recurringFormData.frequency,
      category: recurringFormData.category,
      isActive: true,
      recurringDay,
      startDate: recurringFormData.startDate || undefined,
      applyImmediately: recurringFormData.applyImmediately,
    });

    // Create initial transaction if apply immediately is checked and date is in the past or today
    if (recurringFormData.applyImmediately) {
      const setupDate = recurringFormData.startDate || new Date().toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      
      if (setupDate <= today) {
        onAddTransaction({
          description: `Initial ${recurringFormData.frequency} income: ${recurringFormData.name.trim()}`,
          amount: parseFloat(recurringFormData.amount),
          type: 'income',
          date: setupDate,
          category: recurringFormData.category
        });
      }
    }

    setRecurringFormData({
      name: '',
      amount: '',
      frequency: 'monthly',
      category: 'Salary',
      recurringDay: '',
      startDate: '',
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
      type: 'income',
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

  const getDayOptions = () => {
    if (recurringFormData.frequency === 'weekly' || recurringFormData.frequency === 'bi-weekly') {
      return [
        { value: '0', label: 'Sunday' },
        { value: '1', label: 'Monday' },
        { value: '2', label: 'Tuesday' },
        { value: '3', label: 'Wednesday' },
        { value: '4', label: 'Thursday' },
        { value: '5', label: 'Friday' },
        { value: '6', label: 'Saturday' }
      ];
    } else if (recurringFormData.frequency === 'monthly') {
      return Array.from({ length: 31 }, (_, i) => ({
        value: (i + 1).toString(),
        label: `${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}`
      }));
    }
    return [];
  };

  // Filter income transactions for one-time section
  const oneTimeIncomeTransactions = transactions.filter(t => t.type === 'income');

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Monthly Income Overview</h2>
        <div className="text-3xl font-bold">{formatCurrency(calculateMonthlyIncome())}</div>
        <p className="text-green-100 mt-1">From {incomeSources.filter(source => source.isActive).length} recurring income sources</p>
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
            color: activeSection === 'recurring' ? theme.colors.income : theme.colors.textSecondary,
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
          🔄 Recurring Income
        </button>
        <button
          onClick={() => setActiveSection('oneTime')}
          className="flex-1 py-2 px-4 rounded-md font-medium transition-colors"
          style={{
            backgroundColor: activeSection === 'oneTime' ? theme.colors.surface : 'transparent',
            color: activeSection === 'oneTime' ? theme.colors.income : theme.colors.textSecondary,
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
          💰 One-time Deposits
        </button>
      </div>

      {/* Recurring Income Section */}
      {activeSection === 'recurring' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold" style={{ color: theme.colors.textPrimary }}>Recurring Income Sources</h3>
            <button
              onClick={() => setShowRecurringForm(!showRecurringForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              {showRecurringForm ? 'Cancel' : '+ Add Recurring Income'}
            </button>
          </div>

          {/* Add Recurring Income Form */}
          {showRecurringForm && (
            <div 
              className="rounded-lg shadow-md p-6"
              style={{ 
                backgroundColor: theme.colors.surface,
                boxShadow: theme.glow 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.income}15`
                  : undefined
              }}
            >
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: theme.colors.textPrimary }}
              >
                Add Recurring Income Source
              </h3>
              
              <form onSubmit={handleRecurringSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                      Source Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Main Job, Freelance Project"
                      value={recurringFormData.name}
                      onChange={(e) => setRecurringFormData({...recurringFormData, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      {incomeCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </ThemedSelect>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      <option value="bi-weekly">Bi-weekly (Every 2 weeks)</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </ThemedSelect>
                  </div>
                </div>

                {/* Recurring Day Selection */}
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                    {recurringFormData.frequency === 'monthly' ? 'Day of Month' : 'Day of Week'}
                  </label>
                  <ThemedSelect
                    theme={theme}
                    value={recurringFormData.recurringDay}
                    onChange={(e: any) => setRecurringFormData({...recurringFormData, recurringDay: e.target.value})}
                  >
                    <option value="">Select {recurringFormData.frequency === 'monthly' ? 'day of month' : 'day of week'}</option>
                    {getDayOptions().map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </ThemedSelect>
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <p className="text-xs mt-1" style={{ color: theme.colors.textSecondary }}>
                    Leave blank to start from today
                  </p>
                </div>

                {/* Apply Immediately Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="applyImmediately"
                    checked={recurringFormData.applyImmediately || false}
                    onChange={(e) => setRecurringFormData({...recurringFormData, applyImmediately: e.target.checked})}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="applyImmediately" className="ml-2 block text-sm" style={{ color: theme.colors.textSecondary }}>
                    Create initial transaction for setup date
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Add Recurring Income Source
                </button>
              </form>
            </div>
          )}

          {/* Recurring Income Sources List */}
          <div 
            className="rounded-lg shadow-md p-6"
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: theme.glow 
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.income}15`
                : undefined
            }}
          >
            {incomeSources.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">💰</div>
                <p style={{ color: theme.colors.textSecondary }}>No recurring income sources added yet</p>
                <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>Add your first recurring income source to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {incomeSources.map((source) => (
                  <div
                    key={source.id}
                    className="p-4 border rounded-lg transition-colors"
                    style={{ 
                      borderColor: source.isActive ? theme.colors.income : theme.colors.border,
                      backgroundColor: source.isActive ? `${theme.colors.income}10` : theme.colors.hover
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium" style={{ color: theme.colors.textPrimary }}>{source.name}</h3>
                          <span className="font-semibold" style={{ color: theme.colors.income }}>
                            {formatCurrency(source.amount)} / {source.frequency}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                          <span 
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${theme.colors.accent}20`,
                              color: theme.colors.accent
                            }}
                          >
                            {source.category}
                          </span>
                          <span 
                            className="text-sm"
                            style={{ color: source.isActive ? theme.colors.income : theme.colors.textSecondary }}
                          >
                            {source.isActive ? '✅ Active' : '⏸️ Inactive'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex space-x-2">
                        <button
                          onClick={() => onUpdateIncomeSource(source.id, { isActive: !source.isActive })}
                          className="px-3 py-1 rounded text-sm font-medium transition-colors"
                          style={{
                            backgroundColor: source.isActive ? theme.colors.hover : `${theme.colors.income}20`,
                            color: source.isActive ? theme.colors.textSecondary : theme.colors.income
                          }}
                        >
                          {source.isActive ? 'Pause' : 'Activate'}
                        </button>
                        <button
                          onClick={() => onDeleteIncomeSource(source.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                          title="Delete income source"
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

      {/* One-time Deposits Section */}
      {activeSection === 'oneTime' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold" style={{ color: theme.colors.textPrimary }}>One-time Income Deposits</h3>
            <button
              onClick={() => setShowOneTimeForm(!showOneTimeForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              {showOneTimeForm ? 'Cancel' : '+ Add Deposit'}
            </button>
          </div>

          {/* Add One-time Income Form */}
          {showOneTimeForm && (
            <div 
              className="rounded-lg shadow-md p-6"
              style={{ 
                backgroundColor: theme.colors.surface,
                boxShadow: theme.glow 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.income}15`
                  : undefined
              }}
            >
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: theme.colors.textPrimary }}
              >
                Add One-time Income Deposit
              </h3>
              
              <form onSubmit={handleOneTimeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bonus, Tax Refund, Gift"
                    value={oneTimeFormData.description}
                    onChange={(e) => setOneTimeFormData({...oneTimeFormData, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      {incomeCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </ThemedSelect>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Add Income Deposit
                </button>
              </form>
            </div>
          )}

          {/* One-time Income Transactions List */}
          <div 
            className="rounded-lg shadow-md p-6"
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: theme.glow 
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.income}15`
                : undefined
            }}
          >
            {oneTimeIncomeTransactions.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">💵</div>
                <p style={{ color: theme.colors.textSecondary }}>No one-time income deposits yet</p>
                <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>Add a deposit to track bonus income, gifts, or other one-time earnings!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {oneTimeIncomeTransactions.slice(0, 10).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                    style={{ 
                      borderColor: theme.colors.border,
                      backgroundColor: `${theme.colors.income}05`
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium" style={{ color: theme.colors.textPrimary }}>{transaction.description}</h3>
                        <span className="font-semibold" style={{ color: theme.colors.income }}>
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${theme.colors.accent}20`,
                            color: theme.colors.accent
                          }}
                        >
                          {transaction.category}
                        </span>
                        <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {oneTimeIncomeTransactions.length > 10 && (
                  <p className="text-center text-sm" style={{ color: theme.colors.textSecondary }}>
                    Showing latest 10 deposits. View all in Transactions tab.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}