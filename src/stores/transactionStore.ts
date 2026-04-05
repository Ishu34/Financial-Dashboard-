import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TransactionStore } from '@/types';
import { mockTransactions } from '@/data';

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      isLoading: false,

      loadTransactions: async () => {
        set({ isLoading: true });
        // Simulate async load with 300-800ms delay
        const delay = 300 + Math.random() * 500;
        await new Promise(resolve => setTimeout(resolve, delay));
        const current = get().transactions;
        // Only load mock data if store is empty (first load)
        if (current.length === 0) {
          set({ transactions: mockTransactions, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      },

      addTransaction: (transaction) => {
        const newTransaction = {
          ...transaction,
          id: crypto.randomUUID(),
        };
        set(state => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      updateTransaction: (id, updates) => {
        set(state => ({
          transactions: state.transactions.map(t =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },

      deleteTransaction: (id) => {
        set(state => ({
          transactions: state.transactions.filter(t => t.id !== id),
        }));
      },
    }),
    {
      name: 'financial-dashboard-transactions',
      // Only persist transactions, not loading state
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);
