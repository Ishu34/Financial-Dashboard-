import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTransactionStore, useFilterStore, useRoleStore } from '@/stores';
import { applyFilters } from '@/utils/filters';
import { FilterBar, TransactionsSkeleton } from '@/components/ui';
import { TransactionTable } from '@/components/ui/TransactionTable';
import { TransactionCard } from '@/components/ui/TransactionCard';
import { AddTransactionModal } from '@/components/ui/AddTransactionModal';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { BlurFade } from '@/components/magicui/blur-fade';
import { MagicCard } from '@/components/magicui/magic-card';

export function TransactionsPage() {
  const { transactions, loadTransactions, isLoading } = useTransactionStore();
  const filters = useFilterStore();
  const { role } = useRoleStore();
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const filteredTransactions = useMemo(
    () => applyFilters(transactions, filters),
    [
      transactions,
      filters.searchQuery,
      filters.typeFilter,
      filters.categoryFilter,
      filters.dateRange,
      filters.sortBy,
      filters.sortOrder,
    ]
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TransactionsSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Header with title + Add button (admin only) */}
          <BlurFade delay={0} inView>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
                <p className="text-sm text-muted">
                  {`${filteredTransactions.length} transactions`}
                </p>
              </div>
              {role === 'admin' && (
                <ShimmerButton
                  onClick={() => setShowAddModal(true)}
                  shimmerColor="#3B82F6"
                  background="linear-gradient(135deg, #3B82F6, #2563EB)"
                  borderRadius="12px"
                  shimmerDuration="2.5s"
                  className="px-4 py-2.5 text-sm font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Add Transaction</span>
                  <span className="sm:hidden">Add</span>
                </ShimmerButton>
              )}
            </div>
          </BlurFade>

          {/* Filter Bar with Glassmorphism */}
          <BlurFade delay={0.1} inView>
            <div className="glass-card rounded-xl p-4 backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-lg">
              <FilterBar />
            </div>
          </BlurFade>

          {/* Table (desktop) / Cards (mobile) with Glass effect */}
          {filteredTransactions.length > 0 && (
            <>
              <BlurFade delay={0.2} inView>
                <div className="hidden md:block">
                  <div className="glass-card rounded-xl overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-lg">
                    <TransactionTable transactions={filteredTransactions} />
                  </div>
                </div>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <div className="md:hidden space-y-3">
                  <AnimatePresence mode="popLayout">
                    {filteredTransactions.map((t) => (
                      <TransactionCard key={t.id} transaction={t} />
                    ))}
                  </AnimatePresence>
                </div>
              </BlurFade>
            </>
          )}

          {/* Empty state with MagicCard */}
          {filteredTransactions.length === 0 && (
            <BlurFade delay={0.2} inView>
              <MagicCard
                className="text-center py-12 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/20 dark:border-white/10"
                gradientColor="rgba(59, 130, 246, 0.1)"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Plus className="w-6 h-6 text-muted" />
                </div>
                <p className="text-foreground text-lg font-medium">No transactions found</p>
                <p className="text-muted text-sm mt-1">
                  {transactions.length === 0
                    ? 'Start by adding your first transaction'
                    : 'Try adjusting your filters'}
                </p>
                {role === 'admin' && transactions.length === 0 && (
                  <div className="mt-4">
                    <ShimmerButton
                      onClick={() => setShowAddModal(true)}
                      shimmerColor="#3B82F6"
                      background="linear-gradient(135deg, #3B82F6, #2563EB)"
                      borderRadius="10px"
                      shimmerDuration="2.5s"
                      className="px-4 py-2 text-sm font-medium"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Transaction
                    </ShimmerButton>
                  </div>
                )}
              </MagicCard>
            </BlurFade>
          )}

          {/* Add Modal */}
          <AnimatePresence>
            {showAddModal && <AddTransactionModal onClose={() => setShowAddModal(false)} />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TransactionsPage;
