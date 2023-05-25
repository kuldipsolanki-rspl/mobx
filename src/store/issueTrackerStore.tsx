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
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(`api/issues`);
        this.allIssuesList = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getAllIssues() {
    return this.allIssuesList;
  }

  // Reviewers List
  async fetchReviewersList() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(`api/reviewers`);
        this.reviewersList = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getReviewersList() {
    return this.reviewersList;
  }

  // reported issues List
  async fetchReportedIssues() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(`api/issues/reported`);
        this.reportedIssuesList = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getReportedIssues() {
    return this.reportedIssuesList;
  }

  // assigned issues List
  async fetchAssignedIssues() {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(`api/issues/assigned`);
        this.assignedIssuesList = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getAssignedIssues() {
    return this.assignedIssuesList;
  }

  // view assigned issues
  async fetchViewIssues(compId: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await fetchFunction(`api/issue/${compId}`);
        this.viewIssues = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getViewIssues() {
    return this.viewIssues;
  }

  // edit Reported issue
  async fetchEditIssues(id: any, formData: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await patchFunction(`api/issue/${id}`, formData);
        this.editIssues = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getEditIssues() {
    return this.editIssues;
  }

  // cancel issue
  async fetchCancelIssues(id: Number) {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await deleteFunction(`api/issue/${id}`);
        this.cancelIssues = getData;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getCancelIssues() {
    return this.cancelIssues;
  }

  //edit comment
  async fetchEditComment(id: any, formData: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await patchFunction(`api/comment/${id}`, formData);
        this.editComment = getData.payload;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getEditComment() {
    return this.editComment;
  }

  //delete comment
  async fetchDeleteComment(id: Number) {
    return new Promise(async (resolve, reject) => {
      try {
        const getData: any = await deleteFunction(`api/comment/${id}`);
        this.deleteComment = getData;
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  }

  get getDeleteComment() {
    return this.deleteComment;
  }
}
