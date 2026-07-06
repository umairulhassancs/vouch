'use client';
import { useAuthStore } from '@/store';
import { logout as firebaseLogout } from '@/lib/firebase/auth';

export function useAuth() {
  const { user, isLoading, isAuthenticated, setUser, logout: storeLogout } = useAuthStore();

  const logout = async () => {
    try {
      await firebaseLogout();
    } catch (err) {
      console.error('Firebase auth sign out failed:', err);
    }
    storeLogout();
  };

  return { user, isLoading, isAuthenticated, setUser, logout };
}
