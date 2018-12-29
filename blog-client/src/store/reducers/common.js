
import { combineReducers } from 'redux';

const example = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return ++ state;
    case 'CLEAR':
      return state = 0;
    default:
      return state
  }
}

export default combineReducers({
  example,
});
