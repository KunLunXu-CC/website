import effects from './effects';
import * as reducers from './reducers';

const initState = {
  menu: {
    firstActiveKey: null,  // 一级菜单 activeKey
    secondActiveKey: null,  // 二级菜单 activeKey
  },
  editor: null,            // 待编辑数据(不进行数据的双向绑定)
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'read',
};
