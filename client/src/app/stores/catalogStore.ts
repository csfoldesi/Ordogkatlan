import { makeAutoObservable, runInAction } from "mobx";
import { Catalog } from "../models/catalog";
import agent from "../api/agent";
import { format } from "date-fns";
import { Stage } from "../models/stage";

interface DateSelectorSource {
  key: string;
  value: string;
  text: string;
}

export default class CatalogStore {
  catalog?: Catalog;
  dateSource?: DateSelectorSource[];

  constructor() {
    makeAutoObservable(this);
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
        } as DateSelectorSource;
      }),
    ];
  };

  getStagesByVillageId = (id: string): Stage[] | undefined => this.catalog?.stages.filter((s) => s.village.id === id);

  getStagesByVillageIdList = (idList: string[]): Stage[] | undefined =>
    this.catalog?.stages.filter((s) => idList.indexOf(s.village.id) >= 0);
}
