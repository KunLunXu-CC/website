// 搜索
import { create } from 'zustand';
import { ISearchStore } from '../types';

const useSearchStore = create<ISearchStore>((set) => ({}));

export default useSearchStore;
