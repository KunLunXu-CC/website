import { create } from "zustand";
import { IAlbumStore } from "../types";
import { DEFAULT_ACTIVE_MENU_KEY } from "../constants";

const useAlbumStore = create<IAlbumStore>((set, get) => ({
  phoneList: [],
  isUploading: false,
  form: {
    files: [],
    type: void 0,
  },
  activeMenuKey: DEFAULT_ACTIVE_MENU_KEY,
  setPhoneList: (phoneList) => set({ phoneList }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setActiveMenuKey: (activeMenuKey) => set({ activeMenuKey }),
  updateForm: (form) => set({ form: { ...get().form, ...form } }),
  appendPhotos: (photos) => set({ phoneList: [...photos, ...get().phoneList] }),
  removePhotos: (ids) => {
    const { phoneList } = get();
    const newList = phoneList.filter((photo) => !ids.includes(photo.id));
    set({ phoneList: newList });
  },
}));

export default useAlbumStore;
