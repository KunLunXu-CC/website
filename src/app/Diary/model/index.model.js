import effects from './effects';
import * as reducers from './reducers';

import { DIARY_MENU } from '@config/consts';

const initState = {
  diaries: [],                                // 日记列表
  menu: {
    selectedKey: DIARY_MENU.CALENDAR.VALUE,   // 当前菜单 key 值
  },
  statsBill: {                                // 统计账单
    groupWithName: [],                        // 统计账单 - 根据 name 分组查询
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'diary',
};
