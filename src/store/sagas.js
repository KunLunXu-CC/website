import { take } from 'redux-saga/effects';

export function* helloSaga() {
  yield take('TO_LOGIN_OUT');

  console.log('Hello Sagas!');
}
