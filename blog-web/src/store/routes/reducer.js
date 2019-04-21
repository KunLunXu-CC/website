import * as ACTION_TYPE from './actionType';
const initState = [];

const openApp = (state, action) => {
  const { payload } = action;
  if (!state.some(v => v.code ===payload.code)){
    return [...state, action.payload];
  } else {
    return state;
  }
}

const closeApp = (state, action) => {
  return action.payload;
}

export default (state = initState, action) => {
  const mapTypeToHandler = {
    [ACTION_TYPE.OPEN_APP]: openApp,
    [ACTION_TYPE.CLOSE_APP]: closeApp,
  };
  const handler= mapTypeToHandler[action.type];
  if (!handler || !action.type){return state};
  return handler(state, action);
}
