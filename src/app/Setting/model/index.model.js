import effects from './effects';
import * as reducers from './reducers';

import { MENUS } from '../consts';

const initState = {
  selectedMenuKey: MENUS[0].key,
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'settingManage',
};
