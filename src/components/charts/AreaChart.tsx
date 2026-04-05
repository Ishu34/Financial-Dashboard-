import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { MonthlyChartData } from '@/types';
import { formatCurrency } from '@/utils';

interface AreaChartComponentProps {
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
          <span className="text-xs text-muted">Income</span>
          <span className="text-sm font-medium text-success tabular-nums">
            {formatCurrency(income)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted">Expenses</span>
          <span className="text-sm font-medium text-danger tabular-nums">
            {formatCurrency(expenses)}
          </span>
        </div>
        <div className="border-t border-border pt-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted">Balance</span>
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

export function AreaChartComponent({ data }: AreaChartComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 20 }}
            formatter={(value: string) => (
              <span className="text-sm text-card-foreground">{value}</span>
            )}
          />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#10B981"
            strokeWidth={2}
            fill="url(#incomeGradient)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#EF4444"
            strokeWidth={2}
            fill="url(#expenseGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default AreaChartComponent;
