import * as reducers from './reducers';

const initState = {
  photos: {
    desktop: [],
    avatar: [],
    thumb: [],
  },
};

export default {
  namespace: 'global',
  state: initState,
  reducers,
}
