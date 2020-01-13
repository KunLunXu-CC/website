import _ from 'lodash';
import { combineReducers } from 'redux';

export default (models) => {
  const reducers = {};
  models.forEach( ele => {
    reducers[ele.namespace] = (state = ele.state, { type, ... rest }) => {
      const hande = _.find(ele.reducers, (value, key) => (
        type === `${ele.namespace}/${key}`
      ));
      return hande ? hande(state, rest) : state;
    }
  });
  return combineReducers(reducers);
}
