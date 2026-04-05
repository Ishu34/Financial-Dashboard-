import type { Transaction, FilterState } from '@/types';
import { parseISO, isAfter, isBefore, isEqual } from 'date-fns';

export function applyFilters(transactions: Transaction[], filters: FilterState): Transaction[] {
  let result = [...transactions];

  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter(t =>
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query) ||
      t.amount.toString().includes(query)
    );
  }

  // Type filter
  if (filters.typeFilter !== 'all') {
    result = result.filter(t => t.type === filters.typeFilter);
  }

  // Category filter
  if (filters.categoryFilter) {
    result = result.filter(t => t.category === filters.categoryFilter);
  }

  // Date range
  if (filters.dateRange.start) {
    const startDate = parseISO(filters.dateRange.start);
    result = result.filter(t => {
      const d = parseISO(t.date);
      return isAfter(d, startDate) || isEqual(d, startDate);
    });
  }
  if (filters.dateRange.end) {
    const endDate = parseISO(filters.dateRange.end);
    result = result.filter(t => {
      const d = parseISO(t.date);
      return isBefore(d, endDate) || isEqual(d, endDate);
    });
  }

  // Sort
  result.sort((a, b) => {
    let comparison = 0;
    if (filters.sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      comparison = a.amount - b.amount;
    }
    return filters.sortOrder === 'asc' ? comparison : -comparison;
  });

  return result;
}

export const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  typeFilter: 'all',
  categoryFilter: null,
  dateRange: { start: null, end: null },
  sortBy: 'date',
  sortOrder: 'desc',
};
