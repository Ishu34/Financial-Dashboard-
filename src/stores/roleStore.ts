import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RoleStore, Role } from '@/types';

export const useRoleStore = create<RoleStore>()(
  persist(
    (set) => ({
      role: 'admin',
      setRole: (role: Role) => set({ role }),
    }),
    { name: 'financial-dashboard-role' }
  )
);
