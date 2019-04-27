import _ from 'lodash';
import * as ACTION_TYPE from './actionType';
const initState = [];

const maxStyleParams = {
  width: '100%',
  height: '100%',
  translateX: 0,
  translateY: 0,
};

const minStyleParams = { 
  width: 0,
  height: 0,
  translateX: '100vw',
  translateY: '100vh',
};

// 开启 app reducer 处理函数
const openApp = (state, action) => {
  const { payload } = action;
  if (!state.some(v => v.url === payload.url)){
    return [ ...state, action.payload ];
  } else {
    return state.map(v => ( 
      v.url === payload.url ? { ...v, min: v.min ? null : minStyleParams } : v
    ));
  }
}

// 关闭 app reducer 处理函数
const closeApp = (state, action) => {
  const { url } = action.payload;
  _.remove(state, v => v.url === url);
  return [...state];
}

// 最大化（切换） reducer 处理函数
export const maximize = (state, action) => (state.map( v => {
  if (v.url === action.payload.url){ 
    const route = action.payload;
    return { ...route, max: route.max ? maxStyleParams : null };
  }
  return v;
}));

// 最小化（切换） reducer 处理函数
export const minimize = (state, action) => (state.map( v => {
  if (v.url === action.payload.url){ 
    const route = action.payload;
    return { ...route, min: route.min ? minStyleParams : null };
  }
  return v;
}));

export default (state = initState, action) => {
  const mapTypeToHandler = {
    [ACTION_TYPE.OPEN_APP]: openApp,
    [ACTION_TYPE.CLOSE_APP]: closeApp,
    [ACTION_TYPE.APP_MAX]: maximize,
    [ACTION_TYPE.APP_MIN]: minimize,
  };
  const handler= mapTypeToHandler[action.type];
  if (!handler || !action.type){return state};
  return handler(state, action);
}
