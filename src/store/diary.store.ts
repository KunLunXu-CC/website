import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { DIARY_MENU } from '@app/Diary/constants';

export interface Diary {
  // bill: []
  // diet: []
  // fitness: []
  // bodyIndex: null
  // informalEssay: null
  id: string
  name: string
  getUp: string
  toRest: string
}

export interface DiaryStore {
  diaries: Diary[]
  menu: {
    selectedKey: string
  }
  statsBodyIndex: any[]
  statsBill: {
    stats: {
      income: number
      expend: number
    }
    groupWithName: any []
  }
}

export const initialState: DiaryStore =  {
  diaries: [],                                // 日记列表
  menu: {
    selectedKey: DIARY_MENU.CALENDAR.VALUE,   // 当前菜单 key 值
  },
  statsBodyIndex: [],                         // 身体成分列表
  statsBill: {                                // 统计账单
    stats: {                                  // 统计账单 - 统计总额
      income: 0,                              // 收入
      expend: 0,                              // 支出
    },
    groupWithName: [],                        // 统计账单 - 根据 name 分组查询
  },
};

export default createSlice({
  initialState,
  name: 'diary',
  reducers: {
    updateDiaries: (state, { payload: diaries }) => ({
      ...state,
      diaries: _.uniqBy([...diaries, ...state.diaries], 'id'),
    }),

    updateMenu: (state, { payload: menu }) => ({
      ...state,
      menu: {
        ...state.menu,
        ...menu,
      },
    }),
  },
});
