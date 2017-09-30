import { all } from 'redux-saga/effects';
import RegisterSaga from './components/Register/sagas';

export default function* IndexSaga () {
  yield all([
    RegisterSaga(),
  ])
}
