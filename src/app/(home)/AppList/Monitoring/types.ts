import { RoleItemFragment, UserItemFragment } from "@/gql/graphql";

export enum MENU_OPTIONS_KEY {
  USER = "1",
  ROLE = "2",
}

// ------------------------------

export interface IMonitoringState {
  activeMenuKey: MENU_OPTIONS_KEY;
}

export interface IMonitoringStore extends IMonitoringState {
  setActiveMenuKey: (activeMenuKey: MENU_OPTIONS_KEY) => void;
}

// ------------------------------

export interface IRoleState {
  roleList: RoleItemFragment[];
  activeRoleId: string | null;
}

export interface IRoleStore extends IRoleState {
  setRoleList: (roleList: IRoleState["roleList"]) => void;
  setActiveRoleId: (roleId: string) => void;
  setActiveRoleAuth: (authKeys: string[]) => void;
}

// ------------------------------

export interface IUserState {
  userList: UserItemFragment[];
  activeUserId: string | null;
}

export interface IUserStore extends IUserState {
  setUserList: (roleList: IUserState["userList"]) => void;
  setActiveUserId: (userId: string) => void;
  setActiveUserRole: (role: RoleItemFragment) => void;
}
