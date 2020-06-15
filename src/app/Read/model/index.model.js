import effects from './effects';
import * as reducers from './reducers';

const initState = {
  menu: {
    firstActiveKey: null,  // 一级菜单 activeKey
    secondActiveKey: null,  // 二级菜单 activeKey
  },
  editor: {
    show: false,   // 是否开启
    current: null, // 当前数据
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'read',
};
