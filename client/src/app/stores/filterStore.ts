import { makeAutoObservable } from "mobx";
import { store } from "./store";

export default class FilterStore {
  selectedDate?: Date;
  selectedVillages: string[] = [];
  selectedStages: string[] = [];
  searchText?: string;

  constructor() {
    makeAutoObservable(this);
  }

  selectDate = (dateString?: string) => {
    this.selectedDate = dateString ? new Date(Date.parse(dateString)) : undefined;
    console.log(this.selectedDate);
  };

  selectVillageToggle = (id: string) => {
    if (!this.villageIsSelected(id)) {
      this.selectedVillages = [...this.selectedVillages, id];
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
}
