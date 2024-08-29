// 工作区, 和文章(目录)挂钩, 后面可能还有其他
import { create } from 'zustand';
import { IWorkStore } from '../types';

const useWorkStore = create<IWorkStore>((set) => ({}));

export default useWorkStore;
