import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  value: string;
  description: string;
  trend?: { value: number; direction: 'up' | 'down' | 'neutral' };
  className?: string;
}

export function InsightCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
  description,
  trend,
  className,
}: InsightCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    switch (trend.direction) {
      case 'up':
        return 'text-danger';
      case 'down':
        return 'text-success';
      default:
        return 'text-muted';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'bg-card rounded-xl shadow-card p-5 hover:shadow-card-hover transition-shadow',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('p-3 rounded-full', iconBg)}>
          <Icon className={cn('w-5 h-5', iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted font-medium">{title}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-card-foreground tabular-nums">
              {value}
            </span>
            {trend && (
              <span className={cn('flex items-center text-sm font-medium', getTrendColor())}>
                {getTrendIcon()}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
