import effects from './effects';
import * as reducers from './reducers';

export const initState = {
  dock: {
    hideDock: false,   // 是否隐藏 dock
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'setting',
};
