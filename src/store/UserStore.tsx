import { IRootStore } from "./RootStore";
import { action, computed, makeObservable, observable } from "mobx";
import { postFunction } from "../components/common/AxiosInstance";

export interface Iuser {
  designation: string | null;
  dn: string;
  email: string;
  image: string | null;
  name: string;
  username: string;
}

export class UserStore {
  user: Iuser[] = [];

  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      user: observable,
      fetchUser: action,
      getUser: computed,
    });
    this.rootStore = rootStore;
  }

  // async fetchUser(email: any) {
  //   const getData = await postFunction(`api/fetchuser`, email);
  //   this.user = getData.payload;
  // }

  async fetchUser(email: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const getData = await postFunction(`api/fetchuser`, email);
        this.user = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getUser() {
    return this.user;
  }
}
