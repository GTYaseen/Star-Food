import {create} from "zustand";

const useStore = create((set) => ({
  cart: [],
  setCart: (newCart) => set({ cart: newCart }),
  isAdded: false,
  setIsAdded: (newIsAdded) => set({ isAdded: newIsAdded }),
}));

export default useStore;