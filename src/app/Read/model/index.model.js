import effects from './effects';
import * as reducers from './reducers';

const initState = {
  menu: {
    firstActiveKey: null,  // 一级菜单 activeKey
    secondActiveKey: null,  // 二级菜单 activeKey
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'read',
};
