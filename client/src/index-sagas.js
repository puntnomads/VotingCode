import { all } from 'redux-saga/effects';
import RegisterSaga from './components/Register/sagas';
import LoginSaga from './components/Login/sagas';

export default function* IndexSaga () {
  yield all([
    RegisterSaga(),
    LoginSaga(),
  ])
}
