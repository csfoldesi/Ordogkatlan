import { makeAutoObservable, runInAction } from "mobx";
import { ProgramDTO } from "../models/program";
import { Pagination, PagingParams } from "../models/pagination";
import { store } from "./store";
import agent from "../api/agent";

export default class ProgramStore {
  programList: ProgramDTO[] = [];
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();

  constructor() {
    makeAutoObservable(this);
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    store.filterStore.selectedVillages.forEach((villageID) => {
      params.append("village", villageID);
    });
    store.filterStore.selectedStages.forEach((stageID) => {
      params.append("stage", stageID);
    });
    if (store.filterStore.selectedDate) {
      params.append("date", store.filterStore.selectedDate!.toISOString());
    }
    return params;
  }

  loadPrograms = async () => {
    try {
      const result = await agent.Programs.list(this.axiosParams);
      runInAction(() => {
        this.programList = result.data;
      });
    } catch (error) {
      console.error(error);
    }
  };
}
