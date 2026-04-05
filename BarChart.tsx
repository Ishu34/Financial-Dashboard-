import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { MonthlyChartData } from '@/types';
import { formatCurrency } from '@/utils';

interface BarChartComponentProps {
  data: MonthlyChartData[];
}

interface TooltipPayload {
  value: number;
  name: string;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const income = payload.find(p => p.name === 'Income')?.value ?? 0;
  const expenses = payload.find(p => p.name === 'Expenses')?.value ?? 0;
  const balance = income - expenses;

  return (
    <div className="bg-card border border-border shadow-lg rounded-lg p-3 min-w-[160px]">
      <p className="text-sm font-semibold text-card-foreground mb-2">{label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-success" />
            <span className="text-xs text-muted">Income</span>
          </div>
          <span className="text-sm font-medium text-success tabular-nums">
            {formatCurrency(income)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-danger" />
            <span className="text-xs text-muted">Expenses</span>
          </div>
          <span className="text-sm font-medium text-danger tabular-nums">
            {formatCurrency(expenses)}
          </span>
        </div>
        <div className="border-t border-border pt-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted">Net</span>
            <span
              className={`text-sm font-bold tabular-nums ${
                balance >= 0 ? 'text-success' : 'text-danger'
              }`}
            >
              {formatCurrency(balance)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BarChartComponent({ data }: BarChartComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={8}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E2E8F0"
            strokeOpacity={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
          <Legend
            wrapperStyle={{ paddingTop: 20 }}
            formatter={(value: string) => (
              <span className="text-sm text-card-foreground">{value}</span>
            )}
          />
          <Bar
            dataKey="income"
            name="Income"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default BarChartComponent;
