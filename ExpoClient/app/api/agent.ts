import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginatedResult } from "../models/pagination";
import { ProgramDTO } from "../models/program";

axios.defaults.baseURL = "http://192.168.0.31:5143/api";

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(response.data, JSON.parse(pagination));
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config }: { data: any; status: number; config: any } = error.response!;
    /*switch (status) {
        case 400:
          if (typeof data === "string") {
            toast.error(data);
          } else if (config.method === "get" && data.errors.hasOwnProperty("id")) {
            router.navigate("/not-found");
          } else if (data.errors) {
            const modalStateErrors = [];
            for (const key in data.errors) {
              if (data.errors[key]) {
                modalStateErrors.push(data.errors[key]);
              }
            }
            throw modalStateErrors.flat();
          }
          break;
        case 401:
          toast.error("unathorized");
          break;
        case 404:
          router.navigate("/not-found");
          break;
        case 500:
          store.commonStore.setServerError(data);
          router.navigate("/server-error");
          break;
      }*/
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Program = {
  list: (params: URLSearchParams) =>
    axios.get<PaginatedResult<ProgramDTO[]>>("/program", { params }).then(responseBody),
};

const agent = {
  Program,
};

export default agent;
