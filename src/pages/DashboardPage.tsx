import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactionStore, useInsightsStore } from '@/stores';
import { calculateSummaryCards, calculateMonthlyData, calculateCategoryData } from '@/utils';
import { SummaryCard, DashboardSkeleton } from '@/components/ui';
import { AreaChartComponent, DonutChart, BarChartComponent } from '@/components/charts';

// Magic UI Components
import { WordRotate } from '@/components/magicui/word-rotate';
import { MagicCard } from '@/components/magicui/magic-card';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';

export function DashboardPage() {
  const { transactions, isLoading, loadTransactions } = useTransactionStore();
  const { computeInsights } = useInsightsStore();

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    if (transactions.length > 0) {
      computeInsights(transactions);
    }
  }, [transactions, computeInsights]);

  const summaryCards = calculateSummaryCards(transactions);
  const monthlyData = calculateMonthlyData(transactions);
  const categoryData = calculateCategoryData(transactions);

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
          <DashboardSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Greeting Section with WordRotate */}
          <BlurFade delay={0} inView>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-bold text-foreground">Your finances are</h1>
                <WordRotate
                  words={['thriving', 'growing', 'healthy', 'strong']}
                  className="text-2xl font-bold text-primary"
                />
              </div>
              <p className="text-sm text-muted mt-1">Here&apos;s your financial overview</p>
            </div>
          </BlurFade>

          {/* Summary Cards with BlurFade stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {summaryCards.map((card, i) => (
              <BlurFade key={card.id} delay={0.1 + i * 0.1} inView>
                <SummaryCard card={card} />
              </BlurFade>
            ))}
          </div>

          {/* Charts Section with AnimatedGridPattern background */}
          <div className="relative">
            {/* Animated Grid Pattern Background */}
            <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.08}
              duration={3}
              className={cn(
                'absolute inset-0 -z-10',
                '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]'
              )}
            />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BlurFade delay={0.5} inView>
                <MagicCard className="p-5" gradientColor="rgba(59, 130, 246, 0.08)">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Income vs Expenses
                  </h3>
                  <AreaChartComponent data={monthlyData} />
                </MagicCard>
              </BlurFade>

              <BlurFade delay={0.6} inView>
                <MagicCard className="p-5" gradientColor="rgba(139, 92, 246, 0.08)">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Spending by Category
                  </h3>
                  <DonutChart data={categoryData} />
                </MagicCard>
              </BlurFade>
            </div>

            {/* Bar Chart - Full Width */}
            <BlurFade delay={0.7} inView>
              <MagicCard className="p-5 mt-6" gradientColor="rgba(34, 197, 94, 0.08)">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Monthly Comparison
                </h3>
                <BarChartComponent data={monthlyData} />
              </MagicCard>
            </BlurFade>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DashboardPage;
