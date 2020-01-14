import * as effects from './effects';
import * as reducers from './reducers';

const initState = {
  photos: {
    desktop: [],
    avatar: [],
    thumb: [],
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'global',
}
