import { createSlice } from '@reduxjs/toolkit';
import { Role } from '@store/graphql';

interface State {
  role: {
    list: Role[],
    active: Role | null
  }
}

export const initialState: State = {
  role: {
    list: [],
    active: null,
  },
};

export default createSlice({
  initialState,
  name: 'monitoring',
  reducers: {
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
  },
});
