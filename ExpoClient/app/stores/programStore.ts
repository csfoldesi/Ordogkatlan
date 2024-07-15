import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import { ProgramDTO } from "../models/program";
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
    return params;
  }

  loadPrograms = async () => {
    try {
      const result = await agent.Program.list(this.axiosParams);
      runInAction(() => {
        this.programList = result.data;
      });
    } catch (error) {
      console.error(error);
    }
  };
}
