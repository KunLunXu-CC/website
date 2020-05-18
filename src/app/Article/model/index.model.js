import effects from './effects';
import * as reducers from './reducers';

import { TAG_ALL } from '../consts';

export const initState = {
  menus: [],
  search: {
    name: void 0,
    tag: TAG_ALL.id,
  },
  articles: [],
  articleTops: [],
  read: {
    toc: [],
    article: null,
    scrollHeight: 0,
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'article',
};
