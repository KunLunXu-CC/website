import effects from './effects';
import * as reducers from './reducers';

const initState = {};   // 字典、按照 code 进行分组

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'datasetsfrom',
};
