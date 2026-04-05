import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  type LucideIcon,
} from 'lucide-react';
import type { SummaryCard as SummaryCardType } from '@/types';
import { cn } from '@/lib/utils';

// Magic UI Components
import { MagicCard } from '@/components/magicui/magic-card';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BorderBeam } from '@/components/magicui/border-beam';

interface SummaryCardProps {
  card: SummaryCardType;
}

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
};

// Parse numeric value from formatted string like "$24,523.50" or "-$3,200.00"
function parseFormattedValue(formatted: string): { value: number; isNegative: boolean } {
  const isNegative = formatted.includes('-');
  // Remove $, commas, and minus sign to get the raw number
  const cleaned = formatted.replace(/[$,\-]/g, '');
  const value = parseFloat(cleaned) || 0;
  return { value, isNegative };
}

export function SummaryCard({ card }: SummaryCardProps) {
  const IconComponent = iconMap[card.icon] ?? Wallet;
  const { value: numericValue, isNegative } = parseFormattedValue(card.formattedValue);

  const getTrendIcon = () => {
    switch (card.trend.direction) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (card.trend.direction) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-danger';
      default:
        return 'text-muted';
    }
  };

  return (
    <div className="group relative">
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <MagicCard
          className="p-5 cursor-default hover:shadow-glow-primary transition-shadow"
          gradientColor="rgba(59, 130, 246, 0.06)"
          gradientSize={250}
        >
          <div className="flex items-start justify-between gap-4">
            {/* Icon with glow effect */}
            <div className={cn(
              'p-3 rounded-xl relative',
              card.iconBg,
              'after:absolute after:inset-0 after:rounded-xl after:bg-current after:opacity-0 after:blur-xl after:transition-opacity group-hover:after:opacity-20'
            )}>
              <IconComponent className="h-6 w-6 text-foreground relative z-10" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 text-right">
              <p className="text-sm text-muted font-medium truncate">{card.title}</p>
              <div className={cn('text-2xl font-bold font-mono mt-1', card.valueColor)}>
                {isNegative ? '-' : ''}$<NumberTicker value={numericValue} decimalPlaces={2} />
              </div>

              {/* Trend Indicator */}
              <div className={cn('flex items-center justify-end gap-1 mt-2', getTrendColor())}>
                {getTrendIcon()}
                <span className="text-sm font-medium tabular-nums">
                  {card.trend.value > 0 ? `${card.trend.value.toFixed(1)}%` : '—'}
                </span>
                <span className="text-xs text-muted-foreground ml-1">{card.trend.label}</span>
              </div>
            </div>
          </div>

          {/* BorderBeam on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <BorderBeam size={60} duration={4} colorFrom="#3B82F6" colorTo="#60A5FA" />
          </div>
        </MagicCard>
      </motion.div>
    </div>
  );
}

export default SummaryCard;
