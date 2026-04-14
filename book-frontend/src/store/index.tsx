import React, { createContext, useContext } from "react";
import { authStore } from "./AuthStore";

interface StoreContextType {
  authStore: typeof authStore;
}

export const store = {
  authStore,
};

export const StoreContext = createContext<StoreContextType>(store);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  return useContext(StoreContext);
};
