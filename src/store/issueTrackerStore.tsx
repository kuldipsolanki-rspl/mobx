import { fetchFunction } from "../components/common/AxiosInstance";
import { IRootStore } from "./RootStore";
import { action, computed, makeObservable, observable } from "mobx";

export interface IallIssuesList {
  message: string;
  status: boolean;
}

export interface IallIssuesList {
  designation: string;
  email: string;
  id: number;
  image: string;
  name: string;
  username: string;
}

export interface IreportedIssuesList {
  count: number;
  message: string;
  payload: [];
  status: boolean;
}
export interface IassignedIssuesList {
  count: number;
  message: string;
  payload: [];
  status: boolean;
}

export class IssueTrackerStore {
  rootStore: IRootStore;

  allIssuesList: IallIssuesList | undefined;
  reviewersList: IallIssuesList[] = [];
  reportedIssuesList: IreportedIssuesList | undefined;
  assignedIssuesList: IassignedIssuesList | undefined;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      allIssuesList: observable,
      fetchAllIssues: action,
      getAllIssues: computed,
      reviewersList: observable,
      fetchReviewersList: action,
      getReviewersList: computed,
      reportedIssuesList: observable,
      fetchReportedIssues: action,
      getReportedIssues: computed,
      assignedIssuesList: observable,
      fetchAssignedIssues: action,
      getAssignedIssues: computed,
    });
    this.rootStore = rootStore;
  }

  // all issues List
  async fetchAllIssues() {
    const getData: any = await fetchFunction(`api/issues`);
    this.allIssuesList = getData.payload;
  }

  get getAllIssues() {
    return this.allIssuesList;
  }

  // Reviewers List
  async fetchReviewersList() {
    const getData: any = await fetchFunction(`api/reviewers`);
    this.reviewersList = getData.payload;
  }

  get getReviewersList() {
    return this.reviewersList;
  }

  // reported issues List
  async fetchReportedIssues() {
    const getData: any = await fetchFunction(`api/issues/reported`);
    this.reportedIssuesList = getData.payload;
  }

  get getReportedIssues() {
    return this.reportedIssuesList;
  }

  // assigned issues List
  async fetchAssignedIssues() {
    const getData: any = await fetchFunction(`api/issues/assigned`);
    this.assignedIssuesList = getData.payload;
  }

  get getAssignedIssues() {
    return this.assignedIssuesList;
  }
}
