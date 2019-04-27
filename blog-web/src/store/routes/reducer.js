import _ from 'lodash';
import * as ACTION_TYPE from './actionType';
const initState = [];

// 开启 app
const openApp = (state, action) => {
  const { payload } = action;
  if (!state.some(v => v.code === payload.code)){
    return [...state, action.payload, ];
  } else {
    return state;
  }
}

// 关闭 app
const closeApp = (state, action) => {
  _.remove(action.payload || [], v => v.url === route.url);
  return [...state];
}

// 
export default (state = initState, action) => {
  const mapTypeToHandler = {
    [ACTION_TYPE.OPEN_APP]: openApp,
    [ACTION_TYPE.CLOSE_APP]: closeApp,
  };
  const handler= mapTypeToHandler[action.type];
  if (!handler || !action.type){return state};
  return handler(state, action);
}
