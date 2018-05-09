import { call, put, takeEvery } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import axios from "axios";
import history from "../../history";
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import { setUser } from "../User/actions";

const instance = axios.create();
const loginUrl = "/api/auth/login";

function loginApi(values) {
  return instance
    .post(loginUrl, values)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

function* loginFlow(values) {
  try {
    yield put(showLoading());
    const response = yield call(loginApi, values);
    yield put(hideLoading());
    yield put(setUser(response));
    yield put({ type: LOGIN_SUCCESS });
    history.push("/userpolls");
  } catch (error) {
    yield put(hideLoading());
    yield put({ type: LOGIN_ERROR, error });
  }
}

function* loginWatcher() {
  yield takeEvery(LOGIN_REQUESTING, loginFlow);
}

export default loginWatcher;
