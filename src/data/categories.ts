import type { Category } from '@/types';

export interface CategoryMeta {
  name: Category;
  type: 'income' | 'expense';
  color: string; // hex color for charts
  icon: string; // Lucide icon name
}

export const CATEGORIES: CategoryMeta[] = [
  // Income categories
  { name: 'Salary', type: 'income', color: '#10B981', icon: 'Briefcase' },
  { name: 'Freelance', type: 'income', color: '#3B82F6', icon: 'Laptop' },
  { name: 'Investment', type: 'income', color: '#8B5CF6', icon: 'TrendingUp' },
  { name: 'Gift', type: 'income', color: '#EC4899', icon: 'Gift' },
  // Expense categories
  { name: 'Food', type: 'expense', color: '#F59E0B', icon: 'UtensilsCrossed' },
  { name: 'Transport', type: 'expense', color: '#6366F1', icon: 'Car' },
  { name: 'Shopping', type: 'expense', color: '#EF4444', icon: 'ShoppingBag' },
  { name: 'Bills', type: 'expense', color: '#14B8A6', icon: 'FileText' },
  { name: 'Entertainment', type: 'expense', color: '#F97316', icon: 'Film' },
  { name: 'Health', type: 'expense', color: '#06B6D4', icon: 'Heart' },
  { name: 'Education', type: 'expense', color: '#84CC16', icon: 'GraduationCap' },
  { name: 'Other', type: 'expense', color: '#94A3B8', icon: 'MoreHorizontal' },
];

export const INCOME_CATEGORIES = CATEGORIES.filter(c => c.type === 'income').map(c => c.name);
export const EXPENSE_CATEGORIES = CATEGORIES.filter(c => c.type === 'expense').map(c => c.name);

export function getCategoryMeta(name: Category): CategoryMeta {
  return CATEGORIES.find(c => c.name === name) ?? CATEGORIES[CATEGORIES.length - 1];
}

export function getCategoryColor(name: Category): string {
  return getCategoryMeta(name).color;
}
