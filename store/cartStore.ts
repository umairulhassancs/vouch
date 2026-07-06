import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types/product';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.slug === product.slug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.slug === product.slug
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              isCartOpen: true,
            };
          }
          return {
            items: [...state.items, { product, quantity }],
            isCartOpen: true,
          };
        });
      },

      removeItem: (slug: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.slug !== slug),
        }));
      },

      updateQuantity: (slug: string, quantity: number) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((i) =>
            i.product.slug === slug ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 2000 ? 0 : 200;
      },
      getTotal: () => get().getSubtotal() + get().getShippingFee(),
    }),
    {
      name: 'vouch-cart',
      // only persist items; UI state like isCartOpen can reset
      partialize: (state) => ({ items: state.items }),
    }
  )
);
