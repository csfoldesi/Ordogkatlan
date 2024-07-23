import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginatedResult } from "../models/pagination";
import { Catalog } from "../models/catalog";
import { ProgramDTO } from "../models/program";
import { RegisterDTO } from "../models/register";
import { UserDTO } from "../models/user";
import { store } from "../stores/store";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep(1000);
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

const Catalogs = {
  load: () => requests.get<Catalog>("/program/catalog"),
};

const Programs = {
  list: (params: URLSearchParams) =>
    axios.get<PaginatedResult<ProgramDTO[]>>("/program", { params }).then(responseBody),
  select: (id: string) => axios.post<void>(`/program/${id}/select`),
  my: (params: URLSearchParams) =>
    axios.get<PaginatedResult<ProgramDTO[]>>("/program/my", { params }).then(responseBody),
};

const Account = {
  register: (data: RegisterDTO) => requests.post<void>("/account/register", data),
  login: (token: string) => requests.get<UserDTO>("/account/" + token),
  current: () => requests.get<UserDTO>("/account"),
};

const agent = {
  Catalogs,
  Programs,
  Account,
};

export default agent;
