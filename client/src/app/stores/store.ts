import { createContext, useContext } from "react";
import CatalogStore from "./catalogStore";
import FilterStore from "./filterStore";
import ProgramStore from "./programStore";

interface Store {
  catalogStore: CatalogStore;
  filterStore: FilterStore;
  programStore: ProgramStore;
}

export const store: Store = {
  catalogStore: new CatalogStore(),
  filterStore: new FilterStore(),
  programStore: new ProgramStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
