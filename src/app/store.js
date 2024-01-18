import { create } from 'zustand';

const useStore = create((set) => ({
  Favorite: [],
  cart: [],
  setCart: (newCart) => set({ cart: newCart }),
  setFavorite: (data) => set({ Favorite: data }),
}));

export default useStore;