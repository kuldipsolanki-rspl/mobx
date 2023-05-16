import { DashboardStore } from "./dashboardStore";
import { IssueTrackerStore } from "./issueTrackerStore";
import { LoginStore } from "./loginStore";
import { ManageComponentStore } from "./manageComponentsStore";
import { TechSearchstore } from "./techSearchstore";
import { UserStore } from "./UserStore";

export interface IRootStore {
  userStore: UserStore;
  dashboardStore: DashboardStore;
  manageComponentStore: ManageComponentStore;
  loginStore: LoginStore;
  techSearchstore: TechSearchstore;
  issueTrackerStore: IssueTrackerStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  dashboardStore: DashboardStore;
  manageComponentStore: ManageComponentStore;
  loginStore: LoginStore;
  techSearchstore: TechSearchstore;
  issueTrackerStore: IssueTrackerStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.dashboardStore = new DashboardStore(this);
    this.manageComponentStore = new ManageComponentStore(this);
    this.loginStore = new LoginStore(this);
    this.techSearchstore = new TechSearchstore(this);
    this.issueTrackerStore = new IssueTrackerStore(this);
  }
}
