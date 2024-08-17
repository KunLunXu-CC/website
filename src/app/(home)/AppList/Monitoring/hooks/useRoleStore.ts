import { create } from "zustand";
import { IRoleStore } from "../types";
import { APP_SETTING } from "@/config/constants";

const useRoleStore = create<IRoleStore>((set) => ({
  roleList: [],
  activeRoleId: null,
  setRoleList: (roleList) => set({ roleList }),
  setActiveRoleId: (activeRoleId) => set({ activeRoleId }),

  // 设置活跃角色 - 权限
  setActiveRoleAuth: (authKeys) => {
    set((state) => {
      if (!state.activeRoleId) return state;

      const auth = Object.values(APP_SETTING)
        .filter((v) => authKeys.includes(v.code))
        .map((v) => ({ code: v.code, name: v.name, readable: 1, writable: 1 }));

      const roleList = state.roleList.map((role) => ({
        ...role,
        auth: role.id === state.activeRoleId ? auth : role.auth,
      }));

      return { roleList };
    });
  },
}));

export default useRoleStore;
