import { makeAutoObservable, runInAction } from "mobx";
import { Catalog } from "../models/catalog";
import agent from "../api/agent";
import { format } from "date-fns";
import { Stage } from "../models/stage";
import { SelectOption } from "../models/selectOption";
import { store } from "./store";

export default class CatalogStore {
  catalog?: Catalog;
  dateSource?: SelectOption[];

  constructor() {
    makeAutoObservable(this);
  }

  get villages(): SelectOption[] | undefined {
    return this.catalog?.villages.map((village) => {
      return { key: village.id, text: village.name, value: village.id } as SelectOption;
    });
  }

  get filteredStages(): SelectOption[] | undefined {
    const selectedVillages = store.filterStore.selectedVillages;
    const stages = this.catalog?.stages.filter((s) => selectedVillages.indexOf(s.village.id) >= 0);
    return stages?.map((stage) => {
      return { key: stage.id, text: stage.name, value: stage.id } as SelectOption;
    });
  }

  loadCatalogs = async () => {
    try {
      const result = await agent.Catalogs.load();
      runInAction(() => {
        this.catalog = result;
        this.fillDateSource(result.dates);
      });
    } catch (error) {
      console.error(error);
    }
  };

  fillDateSource = (dates: Date[]) => {
    this.dateSource = [
      ...[{ key: "", value: "", text: "" }],
      ...dates.map((date) => {
        return {
          key: format(date, "yyyy-MM-dd"),
          value: format(date, "yyyy-MM-dd"),
          text: format(date, "EEEE (LLL. d.)"),
        } as SelectOption;
      }),
    ];
  };

  getStagesByVillageId = (id: string): Stage[] | undefined => this.catalog?.stages.filter((s) => s.village.id === id);

  getStagesByVillageIdList = (idList: string[]): Stage[] | undefined =>
    this.catalog?.stages.filter((s) => idList.indexOf(s.village.id) >= 0);
}
