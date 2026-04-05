import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryChartData } from '@/types';
import { formatCurrency } from '@/utils';

interface DonutChartProps {
  data: CategoryChartData[];
}

interface TooltipPayload {
  payload: CategoryChartData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0].payload;

  return (
    <div className="bg-card border border-border shadow-lg rounded-lg p-3 min-w-[140px]">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-sm font-semibold text-card-foreground">{item.category}</span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted">Amount</span>
          <span className="text-sm font-medium text-card-foreground tabular-nums">
            {formatCurrency(item.amount)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted">Share</span>
          <span className="text-sm font-medium text-card-foreground tabular-nums">
            {item.percentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

interface CustomLegendProps {
  data: CategoryChartData[];
}

function CustomLegend({ data }: CustomLegendProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 px-2">
      {data.slice(0, 6).map((item) => (
        <div key={item.category} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs text-muted truncate">{item.category}</span>
          <span className="text-xs font-medium text-card-foreground tabular-nums ml-auto">
            {item.percentage.toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ data }: DonutChartProps) {
  const totalExpenses = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <div className="h-[280px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="amount"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-muted">Total</p>
            <p className="text-xl font-bold text-card-foreground tabular-nums">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      {/* Custom Legend */}
      <CustomLegend data={data} />
    </motion.div>
  );
}

export default DonutChart;
