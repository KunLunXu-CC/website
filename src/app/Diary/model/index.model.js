import effects from './effects';
import * as reducers from './reducers';

import { DIARY_MENU } from '../consts';

const initState = {
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

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'diary',
};
