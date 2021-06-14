import { makeAutoObservable } from "mobx";
import {
  postFetch,
  putFetch,
  getData,
  setToken,
} from "../services/apiServices";
import {
  IAuthError,
  IUser,
  IUserAuthData,
  IUserRegData,
  IUserUpdateData,
  UserEndPoints,
} from "../types/user";

type TResponse = { user: IUser };
type THandler = typeof postFetch | typeof putFetch | typeof getData;

class UserStore {
  user: IUser | null = null;
  isAuth: boolean = false;
  isFetching: boolean = false;
  errors: null | IAuthError = null;
  success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  fetching(status: boolean) {
    this.isFetching = status;
    this.errors = null;
  }
  setAuthStatus(status: boolean) {
    this.isAuth = status;
  }
  setSuccess(status: boolean) {
    this.success = status;
  }
  setErrors(erros: null | IAuthError) {
    this.errors = erros;
  }
  setUser(user: IUser | null) {
    this.user = user;
  }

  handleResponse = async (
    handler: THandler,
    endPoint: UserEndPoints,
    data?: any
  ): Promise<void> => {
    try {
      this.fetching(true);
      const response: TResponse = await handler(endPoint, data);
      this.setUser(response.user);
      setToken(response.user.token);
      this.setAuthStatus(true);
      this.setSuccess(true);
      this.setErrors(null);
      setTimeout(() => {
        this.setSuccess(false);
      }, 2000);
    } catch (error) {
      this.setErrors(error.message);
    } finally {
      this.fetching(false);
    }
  };

  registerUser = (data: IUserRegData): void => {
    this.handleResponse(postFetch, UserEndPoints.REGISTER, { user: data });
  };

  login = (data: IUserAuthData): void => {
    this.handleResponse(postFetch, UserEndPoints.LOGIN, { user: data });
  };

  logOut = (): void => {
    localStorage.clear();
    this.fetching(false);
    this.setAuthStatus(false);
  };

  updateUser = async (data: IUserUpdateData): Promise<void> => {
    this.handleResponse(putFetch, UserEndPoints.UPDATE, { user: data });
  };

  getCurrentUser = async (): Promise<void> => {
    this.handleResponse(getData, UserEndPoints.UPDATE);
  };
}

export default UserStore;
