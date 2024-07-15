import { createContext, useContext } from "react";
import ProgramStore from "./programStore";

interface Store {
  programStore: ProgramStore;
}

export const store: Store = {
  programStore: new ProgramStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
