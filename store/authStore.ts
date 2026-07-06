import { create } from 'zustand';
import type { VouchUser } from '@/types';

interface AuthState {
  user: VouchUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: VouchUser | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
}));
