import ACTIONTYPE from '../actionTypes/common';

// 一般使用
export const add = () => {
  return {type: 'ADD'}
}

// 异步
export const clear = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({type: 'CLEAR'});
    console.log('打印状态', getState());
  }, 4000);
}
