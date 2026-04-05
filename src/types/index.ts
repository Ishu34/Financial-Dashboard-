// === Core Domain Types ===

export type Category =
  | 'Salary' | 'Freelance' | 'Investment' | 'Gift'
  | 'Food' | 'Transport' | 'Shopping' | 'Bills'
  | 'Entertainment' | 'Health' | 'Education' | 'Other';

export type TransactionType = 'income' | 'expense';
export type Role = 'admin' | 'viewer';
export type Theme = 'light' | 'dark';
export type SortField = 'date' | 'amount';
export type SortOrder = 'asc' | 'desc';

export interface Transaction {
  id: string;
  date: string; // ISO date string
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export interface FilterState {
  searchQuery: string;
  typeFilter: 'all' | TransactionType;
  categoryFilter: Category | null;
  dateRange: { start: string | null; end: string | null };
  sortBy: SortField;
  sortOrder: SortOrder;
}

export interface SummaryCard {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  trend: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
  icon: string; // Lucide icon name
  iconBg: string; // Tailwind class
  valueColor: string; // Tailwind class
}

export interface MonthlyChartData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryChartData {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
}

export type ChartData = MonthlyChartData | CategoryChartData;

// Insights types
export interface MonthlyComparison {
  currentMonth: number;
  previousMonth: number;
  percentageChange: number;
}

export interface InsightsState {
  highestSpendingCategory: Category | null;
  monthlyComparison: MonthlyComparison;
  savingsRate: number;
  financialHealthTip: string;
  isLoading: boolean;
}

// Store types
export interface TransactionStore {
  transactions: Transaction[];
  isLoading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void;
  deleteTransaction: (id: string) => void;
  loadTransactions: () => Promise<void>;
}

export interface FilterStore extends FilterState {
  setSearchQuery: (query: string) => void;
  setTypeFilter: (type: 'all' | TransactionType) => void;
  setCategoryFilter: (category: Category | null) => void;
  setDateRange: (range: { start: string | null; end: string | null }) => void;
  setSortBy: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  resetFilters: () => void;
}

export interface RoleStore {
  role: Role;
  setRole: (role: Role) => void;
}

export interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export interface InsightsStore extends InsightsState {
  computeInsights: (transactions: Transaction[]) => void;
}

// Component prop types
export interface PageProps {
  className?: string;
}

// Export helper
export interface ExportOptions {
  format: 'csv' | 'json';
  filename?: string;
  transactions: Transaction[];
}
