import { makeAutoObservable, runInAction } from "mobx";
import { ProgramDTO } from "../models/program";
import { Pagination, PagingParams } from "../models/pagination";
import { store } from "./store";
import agent from "../api/agent";

export default class ProgramStore {
  programList: ProgramDTO[] = [];
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  resetPagingParams = () => {
    this.pagingParams = new PagingParams();
  };

  get axiosParamsWithFilters() {
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
    if (store.filterStore.searchText) {
      params.append("searchText", store.filterStore.searchText);
    }
    return params;
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    return params;
  }

  get hasNextPage() {
    return !!this.pagination && this.pagination.currentPage + 1 < this.pagination!.totalPages;
  }

  loadPrograms = async (clearProgramList = false) => {
    try {
      if (clearProgramList) {
        this.setPagingParams(new PagingParams());
        this.programList = [];
      }
      const result = await agent.Programs.list(this.axiosParamsWithFilters);
      runInAction(() => {
        let i = result.pagination.currentPage * result.pagination.itemsPerPage;
        result.data.forEach((program) => {
          this.programList[i] = program;
          i++;
        });
        this.pagination = result.pagination;
      });
    } catch (error) {
      console.error(error);
    }
  };

  loadSelectedPrograms = async (clearProgramList = false) => {
    try {
      if (clearProgramList) {
        this.setPagingParams(new PagingParams());
        this.programList = [];
      }
      const result = await agent.Programs.my(this.axiosParams);
      runInAction(() => {
        let i = result.pagination.currentPage * result.pagination.itemsPerPage;
        result.data.forEach((program) => {
          this.programList[i] = program;
          i++;
        });
        this.pagination = result.pagination;
      });
    } catch (error) {
      console.error(error);
    }
  };

  toggleProgramSelect = async (program: ProgramDTO) => {
    this.isLoading = true;
    try {
      await agent.Programs.select(program.performanceId);
      runInAction(() => {
        program.isSelected = !program.isSelected;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  };
}
