import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeStore, Theme } from '@/types';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',

      toggleTheme: () =>
        set(state => {
          const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
          // Apply to DOM immediately
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        }),

      setTheme: (theme: Theme) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },
    }),
    {
      name: 'financial-dashboard-theme',
      onRehydrateStorage: () => {
        return (state) => {
          // Apply theme from storage on rehydrate
          if (state?.theme === 'dark') {
            document.documentElement.classList.add('dark');
          }
        };
      },
    }
  )
);
