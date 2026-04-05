import { motion } from 'framer-motion';
import {
  Circle,
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  FileText,
  Film,
  Heart,
  GraduationCap,
  MoreHorizontal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CategoryChartData } from '@/types';
import { getCategoryMeta } from '@/data/categories';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  FileText,
  Film,
  Heart,
  GraduationCap,
  MoreHorizontal,
  Circle,
};

interface SpendingBreakdownProps {
  data: CategoryChartData[];
  className?: string;
}

export function SpendingBreakdown({ data, className }: SpendingBreakdownProps) {
  if (data.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-muted">No expense data available</p>
      </div>
    );
  }

  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <div className={cn('space-y-4', className)}>
      {data.map((item, index) => {
        const meta = getCategoryMeta(item.category);
        const IconComponent = iconMap[meta.icon] || Circle;
        const widthPercentage = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;

        return (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <IconComponent
                    className="w-4 h-4"
                    style={{ color: item.color }}
                  />
                </div>
                <span className="text-sm font-medium text-card-foreground">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-card-foreground tabular-nums">
                  {formatCurrency(item.amount)}
                </span>
                <span className="text-xs text-muted tabular-nums w-12 text-right">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="h-3 bg-surface rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${widthPercentage}%` }}
                transition={{
                  delay: index * 0.08 + 0.1,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="h-full rounded-full transition-all group-hover:opacity-80"
                style={{ backgroundColor: item.color }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
