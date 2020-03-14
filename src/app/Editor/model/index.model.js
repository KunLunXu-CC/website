import effects from './effects';
import * as reducers from './reducers';

const initState = {
  tags: {},       // {[id]: value}
  articles: {},   // {[id]: value}
  menu: {
    openKeys: [], // 打开的菜单项
  },
  works: [],
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'editor',
};
