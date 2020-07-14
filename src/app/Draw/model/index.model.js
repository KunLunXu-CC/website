import effects from './effects';
import * as reducers from './reducers';
import { MENU_LIST } from '../consts';

const initState = {
  menu: {
    activeKey: MENU_LIST[0].key,
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'draw',
};
