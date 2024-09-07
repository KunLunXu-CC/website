// 工作区, 和文章(目录)挂钩, 后面可能还有其他
import { create } from 'zustand';
import { ACTIVITY_BAR_KEY, IEditorStore } from '../types';

const useActivityBarStore = create<IEditorStore>((set) => ({
  isSideBarCollapsed: false,
  selectedActivityBarKey: ACTIVITY_BAR_KEY.RESOURCE,
  setIsSideBarCollapsed: (isSideBarCollapsed) => set({ isSideBarCollapsed }),
  setSelectedActivityBarKey: (selectedActivityBarKey) => set({ selectedActivityBarKey }),
}));

export default useActivityBarStore;
