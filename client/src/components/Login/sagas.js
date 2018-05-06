import { call, put, takeLatest } from "redux-saga/effects";
import history from "../../history";
import axios from "axios";
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import { setUser } from "../User/actions";

const loginUrl = "http://localhost:3001/api/auth/login";

function loginApi(values) {
  return axios
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
    const response = yield call(loginApi, values);
    yield put(setUser(response));
    yield put({ type: LOGIN_SUCCESS });
    history.push("/userpolls");
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
  }
}

function* loginWatcher() {
  yield takeLatest(LOGIN_REQUESTING, loginFlow);
}

export default loginWatcher;
