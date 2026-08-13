import { all, fork } from 'redux-saga/effects';

import { authSaga } from './authSaga';
import { orderSaga } from './orderSaga';

export function* rootSaga() {
  yield all([fork(authSaga), fork(orderSaga)]);
}
