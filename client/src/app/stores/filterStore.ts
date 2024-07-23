import { makeAutoObservable } from "mobx";
import { store } from "./store";
import { format } from "date-fns";

export default class FilterStore {
  selectedDate?: Date;
  selectedVillages: string[] = [];
  selectedStages: string[] = [];
  searchText?: string;

  constructor() {
    makeAutoObservable(this);
  }

  get selectedDateString(): string {
    return this.selectedDate ? format(this.selectedDate!, "yyyy-MM-dd") : "";
  }

  selectDate = (dateString?: string) => {
    this.selectedDate = dateString ? new Date(Date.parse(dateString)) : undefined;
  };

  selectVillageToggle = (id: string) => {
    if (!this.villageIsSelected(id)) {
      this.selectedVillages = [...this.selectedVillages, id];
      /*if (stagesOfVillage) {
        this.selectedStages = [...this.selectedStages, ...stagesOfVillage!.map((x) => x.id)];
      }*/
    } else {
      this.selectedVillages = this.selectedVillages.filter((x) => x !== id);
      const stagesOfVillage = store.catalogStore.getStagesByVillageId(id);
      if (stagesOfVillage) {
        this.selectedStages = this.selectedStages.filter((x) => !stagesOfVillage.find((s) => s.id === x));
      }
    }
  };

  villageIsSelected = (id: string) => this.selectedVillages.indexOf(id) >= 0;

  selectStageToggle = (id: string) => {
    if (!this.stageIsSelected(id)) {
      this.selectedStages = [...this.selectedStages, id];
    } else {
      this.selectedStages = this.selectedStages.filter((x) => x !== id);
    }
  };

  stageIsSelected = (id: string) => this.selectedStages.indexOf(id) >= 0;

  setSelectedVillages = (villages: string[]) => {
    this.selectedVillages = villages;
    const stagesOfVillages = store.catalogStore.catalog?.stages
      .filter((s) => this.selectedVillages.includes(s.village.id))
      .map((s) => s.id);
    this.selectedStages = this.selectedStages.filter((s) => stagesOfVillages?.includes(s));
  };

  setSelectedStages = (stages: string[]) => {
    this.selectedStages = stages;
  };

  setSearchText = (searchText: string) => {
    this.searchText = searchText;
  };
}
