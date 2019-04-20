import * as ACTION_TYPE from './actionType';
const initState = [{name: 'linheng', age: 20}];

export default (state = initState, action) => {
  if (!action.type){return state}
  const mapTypeToHandler = {

  };
  const handler= mapTypeToHandler[action.type];
  if (!handler){return state};
  return handler(state, action);
}
