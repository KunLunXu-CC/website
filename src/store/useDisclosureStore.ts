import { create } from "zustand";

interface IDisclosureState extends Record<string, unknown> {}

interface IDisclosureStore extends IDisclosureState {
  onClose: (key: string) => void;
  isOpen: (key: string) => boolean;
  getData: (key: string) => unknown;
  onOpen: (key: string, data: unknown) => void;
}

const useDisclosureStore = create<IDisclosureStore>((set, get) => ({
  getData: (key) => get()[key],
  isOpen: (key) => Boolean(get()[key]),
  onClose: (key) => set({ [key]: void 0 }),
  onOpen: (key, data) => set({ [key]: data }),
}));

export default useDisclosureStore;
