import effects from './effects';
import * as reducers from './reducers';

const initState = {
  tags: [],
  articles: [],
  menu: {
    openKeys: [],
  },
  works: [],
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'editor',
};
