import { all } from 'redux-saga/effects';
import RegisterSaga from './components/Register/sagas';
import LoginSaga from './components/Login/sagas';
import NewPollSaga from './components/NewPoll/sagas';
import PollSaga from './components/Poll/sagas';

export default function* IndexSaga () {
  yield all([
    RegisterSaga(),
    LoginSaga(),
    NewPollSaga(),
    PollSaga()
  ])
}
