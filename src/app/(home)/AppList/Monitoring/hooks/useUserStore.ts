import { create } from "zustand";
import { IUserStore } from "../types";

const useRoleStore = create<IUserStore>((set, get) => ({
  userList: [],
  activeUserId: null,
  setUserList: (userList) => set({ userList }),
  setActiveUserId: (activeUserId) => set({ activeUserId }),
  setActiveUserRole: (role) => {
    const { userList, activeUserId } = get();

    if (!activeUserId) {
      return;
    }

    const newUserList = userList.map((user) => {
      if (user.id === activeUserId) {
        user.role = role;
      }
      return user;
    });

    set({ userList: newUserList });
  },
}));

export default useRoleStore;
