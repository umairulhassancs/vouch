import { create } from 'zustand';

const VENDOR_SESSION_KEY = 'vouch_vendor_auth';

interface VendorState {
  isVendorAuth: boolean;
  isInitialized: boolean; // prevents redirect before sessionStorage is read
  vendorEmail: string | null;
  setVendorAuth: (email: string) => void;
  vendorLogout: () => void;
  initFromStorage: () => void;
}

export const useVendorStore = create<VendorState>((set) => ({
  isVendorAuth: false,
  isInitialized: false,
  vendorEmail: null,

  initFromStorage: () => {
    if (typeof window === 'undefined') return;
    try {
      const stored = sessionStorage.getItem(VENDOR_SESSION_KEY);
      if (stored) {
        const { email } = JSON.parse(stored);
        set({ isVendorAuth: true, vendorEmail: email, isInitialized: true });
      } else {
        set({ isVendorAuth: false, vendorEmail: null, isInitialized: true });
      }
    } catch {
      set({ isVendorAuth: false, vendorEmail: null, isInitialized: true });
    }
  },

  setVendorAuth: (email: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(VENDOR_SESSION_KEY, JSON.stringify({ email }));
    }
    set({ isVendorAuth: true, vendorEmail: email, isInitialized: true });
  },

  vendorLogout: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(VENDOR_SESSION_KEY);
    }
    set({ isVendorAuth: false, vendorEmail: null, isInitialized: true });
  },
}));
