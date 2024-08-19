import { create } from "zustand";
import { IAlbumStore } from "../types";
import { DEFAULT_ACTIVE_MENU_KEY } from "../constants";

const useAlbumStore = create<IAlbumStore>((set) => ({
  phoneList: [],
  isUploading: false,
  activeMenuKey: DEFAULT_ACTIVE_MENU_KEY,
  setPhoneList: (phoneList) => set({ phoneList }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setActiveMenuKey: (activeMenuKey) => set({ activeMenuKey }),
}));

export default useAlbumStore;
