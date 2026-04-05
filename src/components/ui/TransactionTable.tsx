import { Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactionStore, useFilterStore, useRoleStore } from '@/stores';
import { getCategoryMeta } from '@/data/categories';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { cn } from '@/lib/utils';
import type { Transaction, SortField, SortOrder } from '@/types';

interface TransactionTableProps {
  transactions: Transaction[];
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20, height: 0, marginBottom: 0 },
};

function getCategoryIcon(iconName: string): React.ComponentType<LucideIcons.LucideProps> {
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
  if (typeof IconComponent === 'function') {
    return IconComponent as React.ComponentType<LucideIcons.LucideProps>;
  }
  return LucideIcons.Circle;
}

interface SortableHeaderProps {
  label: string;
  field: SortField;
  currentSort: SortField;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}

function SortableHeader({ label, field, currentSort, currentOrder, onSort }: SortableHeaderProps) {
  const isActive = currentSort === field;

  return (
    <button
      onClick={() => onSort(field)}
      className={cn(
        'flex items-center gap-1 hover:text-foreground transition-colors',
        isActive ? 'text-foreground' : 'text-muted'
      )}
      aria-label={`Sort by ${label}`}
    >
      {label}
      {isActive ? (
        currentOrder === 'asc' ? (
          <ArrowUp className="w-3.5 h-3.5" />
        ) : (
          <ArrowDown className="w-3.5 h-3.5" />
        )
      ) : (
        <ArrowUpDown className="w-3.5 h-3.5 opacity-50" />
      )}
    </button>
  );
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const { deleteTransaction } = useTransactionStore();
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useFilterStore();
  const { role } = useRoleStore();

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
  };

  if (transactions.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted">
                <SortableHeader
                  label="Date"
                  field="date"
                  currentSort={sortBy}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Description
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Category
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Type
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted">
                <SortableHeader
                  label="Amount"
                  field="amount"
                  currentSort={sortBy}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
              {role === 'admin' && (
                <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {transactions.map((transaction, index) => {
                const categoryMeta = getCategoryMeta(transaction.category);
                const CategoryIcon = getCategoryIcon(categoryMeta.icon);

                return (
                  <motion.tr
                    key={transaction.id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    layout
                    className="border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors group"
                  >
                    <td className="py-3 px-4 text-sm text-foreground whitespace-nowrap">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground max-w-[200px] truncate">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: categoryMeta.color }}
                        />
                        <CategoryIcon className="w-4 h-4 text-muted flex-shrink-0" />
                        <span className="text-sm text-foreground">{transaction.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                          transaction.type === 'income'
                            ? 'bg-success-subtle text-success'
                            : 'bg-danger-subtle text-danger'
                        )}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={cn(
                        'py-3 px-4 text-sm font-medium text-right tabular-nums',
                        transaction.type === 'income' ? 'text-success' : 'text-danger'
                      )}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>
                    {role === 'admin' && (
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(transaction.id)}
                            className="p-1.5 rounded-md text-muted hover:text-danger hover:bg-danger-subtle transition-colors"
                            aria-label={`Delete transaction: ${transaction.description}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
