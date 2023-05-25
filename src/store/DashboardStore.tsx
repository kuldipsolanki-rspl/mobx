import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { fetchFunction } from "../components/common/AxiosInstance";
import {
  FavouriteData,
  MostViewedData,
  Mycontributions,
  PendingItemsData,
  RecentlyData,
  Top3LeadersData,
  TopCategoriesData,
} from "../components/pages/InterfaceTypes";

// Dashboard Store

//Interfaces
export interface ITotalComponents {
  components: number;
}
export interface ITotalViews {
  payload: number;
}
export interface ITotalDownloads {
  payload: number;
}

export class DashboardStore {
  rootStore: IRootStore;

  categories: TopCategoriesData[] = [];
  recentlyAddedItems: RecentlyData[] = [];
  mostViewedData: MostViewedData[] = [];
  components: ITotalComponents | undefined;
  payloadViews: ITotalViews | undefined;
  payloadDownloads: ITotalDownloads | undefined;
  leaders: Top3LeadersData[] = [];
  favourites: FavouriteData[] = [];
  pendingItems: PendingItemsData[] = [];
  contributions: Mycontributions[] = [];

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      categories: observable,
      fetchCategories: action,
      getCategories: computed,
      recentlyAddedItems: observable,
      fetchAddedItems: action,
      getAddedItems: computed,
      mostViewedData: observable,
      fetchMostViewedData: action,
      getMostViewedData: computed,
      components: observable,
      fetchComponents: action,
      getComponents: computed,
      payloadViews: observable,
      fetchViews: action,
      getViews: computed,
      payloadDownloads: observable,
      fetchDownloads: action,
      getDownloads: computed,
      leaders: observable,
      fetchLeaders: action,
      getLeaders: computed,
      favourites: observable,
      fetchFavourites: action,
      getFavourites: computed,
      pendingItems: observable,
      fetchPendingItems: action,
      getPendingItems: computed,
      contributions: observable,
      fetchContributions: action,
      getContributions: computed,
    });
    this.rootStore = rootStore;
  }
  // Top categories
  async fetchCategories(limit: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(
          `api/techstack/top?limit=${limit}`
        );
        this.categories = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getCategories() {
    return this.categories;
  }

  // Recently Added
  async fetchAddedItems() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction("api/component/recent");
        this.recentlyAddedItems = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getAddedItems() {
    return this.recentlyAddedItems;
  }

  //Most Viewed
  async fetchMostViewedData(duration: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(
          `api/dashboard/mostviewed?duration=${duration}`
        );
        this.mostViewedData = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getMostViewedData() {
    return this.mostViewedData;
  }

  // Total component
  async fetchComponents() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(
          "api/dashboard/totalcomponents"
        );
        this.components = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getComponents() {
    return this.components;
  }

  // Total views
  async fetchViews() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction("api/dashboard/views");
        this.payloadViews = getData;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getViews() {
    return this.payloadViews;
  }

  // Total downloads
  async fetchDownloads() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction("api/dashboard/downloads");
        this.payloadDownloads = getData;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getDownloads() {
    return this.payloadDownloads;
  }

  //Leader Board
  async fetchLeaders(duration: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(
          `api/dashboard/leaderboards?duration=${duration}`
        );
        this.leaders = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getLeaders() {
    return this.leaders;
  }

  //My Favourites
  async fetchFavourites() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction("api/myfavourites/getList");
        this.favourites = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getFavourites() {
    return this.leaders;
  }

  //My Pending Items
  async fetchPendingItems() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction("api/dashboard/pendingitems");
        this.pendingItems = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }
  get getPendingItems() {
    return this.pendingItems;
  }

  //My Contributions
  async fetchContributions() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(
          "api/dashboard/mycontributions"
        );
        this.contributions = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getContributions() {
    return this.contributions;
  }
}
