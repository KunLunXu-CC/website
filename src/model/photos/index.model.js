import effects from './effects';
import * as reducers from './reducers';

const initState = {
  desktop: [],
  avatar: [],
  thumb: [],
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'photos',
};
