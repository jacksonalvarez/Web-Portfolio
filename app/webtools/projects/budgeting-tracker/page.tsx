'use client'

import React, { useState, useEffect } from 'react'

// Complete Budget Tracker Interface
interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface BudgetCategory {
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

export default function BudgetingTrackerPage() {
  // State Management
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { name: 'Food & Dining', budgeted: 500, spent: 0, color: 'bg-blue-500' },
    { name: 'Transportation', budgeted: 300, spent: 0, color: 'bg-green-500' },
    { name: 'Entertainment', budgeted: 200, spent: 0, color: 'bg-purple-500' },
    { name: 'Utilities', budgeted: 150, spent: 0, color: 'bg-yellow-500' },
    { name: 'Healthcare', budgeted: 100, spent: 0, color: 'bg-red-500' },
    { name: 'Other', budgeted: 250, spent: 0, color: 'bg-gray-500' }
  ]);
  const [activeTab, setActiveTab] = useState('overview');
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: ''
  });
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('budget-transactions');
    const savedCategories = localStorage.getItem('budget-categories');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Save data to localStorage whenever transactions or categories change
  useEffect(() => {
    localStorage.setItem('budget-transactions', JSON.stringify(transactions));
    updateCategorySpending();
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budget-categories', JSON.stringify(categories));
  }, [categories]);

  // Calculate spending per category
  const updateCategorySpending = () => {
    const newCategories = categories.map(category => ({
      ...category,
      spent: transactions
        .filter(t => t.type === 'expense' && t.category === category.name)
        .reduce((sum, t) => sum + t.amount, 0)
    }));
    setCategories(newCategories);
  };

  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalBudgeted = categories.reduce((sum, c) => sum + c.budgeted, 0);
  const balance = totalIncome - totalExpenses;

  // Add new transaction
  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) return;
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category || (newTransaction.type === 'income' ? 'Income' : 'Other'),
      description: newTransaction.description,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([transaction, ...transactions]);
    setNewTransaction({ type: 'expense', amount: '', category: '', description: '' });
    setShowAddTransaction(false);
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Personal Budget Tracker</h1>
              <p className="text-gray-600">Take control of your finances</p>
            </div>
            <button
              onClick={() => setShowAddTransaction(!showAddTransaction)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              + Add Transaction
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-lg">
              <h3 className="text-sm font-medium opacity-90">Total Income</h3>
              <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-4 rounded-lg">
              <h3 className="text-sm font-medium opacity-90">Total Expenses</h3>
              <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
            </div>
            <div className={`${balance >= 0 ? 'from-blue-400 to-blue-500' : 'from-orange-400 to-orange-500'} bg-gradient-to-r text-white p-4 rounded-lg`}>
              <h3 className="text-sm font-medium opacity-90">Balance</h3>
              <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-4 rounded-lg">
              <h3 className="text-sm font-medium opacity-90">Budget Used</h3>
              <p className="text-2xl font-bold">{totalBudgeted > 0 ? Math.round((totalExpenses / totalBudgeted) * 100) : 0}%</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 border-b">
            {['overview', 'transactions', 'budget', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Add Transaction Modal */}
        {showAddTransaction && (
          <div className="bg-white rounded-2xl shadow-xl mb-6 p-6">
            <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'income' | 'expense'})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {newTransaction.type === 'expense' ? 
                    categories.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    )) : 
                    <option value="Income">Income</option>
                  }
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  placeholder="Transaction description"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addTransaction}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Add Transaction
              </button>
              <button
                onClick={() => setShowAddTransaction(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Main Content Based on Active Tab */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
              
              {/* Budget Progress */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Budget Categories</h3>
                <div className="space-y-4">
                  {categories.map((category) => {
                    const percentage = category.budgeted > 0 ? (category.spent / category.budgeted) * 100 : 0;
                    const isOverBudget = percentage > 100;
                    
                    return (
                      <div key={category.name} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{category.name}</span>
                          <span className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-700'}`}>
                            ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${
                              isOverBudget ? 'bg-red-500' : category.color
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {percentage.toFixed(1)}% used
                          {isOverBudget && (
                            <span className="text-red-600 font-medium ml-2">
                              (${(category.spent - category.budgeted).toLocaleString()} over budget)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {transactions.slice(0, 10).map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-500">{transaction.category} • {transaction.date}</div>
                      </div>
                      <div className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No transactions yet. Add your first transaction above!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">All Transactions</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-gray-500">{transaction.category} • {transaction.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </div>
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                {transactions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No transactions yet. Add your first transaction above!
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Budget Management</h2>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={category.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <input
                        type="number"
                        value={category.budgeted}
                        onChange={(e) => {
                          const newCategories = [...categories];
                          newCategories[index].budgeted = parseFloat(e.target.value) || 0;
                          setCategories(newCategories);
                        }}
                        className="w-32 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Budget:</span>
                    <span>${totalBudgeted.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Financial Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Spending by Category</h3>
                  <div className="space-y-2">
                    {categories
                      .filter(cat => cat.spent > 0)
                      .sort((a, b) => b.spent - a.spent)
                      .map((category) => {
                        const percentage = totalExpenses > 0 ? (category.spent / totalExpenses) * 100 : 0;
                        return (
                          <div key={category.name} className="flex justify-between items-center">
                            <span className="text-sm">{category.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${category.color}`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium w-16">${category.spent.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Financial Health</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Savings Rate:</span>
                      <span className="font-medium">
                        {totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Budget Adherence:</span>
                      <span className="font-medium">
                        {totalBudgeted > 0 ? (100 - ((totalExpenses / totalBudgeted) * 100)).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Transactions:</span>
                      <span className="font-medium">{transactions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Transaction:</span>
                      <span className="font-medium">
                        ${transactions.length > 0 ? ((totalIncome + totalExpenses) / transactions.length).toFixed(2) : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Monthly Summary</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Total Income</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Total Expenses</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                      ${balance.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Net Balance</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}