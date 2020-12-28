import effects from './effects';
import * as reducers from './reducers';

import { DEFAULT_MENU } from '../consts';

const initState = {
  articles: [], // 文章
  detail: {  // 详情(查看文章)
    article: null,
  },
  menu: {
    selectedKey: DEFAULT_MENU.id,  // 当前菜单 key 值
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'reader',
};
