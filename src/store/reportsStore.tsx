import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { fetchFunction } from "../components/common/AxiosInstance";
import { TechstackReportData } from "../components/pages/InterfaceTypes";

export interface ItrendComponentList {
  count: number;
  label: string;
}

export interface ItechStackApprovalReportList {
  range1: number;
  range2: number;
  range3: number;
  range4: number;
  techstack: string;
  techstackId: number;
  total: number;
}

export class ReportsStore {
  rootStore: IRootStore;

  reportsList: TechstackReportData[] = [];
  trendComponentList: ItrendComponentList[] = [];
  techStackApprovalReportList: ItechStackApprovalReportList[] = [];

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      reportsList: observable,
      fetchReports: action,
      getReports: computed,
      trendComponentList: observable,
      fetchTrendComponent: action,
      getTrendComponent: computed,
      techStackApprovalReportList: observable,
      fetchTechStackApprovalReport: action,
      getTechStackApprovalReport: computed,
    });

    this.rootStore = rootStore;
  }

  //get report
  async fetchReports(id: any) {
    const getData: any = await fetchFunction(
      `api/techstack/component/report?techstackid=${id}`
    );
    this.reportsList = getData.payload;
  }

  get getReports() {
    return this.reportsList;
  }

  //get trendComponent
  async fetchTrendComponent(id: any, duration: any) {
    const getData: any = await fetchFunction(
      `api/techstack/component/trend/report?techstackid=${id}&duration=${duration}`
    );
    this.trendComponentList = getData.payload;
  }

  get getTrendComponent() {
    return this.trendComponentList;
  }

  //get techStackGetReport
  async fetchTechStackApprovalReport() {
    const getData: any = await fetchFunction(
      `api/techstack/component/approval/report`
    );
    this.techStackApprovalReportList = getData.payload;
  }

  get getTechStackApprovalReport() {
    return this.techStackApprovalReportList;
  }
}
