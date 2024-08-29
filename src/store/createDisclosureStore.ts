import { create } from "zustand";

const createDisclosureStore = <IData = unknown>() =>
  create<{
    isOpen: boolean;
    data?: IData;
    onOpen: (data?: IData) => void;
    onClose: () => void;
    onOpenChange: (isOpen: boolean) => void;
  }>((set) => ({
    isOpen: false,
    data: void 0,
    onOpen: (data) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: void 0 }),
    onOpenChange: (isOpen: boolean) => set({ isOpen }),
  }));

export default createDisclosureStore;
