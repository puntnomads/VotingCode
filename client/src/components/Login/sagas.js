import { take, fork, cancel, call, put, cancelled } from "redux-saga/effects";
import history from '../../history';
import axios from 'axios';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import { setUser, unsetUser } from "../User/actions";
import { USER_UNSET } from "../User/constants";

const loginUrl = "http://localhost:3001/api/auth/login";

function loginApi (email, password) {
    return axios.post(loginUrl, { email, password })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

function* logout () {
  yield put(unsetUser());
  localStorage.removeItem('token');
  history.push('/login');
}

function* loginFlow (email, password) {
  let token;
  try {
    token = yield call(loginApi, email, password);
    yield put(setUser(token));
    yield put({ type: LOGIN_SUCCESS });
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/polls');
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
  } finally {
    if (yield cancelled()) {
      history.push('/login');
    }
  }
  return token;
}

function* loginWatcher() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUESTING);
    const task = yield fork(loginFlow, email, password);
    const action = yield take([USER_UNSET, LOGIN_ERROR]);
    if (action.type === USER_UNSET) yield cancel(task);
    yield call(logout);
  }
}

export default loginWatcher;
