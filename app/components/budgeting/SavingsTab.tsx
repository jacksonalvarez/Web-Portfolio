'use client';

import { useState } from 'react';
import { SavingsGoal, Transaction } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { ThemedSelect } from './ThemedComponents';

interface SavingsTabProps {
  savingsGoals: SavingsGoal[];
  transactions: Transaction[];
  onAddSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  onUpdateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  onDeleteSavingsGoal: (id: string) => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const savingsCategories = [
  'Emergency Fund', 'Vacation', 'House Down Payment', 'Car', 'Education', 
  'Retirement', 'Investment', 'Electronics', 'Home Improvement', 'Other'
];

export default function SavingsTab({ 
  savingsGoals,
  transactions,
  onAddSavingsGoal,
  onUpdateSavingsGoal,
  onDeleteSavingsGoal,
  onAddTransaction
}: SavingsTabProps) {
  const { theme } = useTheme();
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showContributionForm, setShowContributionForm] = useState<string | null>(null);
  
  const [goalFormData, setGoalFormData] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    category: 'Emergency Fund'
  });

  const [contributionAmount, setContributionAmount] = useState('');

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goalFormData.name.trim() || !goalFormData.targetAmount || parseFloat(goalFormData.targetAmount) <= 0) {
      alert('Please fill in all required fields with valid values');
      return;
    }

    onAddSavingsGoal({
      name: goalFormData.name.trim(),
      targetAmount: parseFloat(goalFormData.targetAmount),
      currentAmount: 0,
      targetDate: goalFormData.targetDate || undefined,
      category: goalFormData.category
    });

    setGoalFormData({
      name: '',
      targetAmount: '',
      targetDate: '',
      category: 'Emergency Fund'
    });
    setShowGoalForm(false);
  };

  const handleContribution = (goalId: string, goalName: string) => {
    if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
      alert('Please enter a valid contribution amount');
      return;
    }

    const amount = parseFloat(contributionAmount);
    const goal = savingsGoals.find(g => g.id === goalId);
    
    if (goal) {
      // Add transaction
      onAddTransaction({
        description: `Savings contribution to ${goalName}`,
        amount: amount,
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        category: 'Savings'
      });

      // Update goal
      onUpdateSavingsGoal(goalId, { 
        currentAmount: goal.currentAmount + amount 
      });
    }

    setContributionAmount('');
    setShowContributionForm(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100);
  };

  const getDaysUntilTarget = (targetDate?: string) => {
    if (!targetDate) return null;
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalSavingsTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Savings Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold">{formatCurrency(totalCurrentSavings)}</div>
            <p className="text-blue-100">Total Saved</p>
          </div>
          <div>
            <div className="text-2xl font-bold">{formatCurrency(totalSavingsTarget)}</div>
            <p className="text-blue-100">Total Goals</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Progress</span>
            <span>{totalSavingsTarget > 0 ? Math.round((totalCurrentSavings / totalSavingsTarget) * 100) : 0}%</span>
          </div>
          <div className="w-full bg-blue-400 rounded-full h-2">
            <div 
              className="style={{backgroundColor: theme.colors.surface}} h-2 rounded-full transition-all duration-300" 
              style={{ width: `${totalSavingsTarget > 0 ? Math.min(100, (totalCurrentSavings / totalSavingsTarget) * 100) : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add New Goal Button */}
      <div className="flex justify-between items-center">
        <h2 
          className="text-xl font-semibold"
          style={{ color: theme.colors.textPrimary }}
        >
          Savings Goals
        </h2>
        <button
          onClick={() => setShowGoalForm(!showGoalForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {showGoalForm ? 'Cancel' : '+ Add Goal'}
        </button>
      </div>

      {/* Add Savings Goal Form */}
      {showGoalForm && (
        <div 
          className="rounded-lg shadow-md p-6"
          style={{ 
            backgroundColor: theme.colors.surface,
            boxShadow: theme.glow 
              ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.savings}15`
              : undefined
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ color: theme.colors.textPrimary }}
          >
            Add New Savings Goal
          </h3>
          
          <form onSubmit={handleGoalSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Emergency Fund, Vacation, New Car"
                  value={goalFormData.name}
                  onChange={(e) => setGoalFormData({...goalFormData, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.textSecondary }}>
                  Category
                </label>
                <ThemedSelect
                  theme={theme}
                  value={goalFormData.category}
                  onChange={(e: any) => setGoalFormData({...goalFormData, category: e.target.value})}
                >
                  {savingsCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </ThemedSelect>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={goalFormData.targetAmount}
                  onChange={(e) => setGoalFormData({...goalFormData, targetAmount: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Date (Optional)
                </label>
                <input
                  type="date"
                  value={goalFormData.targetDate}
                  onChange={(e) => setGoalFormData({...goalFormData, targetDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
            >
              Add Savings Goal
            </button>
          </form>
        </div>
      )}

      {/* Savings Goals List */}
      <div 
        className="rounded-lg shadow-md p-6"
        style={{ 
          backgroundColor: theme.colors.surface,
          boxShadow: theme.glow 
            ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.colors.savings}15`
            : undefined
        }}
      >
        {savingsGoals.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏦</div>
            <p className="text-gray-500">No savings goals yet</p>
            <p className="text-sm text-gray-400">Set your first savings goal to start building your future!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {savingsGoals.map((goal) => {
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
              const daysUntilTarget = getDaysUntilTarget(goal.targetDate);
              const isCompleted = progress >= 100;
              
              return (
                <div
                  key={goal.id}
                  className={`p-6 border rounded-lg transition-colors ${
                    isCompleted ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {goal.category}
                        </span>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              isCompleted ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {goal.targetDate && (
                        <div className="mt-2 text-sm text-gray-600">
                          Target: {new Date(goal.targetDate).toLocaleDateString()}
                          {daysUntilTarget !== null && (
                            <span className={`ml-2 ${daysUntilTarget < 0 ? 'text-red-600' : daysUntilTarget < 30 ? 'text-orange-600' : 'text-green-600'}`}>
                              ({daysUntilTarget < 0 ? `${Math.abs(daysUntilTarget)} days overdue` : `${daysUntilTarget} days left`})
                            </span>
                          )}
                        </div>
                      )}

                      {isCompleted && (
                        <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          🎉 Goal Achieved!
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex space-x-2">
                      {!isCompleted && (
                        <button
                          onClick={() => setShowContributionForm(showContributionForm === goal.id ? null : goal.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          {showContributionForm === goal.id ? 'Cancel' : 'Add Money'}
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteSavingsGoal(goal.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="Delete savings goal"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Contribution Form */}
                  {showContributionForm === goal.id && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium text-gray-700 mb-3">Add Contribution</h4>
                      <div className="flex space-x-3">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="Amount to add"
                          value={contributionAmount}
                          onChange={(e) => setContributionAmount(e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={() => handleContribution(goal.id, goal.name)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        This will be recorded as an expense and added to your goal progress.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
