import effects from './effects';
import * as reducers from './reducers';

import { ACTIVITY_LIST } from '../consts';

const initState = {
  tags: {},        // {[id]: value}
  articles: {},    // {[id]: value}
  preview: void 0, // 预览文章(文章 id)
  side: {
    openKeys: [],     // 打开的菜单项
    collapsed: false, // 菜单折叠状态, 是否收缩到最小
  },
  activity: {
    selectKey: ACTIVITY_LIST[0].key,  // 当前选中 key
  },
  works: [],
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'editor',
};
