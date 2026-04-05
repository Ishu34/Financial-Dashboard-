import { Search, RotateCcw, Download, ArrowUpDown, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFilterStore, useRoleStore, useTransactionStore } from '@/stores';
import { CATEGORIES } from '@/data/categories';
import { exportTransactions } from '@/utils/export';
import { cn } from '@/lib/utils';
import type { TransactionType, Category, SortField, SortOrder } from '@/types';

const inputClasses = cn(
  'px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground',
  'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary',
  'focus:border-transparent transition-colors'
);

const buttonClasses = cn(
  'px-3 py-2 bg-surface border border-border rounded-lg text-sm font-medium',
  'hover:bg-surface-hover hover:border-border-hover transition-colors',
  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1'
);

export function FilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    resetFilters,
  } = useFilterStore();
  const { role } = useRoleStore();
  const { transactions } = useTransactionStore();

  const handleExport = (format: 'csv' | 'json') => {
    exportTransactions({ format, transactions });
  };

  const typeOptions: { value: 'all' | TransactionType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

  const sortOptions: { value: SortField; label: string }[] = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
  ];

  const orderOptions: { value: SortOrder; label: string }[] = [
    { value: 'desc', label: 'Newest' },
    { value: 'asc', label: 'Oldest' },
  ];

  const hasActiveFilters =
    searchQuery !== '' ||
    typeFilter !== 'all' ||
    categoryFilter !== null ||
    sortBy !== 'date' ||
    sortOrder !== 'desc';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-4 shadow-card"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:flex-wrap">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(inputClasses, 'pl-10 w-full')}
            aria-label="Search transactions"
          />
        </div>

        {/* Type Filter - Segmented Control */}
        <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1">
          {typeOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => setTypeFilter(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                typeFilter === option.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted hover:text-foreground hover:bg-surface-hover'
              )}
              aria-label={`Filter by ${option.label}`}
              aria-pressed={typeFilter === option.value}
            >
              {option.label}
            </motion.button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={categoryFilter ?? ''}
            onChange={(e) =>
              setCategoryFilter(e.target.value ? (e.target.value as Category) : null)
            }
            className={cn(inputClasses, 'pr-8 appearance-none cursor-pointer min-w-[150px]')}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortField)}
            className={cn(inputClasses, 'pr-8 appearance-none cursor-pointer')}
            aria-label="Sort by"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className={cn(inputClasses, 'pr-8 appearance-none cursor-pointer')}
            aria-label="Sort order"
          >
            {orderOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Reset Button */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={resetFilters}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(buttonClasses, 'flex items-center gap-2 text-muted hover:text-danger')}
              aria-label="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </motion.button>
          )}

          {/* Export Buttons (Admin Only) */}
          {role === 'admin' && (
            <>
              <motion.button
                onClick={() => handleExport('csv')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(buttonClasses, 'flex items-center gap-2')}
                aria-label="Export as CSV"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">CSV</span>
              </motion.button>
              <motion.button
                onClick={() => handleExport('json')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(buttonClasses, 'flex items-center gap-2')}
                aria-label="Export as JSON"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">JSON</span>
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
