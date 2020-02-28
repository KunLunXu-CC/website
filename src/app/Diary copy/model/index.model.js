import effects from './effects';
import * as reducers from './reducers';

const initState = {
  diaries: [],
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'diary',
};
