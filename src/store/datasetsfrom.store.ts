import { createSlice } from '@reduxjs/toolkit';
import { MENU_LIST } from '@app/Datasetsfrom/consts';

export interface DatasetsfromStore {
  menu: {
    selectedKey: string | number
  },
}


export const initialState: DatasetsfromStore = {
  menu: {
    selectedKey: MENU_LIST[0].key,  // 当前菜单 key 值
  },
};

export default createSlice({
  initialState,
  name: 'datasetsfrom',
  reducers: {
    //
  },
});
