import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  REGISTER_REQUESTING,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from "./constants";

const signupUrl = "/api/auth/register";

function signupApi(name, email, password) {
  return axios
    .post(signupUrl, { name, email, password })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      throw error;
    });
}

function* registerFlow(action) {
  try {
    const { name, email, password } = action;
    yield put(showLoading());
    const response = yield call(signupApi, name, email, password);
    yield put(hideLoading());
    yield put({ type: REGISTER_SUCCESS, response });
  } catch (error) {
    yield put(hideLoading());
    yield put({ type: REGISTER_ERROR, error });
  }
}

function* registerWatcher() {
  yield takeEvery(REGISTER_REQUESTING, registerFlow);
}

export default registerWatcher;
