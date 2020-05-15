import effects from './effects';
import * as reducers from './reducers';

import { MENU_LIST } from '../consts';

const initState = {
  menu: {
    selectedKey: MENU_LIST[0].key,  // 当前菜单 key 值
  },
  datasetsfroms: [],                // 字典列表
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'datasetsfrom',
};
