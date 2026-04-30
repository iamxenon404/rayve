import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string; // Add this
  // size: string;  // Add this while you're at it
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addItem: (item) => set((state) => {
        const existingItem = state.cart.find((i) => i.id === item.id && i.size === item.size);
        if (existingItem) {
          return {
            cart: state.cart.map((i) => 
              i.id === item.id && i.size === item.size 
              ? { ...i, quantity: i.quantity + 1 } 
              : i
            )
          };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({
        cart: state.cart.filter((i) => i.id !== id)
      })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'rayve-cart-storage' } // This saves the cart in the browser's LocalStorage
  )
);