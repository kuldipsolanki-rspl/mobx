import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import {
  deleteFunction,
  fetchFunction,
  patchFunction,
  postFunction,
} from "../components/common/AxiosInstance";

export interface IrolesList {
  createdAt: string;
  description: string;
  id: number;
  isActive: boolean;
  title: string;
  total_users: number;
  updatedAt: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  isActive: boolean;
  title: string;
  roles_permissions: {
    createdAt: string;
    id: number;
    permission_id: number;
    role_id: number;
    updatedAt: string;
  };
}

export interface IpermissionList {
  createdAt: string;
  id: number;
  isActive: boolean;
  title: string;
  updatedAt: string;
}

export interface IviewRolesList {
  createdAt: string;
  description: string;
  id: number;
  isActive: boolean;
  title: string;
  updatedAt: string;
  permissions: viewPermission[];
}

export interface viewPermission {
  id: number;
  isActive: boolean;
  title: string;
}

export interface IdeleteRoles {
  status: boolean;
  message: string;
}

export interface IaddNewRoles {
  status: boolean;
  message: string;
}

export class ManageRolesStore {
  rootStore: IRootStore;

  rolesList: IrolesList[] = [];
  permissionList: IpermissionList | any;
  viewRolesList: IviewRolesList | any;
  deleteRoles: IdeleteRoles | any;

  saveAddedRoles: {} | any;
  addNewRoles: IaddNewRoles | any;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      rolesList: observable,
      fetchRoles: action,
      getRoles: computed,
      permissionList: observable,
      fetchPermission: action,
      getPermission: computed,
      viewRolesList: observable,
      fetchViewRoles: action,
      getViewRoles: computed,
      deleteRoles: observable,
      fetchDeleteRoles: action,
      getDeleteRoles: computed,
      saveAddedRoles: observable,
      fetchAddRoles: action,
      getAddRoles: computed,
      addNewRoles: observable,
      fetchAddNewRoles: action,
      getAddNewRoles: computed,
    });

    this.rootStore = rootStore;
  }

  //fetch role list
  async fetchRoles() {
    const getData: any = await fetchFunction(`api/role/all`);
    this.rolesList = getData.payload;
  }

  get getRoles() {
    return this.rolesList;
  }

  //fetch role permission list
  async fetchPermission() {
    const getData: any = await fetchFunction(`api/permission`);
    this.permissionList = getData.payload;
  }

  get getPermission() {
    return this.permissionList;
  }

  //fetch role permission list
  async fetchViewRoles(id: any) {
    const getData: any = await fetchFunction(`api/role/${id}`);
    this.viewRolesList = getData.payload;
    console.log(this.viewRolesList.permissions);
  }

  get getViewRoles() {
    return this.viewRolesList;
  }

  //delete role
  async fetchDeleteRoles(id: any) {
    const getData: any = await deleteFunction(`api/role/${id}`);
    this.deleteRoles = getData;
    console.log(this.deleteRoles.response.data.status);
  }

  get getDeleteRoles() {
    return this.deleteRoles;
  }

  //add edit role
  async fetchAddRoles(id: any, roleData: any) {
    const getData: any = await patchFunction(`api/role/${id}`, roleData);
    this.saveAddedRoles = getData.payload;
  }

  get getAddRoles() {
    return this.saveAddedRoles;
  }

  //add new role
  async fetchAddNewRoles(dataObj: any) {
    const getData: any = await postFunction(`api/role`, dataObj);
    this.addNewRoles = getData;
    console.log(this.addNewRoles.response.data);
  }

  get getAddNewRoles() {
    return this.addNewRoles;
  }
}
