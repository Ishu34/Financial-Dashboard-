import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Target, Lightbulb, BarChart3, Wallet, ArrowUpRight } from 'lucide-react';
import { useTransactionStore, useInsightsStore } from '@/stores';
import { calculateCategoryData } from '@/utils/calculations';
import { formatPercentage } from '@/utils/formatters';
import { InsightCard, InsightsSkeleton } from '@/components/ui';
import { SpendingBreakdown } from '@/components/ui/SpendingBreakdown';
import { FinancialHealthCard } from '@/components/ui/FinancialHealthCard';
import { MonthlyComparisonCard } from '@/components/ui/MonthlyComparisonCard';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { Marquee } from '@/components/magicui/marquee';
import { Particles } from '@/components/magicui/particles';
import { BlurFade } from '@/components/magicui/blur-fade';
import { MagicCard } from '@/components/magicui/magic-card';
import { NumberTicker } from '@/components/magicui/number-ticker';

export function InsightsPage() {
  const { transactions, isLoading: transactionsLoading, loadTransactions } = useTransactionStore();
  const insights = useInsightsStore();
  const computeInsights = useInsightsStore((s) => s.computeInsights);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    if (transactions.length > 0) {
      computeInsights(transactions);
    }
  }, [transactions, computeInsights]);

  const categoryData = calculateCategoryData(transactions);
  const isLoading = transactionsLoading || insights.isLoading;

  if (isLoading && transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <InsightsSkeleton />
      </motion.div>
    );
  }

  const hasNoData = transactions.length === 0;

  // Marquee insight items
  const insightItems = [
    {
      icon: TrendingUp,
      label: `Savings rate: ${insights.savingsRate.toFixed(1)}%`,
      bgClass: 'bg-primary-subtle',
      textClass: 'text-primary',
    },
    {
      icon: BarChart3,
      label: `Top category: ${insights.highestSpendingCategory ?? 'N/A'}`,
      bgClass: 'bg-success-subtle',
      textClass: 'text-success',
    },
    {
      icon: Wallet,
      label: `Monthly change: ${formatPercentage(insights.monthlyComparison.percentageChange)}`,
      bgClass: 'bg-warning-subtle',
      textClass: 'text-warning',
    },
    {
      icon: ArrowUpRight,
      label: insights.savingsRate > 20 ? 'Healthy financial status' : 'Room for improvement',
      bgClass: 'bg-info-subtle',
      textClass: 'text-info',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header with TypingAnimation */}
      <BlurFade delay={0} inView>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financial Insights</h1>
          <TypingAnimation
            text="Analysis based on your transaction data"
            duration={30}
            className="text-sm text-muted mt-1"
          />
        </div>
      </BlurFade>

      {hasNoData ? (
        <BlurFade delay={0.1} inView>
          <div className="relative">
            <Particles
              className="absolute inset-0 -z-10"
              quantity={30}
              ease={80}
              color="#3B82F6"
              staticity={50}
              size={0.4}
            />
            <MagicCard className="glass-card p-8 text-center">
              <PieChart className="w-12 h-12 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No Data Yet</h3>
              <p className="text-sm text-muted max-w-md mx-auto">
                Start adding transactions to see personalized financial insights and spending analysis.
              </p>
            </MagicCard>
          </div>
        </BlurFade>
      ) : (
        <>
          {/* Marquee Alert Strip */}
          <BlurFade delay={0.1} inView>
            <div className="overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <Marquee pauseOnHover className="py-3 [--duration:30s]">
                {insightItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-full ${item.bgClass} ${item.textClass} text-sm font-medium`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                ))}
              </Marquee>
            </div>
          </BlurFade>

          {/* Row 1: Key Metrics with NumberTicker */}
          <BlurFade delay={0.2} inView>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MagicCard className="glass-card">
                <InsightCard
                  icon={PieChart}
                  iconBg="bg-danger-subtle"
                  iconColor="text-danger"
                  title="Highest Spending"
                  value={insights.highestSpendingCategory ?? 'N/A'}
                  description="Your top expense category this period"
                />
              </MagicCard>
              <MagicCard className="glass-card">
                <InsightCard
                  icon={TrendingUp}
                  iconBg="bg-primary-subtle"
                  iconColor="text-primary"
                  title="Monthly Change"
                  value={formatPercentage(insights.monthlyComparison.percentageChange)}
                  description="Spending change vs last month"
                  trend={{
                    value: insights.monthlyComparison.percentageChange,
                    direction:
                      insights.monthlyComparison.percentageChange > 0
                        ? 'up'
                        : insights.monthlyComparison.percentageChange < 0
                        ? 'down'
                        : 'neutral',
                  }}
                />
              </MagicCard>
              <MagicCard className="glass-card">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-success-subtle">
                      <Target className="w-5 h-5 text-success" />
                    </div>
                    <h3 className="text-sm font-medium text-muted">Savings Rate</h3>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <NumberTicker
                      value={Math.abs(insights.savingsRate)}
                      decimalPlaces={1}
                      className="text-2xl font-bold text-card-foreground"
                    />
                    <span className="text-2xl font-bold text-card-foreground">%</span>
                  </div>
                  <p className="text-xs text-muted mt-2">
                    {insights.savingsRate > 20 ? 'Healthy savings!' : 'Room for improvement'}
                  </p>
                </div>
              </MagicCard>
            </div>
          </BlurFade>

          {/* Row 2: Breakdown + Health */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <BlurFade delay={0.3} inView className="lg:col-span-3">
              <MagicCard className="glass-card p-5 h-full">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  Spending Breakdown
                </h3>
                <SpendingBreakdown data={categoryData} />
              </MagicCard>
            </BlurFade>
            <BlurFade delay={0.4} inView className="lg:col-span-2">
              <MagicCard className="glass-card h-full">
                <FinancialHealthCard
                  savingsRate={insights.savingsRate}
                  tip={insights.financialHealthTip}
                />
              </MagicCard>
            </BlurFade>
          </div>

          {/* Row 3: Monthly Comparison */}
          <BlurFade delay={0.5} inView>
            <MagicCard className="glass-card">
              <MonthlyComparisonCard comparison={insights.monthlyComparison} />
            </MagicCard>
          </BlurFade>
        </>
      )}
    </div>
  );
}

export default InsightsPage;
