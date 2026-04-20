import React, { createContext, useContext } from "react";
import { authStore } from "./AuthStore";
import { cartStore } from "./CartStore";

interface StoreContextType {
  authStore: typeof authStore;
  cartStore: typeof cartStore;
}

export const store = {
  authStore,
  cartStore,
};

export const StoreContext = createContext<StoreContextType>(store);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  return useContext(StoreContext);
};
