import {
  deleteFunction,
  fetchFunction,
  patchFunction,
} from "../components/common/AxiosInstance";
import { IRootStore } from "./RootStore";
import { action, computed, makeObservable, observable } from "mobx";

export interface IallIssuesList {
  data: [
    {
      id: number;
      assignedEmail: string;
      assignedName: string;
      categoryId: number;
      categoryName: string;
      componentDisplayName: string;
      componentId: number;
      componentName: string;
      createdAt: string;
      description: any;
      priority: string;
      reporterEmail: string;
      reporterId: string;
      reporterName: string;
      status: string;
      techstackId: number;
      techstackName: string;
      title: string;
      updatedAt: string;
    }
  ];
  numberOfReporters: number;
}

// export interface IssuePayload {
//   id: number;
//   assignedEmail: string;
//   assignedName: string;
//   categoryId: number;
//   categoryName: string;
//   componentDisplayName: string;
//   componentId: number;
//   componentName: string;
//   createdAt: string;
//   description: any;
//   priority: string;
//   reporterEmail: string;
//   reporterId: string;
//   reporterName: string;
//   status: string;
//   techstackId: number;
//   techstackName: string;
//   title: string;
//   updatedAt: string;
// }

export interface IreviewersList {
  designation: string;
  email: string;
  id: number;
  image: string;
  name: string;
  username: string;
}

export interface IreportedIssuesList {
  id: number;
  assignedEmail: string;
  assignedName: string;
  categoryId: number;
  categoryName: string;
  componentDisplayName: string;
  componentId: number;
  componentName: string;
  createdAt: string;
  description: any;
  priority: string;
  reporterEmail: string;
  reporterId: string;
  reporterName: string;
  status: string;
  techstackId: number;
  techstackName: string;
  title: string;
  updatedAt: string;
}
export interface IassignedIssuesList {
  id: number;
  assignedEmail: string;
  assignedName: string;
  categoryId: number;
  categoryName: string;
  componentDisplayName: string;
  componentId: number;
  componentName: string;
  createdAt: string;
  description: any;
  priority: string;
  reporterEmail: string;
  reporterId: string;
  reporterName: string;
  status: string;
  techstackId: number;
  techstackName: string;
  title: string;
  updatedAt: string;
}
export interface IViewIssues {
  comments: [
    {
      comment: string;
      commentorId: number;
      commentorImage: string;
      commentorName: string;
      createdAt: string;
      id: number;
      updatedAt: string;
    }
  ];
  issue: [
    {
      id: number;
      assignedEmail: string;
      assignedName: string;
      categoryId: number;
      categoryName: string;
      componentDisplayName: string;
      componentId: number;
      componentName: string;
      createdAt: string;
      description: any;
      priority: string;
      reporterEmail: string;
      reporterId: string;
      reporterName: string;
      status: string;
      techstackId: number;
      techstackName: string;
      title: string;
      updatedAt: string;
    }
  ];
}

// export interface IeditComment {
//   id: number;
// }
export interface IdeleteComment {
  status: boolean;
  message: string;
}

export interface IcancelIssues {
  status: boolean;
  message: string;
}
export interface IeditIssues {
  status: boolean;
  message: string;
}

export class IssueTrackerStore {
  rootStore: IRootStore;

  allIssuesList: IallIssuesList | any;
  reviewersList: IreviewersList[] = [];
  reportedIssuesList: IreportedIssuesList[] = [];
  assignedIssuesList: IassignedIssuesList[] = [];
  viewIssues: IViewIssues | any;
  cancelIssues: IcancelIssues | any;
  editIssues: IeditIssues | any;

  //interface is remaining
  editComment: {} | any;
  deleteComment: IdeleteComment | any;

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
      viewIssues: observable,
      fetchViewIssues: action,
      getViewIssues: computed,
      editIssues: observable,
      fetchEditIssues: action,
      getEditIssues: computed,
      cancelIssues: observable,
      fetchCancelIssues: action,
      getCancelIssues: computed,
      editComment: observable,
      fetchEditComment: action,
      getEditComment: computed,
      deleteComment: observable,
      fetchDeleteComment: action,
      getDeleteComment: computed,
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

  // view assigned issues
  async fetchViewIssues(compId: any) {
    const getData: any = await fetchFunction(`api/issue/${compId}`);
    this.viewIssues = getData.payload;
  }

  get getViewIssues() {
    return this.viewIssues;
  }

  // edit Reported issue
  async fetchEditIssues(id: any, formData: any) {
    const getData: any = await patchFunction(`api/issue/${id}`, formData);
    this.editIssues = getData.payload;
    console.log("edit issue store", this.editIssues);
  }

  get getEditIssues() {
    return this.editIssues;
  }

  // cancel issue
  async fetchCancelIssues(id: Number) {
    const getData: any = await deleteFunction(`api/issue/${id}`);
    this.cancelIssues = getData;
  }

  get getCancelIssues() {
    return this.cancelIssues;
  }

  //edit comment
  async fetchEditComment(id: any, formData: any) {
    const getData: any = await patchFunction(`api/comment/${id}`, formData);
    this.editComment = getData.payload;
  }

  get getEditComment() {
    return this.editComment;
  }

  //delete comment
  async fetchDeleteComment(id: Number) {
    const getData: any = await deleteFunction(`api/comment/${id}`);
    this.deleteComment = getData;
  }

  get getDeleteComment() {
    return this.deleteComment;
  }
}
