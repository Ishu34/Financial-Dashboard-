import { create } from 'zustand';
import type { FilterStore, TransactionType, Category, SortField, SortOrder } from '@/types';
import { DEFAULT_FILTERS } from '@/utils/filters';

export const useFilterStore = create<FilterStore>()((set) => ({
  ...DEFAULT_FILTERS,

  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setTypeFilter: (typeFilter: 'all' | TransactionType) => set({ typeFilter }),
  setCategoryFilter: (categoryFilter: Category | null) => set({ categoryFilter }),
  setDateRange: (dateRange: { start: string | null; end: string | null }) => set({ dateRange }),
  setSortBy: (sortBy: SortField) => set({ sortBy }),
  setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),
  resetFilters: () => set(DEFAULT_FILTERS),
}));
