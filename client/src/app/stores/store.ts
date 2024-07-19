import { createContext, useContext } from "react";
import CatalogStore from "./catalogStore";
import FilterStore from "./filterStore";
import ProgramStore from "./programStore";
import AccountStore from "./accountStore";
import CommonStore from "./commonStore";

interface Store {
  catalogStore: CatalogStore;
  filterStore: FilterStore;
  programStore: ProgramStore;
  accoutStore: AccountStore;
  commonStore: CommonStore;
}

export const store: Store = {
  catalogStore: new CatalogStore(),
  filterStore: new FilterStore(),
  programStore: new ProgramStore(),
  accoutStore: new AccountStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
