import agent from "../../api/agent";
import { ProgramDTO } from "../../models/program";
import { ListDataSource } from "./listDataSource";

export default class ProgramDataSource implements ListDataSource<ProgramDTO> {
  data: ProgramDTO[] = [];
  hasNextPage = true;

  pageNumber = 0;
  pageSize = 20;

  loadNextPage = async () => {
    this.pageNumber++;
    const result = await agent.Programs.list(this.axiosParams);
    const startIndex = result.pagination.currentPage * result.pagination.itemsPerPage;
    this.data = [...this.data.slice(0, startIndex - 1), ...result.data];
    this.hasNextPage = this.pageNumber < result.pagination.totalPages;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pageNumber.toString());
    params.append("pageSize", this.pageSize.toString());
    return params;
  }
}
