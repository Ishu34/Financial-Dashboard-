import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTransactionStore } from '@/stores';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/data/categories';
import { cn } from '@/lib/utils';
import type { Category, TransactionType } from '@/types';

interface AddTransactionModalProps {
  onClose: () => void;
}

const inputClasses = cn(
  'w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground',
  'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary',
  'focus:border-transparent transition-colors'
);

const labelClasses = 'block text-sm font-medium text-foreground mb-1.5';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const { addTransaction } = useTransactionStore();

  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableCategories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    addTransaction({
      description: description.trim(),
      amount: parseFloat(amount),
      category: category as Category,
      type,
      date,
    });

    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-md bg-card rounded-xl shadow-lg border border-border overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 id="modal-title" className="text-lg font-semibold text-foreground">
            Add Transaction
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Toggle */}
          <div>
            <label className={labelClasses}>Type</label>
            <div className="flex gap-2">
              {(['expense', 'income'] as TransactionType[]).map((t) => (
                <motion.button
                  key={t}
                  type="button"
                  onClick={() => {
                    setType(t);
                    setCategory('');
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors border',
                    type === t
                      ? t === 'income'
                        ? 'bg-success text-success-foreground border-success'
                        : 'bg-danger text-danger-foreground border-danger'
                      : 'bg-surface border-border text-muted hover:text-foreground hover:border-border-hover'
                  )}
                  aria-pressed={type === t}
                >
                  {t}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClasses}>
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className={cn(inputClasses, errors.description && 'border-danger focus:ring-danger')}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? 'description-error' : undefined}
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-xs text-danger">
                {errors.description}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className={labelClasses}>
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={cn(inputClasses, 'pl-7', errors.amount && 'border-danger focus:ring-danger')}
                aria-invalid={!!errors.amount}
                aria-describedby={errors.amount ? 'amount-error' : undefined}
              />
            </div>
            {errors.amount && (
              <p id="amount-error" className="mt-1 text-xs text-danger">
                {errors.amount}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={labelClasses}>
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={cn(inputClasses, 'cursor-pointer', errors.category && 'border-danger focus:ring-danger')}
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? 'category-error' : undefined}
            >
              <option value="">Select a category</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p id="category-error" className="mt-1 text-xs text-danger">
                {errors.category}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className={labelClasses}>
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={cn(inputClasses, 'cursor-pointer', errors.date && 'border-danger focus:ring-danger')}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? 'date-error' : undefined}
            />
            {errors.date && (
              <p id="date-error" className="mt-1 text-xs text-danger">
                {errors.date}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-muted bg-surface border border-border hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
