import { create } from 'zustand';

const useStore = create((set) => ({
  Favorite: [],
  cart: [],
  user: null,
  setUser: (data) => set({ user: data }),
  setCart: (newCart) => set({ cart: newCart }),
  setFavorite: (data) => set({ Favorite: data }),
}));

export default useStore;