import {create} from "zustand";

const useStore = create((set) => ({
  cart: [],
  setCart: (data) => set({ cart: data }),
}));

export default useStore;
