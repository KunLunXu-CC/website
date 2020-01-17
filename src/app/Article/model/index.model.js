import effects from './effects';
import * as reducers from './reducers';

import { TAG_ALL } from '@config/consts';

const initState = {
  menus: [],
  search: {
    name: void 0,
    tag: TAG_ALL.id,
  },
  article: null,
  articles: [],
  articleTops: [],
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'article',
};
