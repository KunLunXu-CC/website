import { Role, User } from '@/store/graphql';
import { createSlice } from '@reduxjs/toolkit';
import { MENU_OPTIONS } from '@/app/(home)/AppList/Monitoring/constants';

interface State {
  menu: {
    activeMenuKey: number
  },
  role: {
    list: Role[],
    active: Role | null
  }
  user: {
    list: User[]
    active: User | null
  }
}

export const initialState: State = {
  menu: {
    activeMenuKey: MENU_OPTIONS[0].key,
  },
  role: {
    list: [],
    active: null,
  },
  user: {
    list: [],
    active: null,
  },
};

export default createSlice({
  initialState,
  name: 'monitoring',
  reducers: {
    // 设置当前活跃菜单 key
    setActiveMenuKey: ((state, { payload: activeMenuKey }) => ({
      ...state,
      menu: {
        ...state.menu,
        activeMenuKey,
      },
    })),

    // 设置 role.list
    setRoleList: ((state, { payload: list }) => ({
      ...state,
      role: { ...state.role, list },
    })),

    // 设置活跃角色
    setActiveRole: ((state, { payload: active }) => ({
      ...state,
      role: { ...state.role, active },
    })),

    // 设置活跃角色 - 权限
    setActiveRoleAuth: ((state, { payload: auth }) => ({
      ...state,
      role: {
        ...state.role,
        active: { ...state.role.active, auth },
      },
    })),

    // 设置用户列表
    setUserList: ((state, { payload: list }) => ({
      ...state,
      user: { ...state.user, list },
    })),

    // 设置活跃用户
    setActiveUser: ((state, { payload: active }) => ({
      ...state,
      user: { ...state.user, active },
    })),

    // 设置活跃用户 - 角色
    setActiveUserRole: ((state, { payload: role }) => ({
      ...state,
      user: {
        ...state.user,
        active: { ...state.user.active, role },
      },
    })),

  },
});
