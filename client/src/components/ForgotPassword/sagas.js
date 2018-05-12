import { call, put, takeEvery } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import axios from "axios";
import {
  FORGOT_PASSWORD_REQUESTING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR
} from "./constants";

const forgotPasswordUrl = "/api/auth/forgot-password";

function forgotPasswordApi(values) {
  return axios
    .post(forgotPasswordUrl, values)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

function* forgotPasswordFlow(action) {
  try {
    yield put(showLoading());
    yield call(forgotPasswordApi, action.values);
    yield put(hideLoading());
    yield put({ type: FORGOT_PASSWORD_SUCCESS });
  } catch (error) {
    yield put(hideLoading());
    yield put({ type: FORGOT_PASSWORD_ERROR, error });
  }
}

function* forgotPasswordWatcher() {
  yield takeEvery(FORGOT_PASSWORD_REQUESTING, forgotPasswordFlow);
}

export default forgotPasswordWatcher;
