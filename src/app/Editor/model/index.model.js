import effects from './effects';
import * as reducers from './reducers';

import { SIDE_MENU } from '../consts';

const initState = {
  tags: {},       // {[id]: value}
  articles: {},   // {[id]: value}
  menu: {
    openKeys: [],     // 打开的菜单项
    collapsed: false, // 菜单折叠状态, 是否收缩到最小
  },
  side: {
    selectMenuKey: SIDE_MENU.ALL.KEY,  // 当前选中菜单 key
  },
  works: [],
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'editor',
};
