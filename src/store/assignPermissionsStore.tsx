import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import {
  fetchFunction,
  patchFunction,
  postFunction,
} from "../components/common/AxiosInstance";

export interface IrolesList {
  createdAt: string;
  designation: string;
  email: string;
  id: number;
  image: string;
  isActive: boolean;
  lastLogin: string;
  name: string;
  role: {
    id: number;
    isActive: boolean;
    permissions: Ipermissions[];
    title: string;
    role_id: number;
    updatedAt: string;
    username: string;
  };
  role_id: number;
  updatedAt: string;
  username: string;
}

export interface Ipermissions {
  id: number;
  isActive: boolean;
  roles_permissions: {
    id: number;
    role_id: number;
    permission_id: number;
    updatedAt: string;
    createdAt: string;
  };
  title: string;
}

export interface IcategoryList {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}

export interface IeditUserList {
  assignedStack: { category: []; techstack: [] };
  permissions: Ipermissions[];
  role: string;
  userData: IrolesList[];
}

export interface IupdateUserList {
  message: string;
  status: boolean;
  count: number;
}

export interface IaddUserList {
  message: string;
  status: boolean;
  count: number;
}

export interface Iuser {
  designation: string | null;
  dn: string;
  email: string;
  image: string | null;
  name: string;
  username: string;
}

export class AssignPermissionsStore {
  rootStore: IRootStore;

  assignedRolesList: IrolesList[] = [];
  categoryList: IcategoryList[] = [];

  categoryTechstackList: {} | any;
  editUserList: IeditUserList | any;

  updateUserList: IupdateUserList | any;
  addUserList: IaddUserList | any;
  user: Iuser[] = [];

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      assignedRolesList: observable,
      fetchAssignedRoles: action,
      getAssignedRoles: computed,
      categoryList: observable,
      fetchCategoryList: action,
      getCategoryList: computed,
      categoryTechstackList: observable,
      fetchCategoryTechstackList: action,
      getCategoryTechstackList: computed,
      editUserList: observable,
      fetchEditUser: action,
      getEditUser: computed,
      updateUserList: observable,
      fetchUpdateUser: action,
      getUpdateUser: computed,
      addUserList: observable,
      fetchAddUser: action,
      getAddUser: computed,
      user: observable,
      fetchUser: action,
      getUser: computed,
    });
    this.rootStore = rootStore;
  }

  //fetch assigned roles
  async fetchAssignedRoles() {
    const getData: any = await fetchFunction(`api/user/all`);
    this.assignedRolesList = getData.payload;
  }

  get getAssignedRoles() {
    return this.assignedRolesList;
  }

  //fetch categories
  async fetchCategoryList() {
    const getData: any = await fetchFunction(`api/category/list`);
    this.categoryList = getData.payload;
  }

  get getCategoryList() {
    return this.categoryList;
  }

  //fetch categories techstack
  async fetchCategoryTechstackList(id: any) {
    const getData: any = await postFunction(`api/category/techstack`, id);
    this.categoryTechstackList = getData.payload;
  }

  get getCategoryTechstackList() {
    return this.categoryTechstackList;
  }

  //fetch edit permissions
  async fetchEditUser(id: any) {
    const getData: any = await fetchFunction(`api/user/${id}`);
    this.editUserList = getData.payload;
  }

  get getEditUser() {
    return this.editUserList;
  }

  //update edit permissions
  async fetchUpdateUser(id: any, userData: any) {
    const getData: any = await patchFunction(`api/user/${id}`, userData);
    this.updateUserList = getData.payload;
  }

  get getUpdateUser() {
    return this.updateUserList;
  }

  //add permissions
  async fetchAddUser(dataObj: any) {
    const getData: any = await postFunction(`api/user`, dataObj);
    this.addUserList = getData.payload;
    console.log(this.addUserList);
  }

  get getAddUser() {
    return this.addUserList;
  }

  //fetch user
  async fetchUser(email: any) {
    const getData = await postFunction(`api/fetchuser`, email);
    this.user = getData.payload;
  }

  get getUser() {
    return this.user;
  }
}
