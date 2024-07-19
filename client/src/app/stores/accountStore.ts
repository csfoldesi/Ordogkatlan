import { makeAutoObservable, runInAction } from "mobx";
import { RegisterDTO } from "../models/register";
import agent from "../api/agent";
import { FormStatus } from "../common/enum";
import { UserDTO } from "../models/user";
import { store } from "./store";

export default class AccountStore {
  isLoading = false;
  formStatus = FormStatus.Default;
  user: UserDTO | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  resetStatus = () => {
    this.formStatus = FormStatus.Default;
  };

  register = async (data: RegisterDTO) => {
    this.formStatus = FormStatus.Loading;
    try {
      await agent.Account.register(data);
      runInAction(() => {
        this.formStatus = FormStatus.Success;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.formStatus = FormStatus.Error;
      });
    }
  };

  login = async (token: string) => {
    this.formStatus = FormStatus.Loading;
    try {
      const user = await agent.Account.login(token);
      runInAction(() => {
        this.user = user;
        this.formStatus = FormStatus.Success;
        store.commonStore.setToken(user.token);
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.formStatus = FormStatus.Error;
      });
    }
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.error(error);
      runInAction(() => {
        store.commonStore.setToken(null);
        this.user = undefined;
      });
    }
  };
}
