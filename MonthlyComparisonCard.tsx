import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus, Calendar } from 'lucide-react';
import type { MonthlyComparison } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/lib/utils';

interface MonthlyComparisonCardProps {
  comparison: MonthlyComparison;
  className?: string;
}

export function MonthlyComparisonCard({ comparison, className }: MonthlyComparisonCardProps) {
  const { currentMonth, previousMonth, percentageChange } = comparison;
  
  const isIncrease = percentageChange > 0;
  const isDecrease = percentageChange < 0;
  const isNeutral = percentageChange === 0;
  
  const getTrendIcon = () => {
    if (isIncrease) return <ArrowUpRight className="w-5 h-5" />;
    if (isDecrease) return <ArrowDownRight className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  const trendColor = isDecrease ? 'text-success' : isIncrease ? 'text-danger' : 'text-muted';
  const trendBg = isDecrease ? 'bg-success-subtle' : isIncrease ? 'bg-danger-subtle' : 'bg-surface';

  const maxValue = Math.max(currentMonth, previousMonth, 1);
  const currentPercentage = (currentMonth / maxValue) * 100;
  const previousPercentage = (previousMonth / maxValue) * 100;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'bg-card rounded-xl shadow-card p-6 hover:shadow-card-hover transition-shadow',
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-primary-subtle">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Monthly Comparison</h3>
            <p className="text-sm text-muted">Spending change vs last month</p>
          </div>
        </div>
        <div className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full', trendBg)}>
          <span className={trendColor}>{getTrendIcon()}</span>
          <span className={cn('text-sm font-semibold tabular-nums', trendColor)}>
            {isNeutral ? '0%' : `${percentageChange > 0 ? '+' : ''}${percentageChange.toFixed(1)}%`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">This Month</span>
            <span className="text-xs text-muted-foreground">Current</span>
          </div>
          <div className="text-3xl font-bold text-card-foreground tabular-nums">
            {formatCurrency(currentMonth)}
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentPercentage}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>

        <div className="space-y-3 border-l border-border pl-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Last Month</span>
            <span className="text-xs text-muted-foreground">Previous</span>
          </div>
          <div className="text-3xl font-bold text-muted tabular-nums">
            {formatCurrency(previousMonth)}
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${previousPercentage}%` }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="h-full rounded-full bg-muted"
            />
          </div>
        </div>
      </div>

      {previousMonth === 0 && currentMonth > 0 && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          No data from last month to compare
        </p>
      )}

      {currentMonth === 0 && previousMonth === 0 && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          No spending data available
        </p>
      )}
    </motion.div>
  );
}
