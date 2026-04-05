import { create } from 'zustand';
import type { InsightsStore, Transaction } from '@/types';
import {
  calculateMonthlyComparison,
  getHighestSpendingCategory,
  calculateSavingsRate,
  getFinancialHealthTip,
} from '@/utils/calculations';

export const useInsightsStore = create<InsightsStore>()((set) => ({
  highestSpendingCategory: null,
  monthlyComparison: { currentMonth: 0, previousMonth: 0, percentageChange: 0 },
  savingsRate: 0,
  financialHealthTip: '',
  isLoading: false,

  computeInsights: (transactions: Transaction[]) => {
    set({ isLoading: true });

    // Simulate computation delay for UX
    setTimeout(() => {
      const highestSpendingCategory = getHighestSpendingCategory(transactions);
      const monthlyComparison = calculateMonthlyComparison(transactions);
      const savingsRate = calculateSavingsRate(transactions);
      const financialHealthTip = getFinancialHealthTip(savingsRate, highestSpendingCategory);

      set({
        highestSpendingCategory,
        monthlyComparison,
        savingsRate,
        financialHealthTip,
        isLoading: false,
      });
    }, 300);
  },
}));
