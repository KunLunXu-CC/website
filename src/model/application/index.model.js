import * as effects from './effects';
import * as reducers from './reducers';

const initState = {
  docks: [],
  opens: [],
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'app',
};
