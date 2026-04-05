import { Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { useTransactionStore, useRoleStore } from '@/stores';
import { getCategoryMeta } from '@/data/categories';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/types';

interface TransactionCardProps {
  transaction: Transaction;
}

function getCategoryIcon(iconName: string): React.ComponentType<LucideIcons.LucideProps> {
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
  if (typeof IconComponent === 'function') {
    return IconComponent as React.ComponentType<LucideIcons.LucideProps>;
  }
  return LucideIcons.Circle;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100, height: 0, marginBottom: 0 },
};

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { deleteTransaction } = useTransactionStore();
  const { role } = useRoleStore();

  const categoryMeta = getCategoryMeta(transaction.category);
  const CategoryIcon = getCategoryIcon(categoryMeta.icon);

  const handleDelete = () => {
    deleteTransaction(transaction.id);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="bg-card rounded-xl border border-border shadow-card p-4 hover:shadow-card-hover transition-shadow"
    >
      <div className="flex items-start gap-3">
        {/* Category Icon */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
          style={{ backgroundColor: `${categoryMeta.color}20` }}
        >
          <CategoryIcon className="w-5 h-5" style={{ color: categoryMeta.color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">
                {transaction.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: categoryMeta.color }}
                />
                <span className="text-xs text-muted">{transaction.category}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right flex-shrink-0">
              <p
                className={cn(
                  'text-sm font-semibold tabular-nums',
                  transaction.type === 'income' ? 'text-success' : 'text-danger'
                )}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
              <span
                className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase mt-1',
                  transaction.type === 'income'
                    ? 'bg-success-subtle text-success'
                    : 'bg-danger-subtle text-danger'
                )}
              >
                {transaction.type}
              </span>
            </div>
          </div>
        </div>

        {/* Delete Button (Admin Only) */}
        {role === 'admin' && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            className="p-2 rounded-lg text-muted hover:text-danger hover:bg-danger-subtle transition-colors flex-shrink-0"
            aria-label={`Delete transaction: ${transaction.description}`}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
