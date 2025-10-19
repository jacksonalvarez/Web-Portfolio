export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category?: string;
}

export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'yearly' | 'one-time';
  category: string;
  isActive: boolean;
  nextPayment?: string;
  recurringDay?: number; // Day of month (1-31) for monthly, day of week (0-6) for weekly/bi-weekly
  startDate?: string; // ISO date string for when recurring payments should start
  applyImmediately?: boolean; // Whether to create transaction immediately when setting up
}

export interface RecurringExpense {
  id: string;
  name: string;
  amount: number;
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'yearly';
  category: string;
  isActive: boolean;
  nextDue: string;
  autoGenerate: boolean;
  recurringDay?: number; // Day of month (1-31) for monthly, day of week (0-6) for weekly/bi-weekly
  applyImmediately?: boolean; // Whether to create transaction immediately when setting up
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  category: string;
}