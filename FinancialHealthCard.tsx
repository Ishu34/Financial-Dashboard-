import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinancialHealthCardProps {
  savingsRate: number;
  tip: string;
  className?: string;
}

type HealthStatus = 'excellent' | 'good' | 'moderate' | 'poor';

function getHealthStatus(savingsRate: number): HealthStatus {
  if (savingsRate > 30) return 'excellent';
  if (savingsRate > 20) return 'good';
  if (savingsRate > 0) return 'moderate';
  return 'poor';
}

function getHealthConfig(status: HealthStatus) {
  switch (status) {
    case 'excellent':
      return {
        label: 'Excellent',
        color: 'text-success',
        bgGradient: 'from-success-subtle to-success-subtle/50',
        icon: CheckCircle,
        iconBg: 'bg-success-subtle',
        gaugeColor: 'bg-success',
        progressBg: 'bg-success/20',
      };
    case 'good':
      return {
        label: 'Good',
        color: 'text-success',
        bgGradient: 'from-success-subtle/80 to-primary-subtle/50',
        icon: TrendingUp,
        iconBg: 'bg-success-subtle',
        gaugeColor: 'bg-success',
        progressBg: 'bg-success/20',
      };
    case 'moderate':
      return {
        label: 'Moderate',
        color: 'text-warning',
        bgGradient: 'from-warning-subtle to-warning-subtle/50',
        icon: Lightbulb,
        iconBg: 'bg-warning-subtle',
        gaugeColor: 'bg-warning',
        progressBg: 'bg-warning/20',
      };
    case 'poor':
      return {
        label: 'Needs Attention',
        color: 'text-danger',
        bgGradient: 'from-danger-subtle to-danger-subtle/50',
        icon: AlertTriangle,
        iconBg: 'bg-danger-subtle',
        gaugeColor: 'bg-danger',
        progressBg: 'bg-danger/20',
      };
  }
}

export function FinancialHealthCard({ savingsRate, tip, className }: FinancialHealthCardProps) {
  const status = getHealthStatus(savingsRate);
  const config = getHealthConfig(status);
  const Icon = config.icon;
  
  const normalizedRate = Math.min(Math.max(savingsRate, 0), 50);
  const gaugePercentage = (normalizedRate / 50) * 100;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'bg-card rounded-xl shadow-card overflow-hidden h-full',
        className
      )}
    >
      <div className={cn('bg-gradient-to-br p-5', config.bgGradient)}>
        <div className="flex items-center gap-3 mb-4">
          <div className={cn('p-2.5 rounded-full', config.iconBg)}>
            <Icon className={cn('w-5 h-5', config.color)} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Financial Health</h3>
            <p className={cn('text-sm font-medium', config.color)}>{config.label}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm text-muted">Savings Rate</span>
            <span className={cn('text-2xl font-bold tabular-nums', config.color)}>
              {savingsRate.toFixed(1)}%
            </span>
          </div>
          <div className={cn('h-3 rounded-full overflow-hidden', config.progressBg)}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${gaugePercentage}%` }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className={cn('h-full rounded-full', config.gaugeColor)}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
            <span>0%</span>
            <span>25%</span>
            <span>50%+</span>
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-border">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-card-foreground mb-1">Financial Tip</p>
            <p className="text-sm text-muted leading-relaxed">
              {tip || 'Start tracking your expenses to receive personalized tips.'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
