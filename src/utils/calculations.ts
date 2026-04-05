import type { Transaction, Category, MonthlyChartData, CategoryChartData, SummaryCard, MonthlyComparison } from '@/types';
import { getCategoryColor } from '@/data/categories';
import { formatCurrency } from './formatters';
import { format, parseISO, startOfMonth, subMonths } from 'date-fns';

export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateBalance(transactions: Transaction[]): number {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
}

export function calculateSavingsRate(transactions: Transaction[]): number {
  const income = calculateTotalIncome(transactions);
  if (income === 0) return 0;
  const balance = calculateBalance(transactions);
  return (balance / income) * 100;
}

export function calculateMonthlyData(transactions: Transaction[]): MonthlyChartData[] {
  const monthMap = new Map<string, { income: number; expenses: number }>();

  for (const t of transactions) {
    const month = format(parseISO(t.date), 'MMM yyyy');
    const existing = monthMap.get(month) ?? { income: 0, expenses: 0 };
    if (t.type === 'income') {
      existing.income += t.amount;
    } else {
      existing.expenses += t.amount;
    }
    monthMap.set(month, existing);
  }

  return Array.from(monthMap.entries())
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      balance: data.income - data.expenses,
    }))
    .sort((a, b) => {
      // Sort chronologically
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });
}

export function calculateCategoryData(transactions: Transaction[]): CategoryChartData[] {
  const expenses = transactions.filter(t => t.type === 'expense');
  const total = expenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryMap = new Map<Category, number>();
  for (const t of expenses) {
    categoryMap.set(t.category, (categoryMap.get(t.category) ?? 0) + t.amount);
  }

  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
      color: getCategoryColor(category),
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function calculateSummaryCards(transactions: Transaction[]): SummaryCard[] {
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const balance = totalIncome - totalExpenses;
  const savingsRate = calculateSavingsRate(transactions);

  // Calculate month-over-month trends (compare last 2 months of data)
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const prevMonthStart = startOfMonth(subMonths(now, 1));

  const currentMonthTxns = transactions.filter(t => {
    const d = parseISO(t.date);
    return d >= currentMonthStart;
  });
  const prevMonthTxns = transactions.filter(t => {
    const d = parseISO(t.date);
    return d >= prevMonthStart && d < currentMonthStart;
  });

  function getTrend(current: number, previous: number) {
    if (previous === 0) return { value: 0, direction: 'neutral' as const, label: 'No prior data' };
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change),
      direction: change > 0 ? 'up' as const : change < 0 ? 'down' as const : 'neutral' as const,
      label: 'vs last month',
    };
  }

  const currentIncome = calculateTotalIncome(currentMonthTxns);
  const prevIncome = calculateTotalIncome(prevMonthTxns);
  const currentExpenses = calculateTotalExpenses(currentMonthTxns);
  const prevExpenses = calculateTotalExpenses(prevMonthTxns);

  return [
    {
      id: 'total-income',
      title: 'Total Income',
      value: totalIncome,
      formattedValue: formatCurrency(totalIncome),
      trend: getTrend(currentIncome, prevIncome),
      icon: 'TrendingUp',
      iconBg: 'bg-success-subtle',
      valueColor: 'text-success',
    },
    {
      id: 'total-expenses',
      title: 'Total Expenses',
      value: totalExpenses,
      formattedValue: formatCurrency(totalExpenses),
      trend: getTrend(currentExpenses, prevExpenses),
      icon: 'TrendingDown',
      iconBg: 'bg-danger-subtle',
      valueColor: 'text-danger',
    },
    {
      id: 'balance',
      title: 'Net Balance',
      value: balance,
      formattedValue: formatCurrency(balance),
      trend: getTrend(
        calculateBalance(currentMonthTxns),
        calculateBalance(prevMonthTxns)
      ),
      icon: 'Wallet',
      iconBg: 'bg-primary-subtle',
      valueColor: balance >= 0 ? 'text-success' : 'text-danger',
    },
    {
      id: 'savings-rate',
      title: 'Savings Rate',
      value: savingsRate,
      formattedValue: `${savingsRate.toFixed(1)}%`,
      trend: {
        value: savingsRate,
        direction: savingsRate > 20 ? 'up' : savingsRate > 0 ? 'neutral' : 'down',
        label: savingsRate > 20 ? 'Healthy' : savingsRate > 0 ? 'Could improve' : 'Negative savings',
      },
      icon: 'PiggyBank',
      iconBg: 'bg-warning-subtle',
      valueColor: savingsRate > 20 ? 'text-success' : savingsRate > 0 ? 'text-warning' : 'text-danger',
    },
  ];
}

export function calculateMonthlyComparison(transactions: Transaction[]): MonthlyComparison {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const prevMonthStart = startOfMonth(subMonths(now, 1));

  const currentExpenses = transactions
    .filter(t => t.type === 'expense' && parseISO(t.date) >= currentMonthStart)
    .reduce((sum, t) => sum + t.amount, 0);

  const prevExpenses = transactions
    .filter(t => {
      const d = parseISO(t.date);
      return t.type === 'expense' && d >= prevMonthStart && d < currentMonthStart;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const percentageChange = prevExpenses > 0
    ? ((currentExpenses - prevExpenses) / prevExpenses) * 100
    : 0;

  return { currentMonth: currentExpenses, previousMonth: prevExpenses, percentageChange };
}

export function getHighestSpendingCategory(transactions: Transaction[]): Category | null {
  const categoryData = calculateCategoryData(transactions);
  return categoryData.length > 0 ? categoryData[0].category : null;
}

export function getFinancialHealthTip(savingsRate: number, highestCategory: Category | null): string {
  if (savingsRate > 30) return "Excellent! You're saving over 30% of your income. Consider investing the surplus.";
  if (savingsRate > 20) return "Good job! You're maintaining a healthy savings rate above 20%.";
  if (savingsRate > 10) return `Your savings rate is moderate. Consider reducing ${highestCategory ?? 'expenses'} spending.`;
  if (savingsRate > 0) return `Your savings rate is low. Review your ${highestCategory ?? 'top expense'} category for potential cuts.`;
  return "Warning: You're spending more than you earn. Immediate budget review recommended.";
}
