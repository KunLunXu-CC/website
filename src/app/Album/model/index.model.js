import effects from './effects';
import * as reducers from './reducers';

export const initState = {
  search: {
    type: 'all',
    sourceFileName: void 0,
  },

  upload: {
    files: [],
    show: false,
    type: void 0,
  },

  photos: [],
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'album',
};
