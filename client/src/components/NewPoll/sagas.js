import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { POLL_CREATING } from "./constants";

import { pollCreateSuccess, pollCreateError } from "./actions";

const createPollUrl = "/api/polls";

function createPollApi(values) {
  return axios
    .post(createPollUrl, values)
    .then(function(response) {
      return response.data.poll;
    })
    .catch(function(error) {
      throw error;
    });
}

function* createPollFlow(values) {
  try {
    yield put(showLoading());
    const response = yield call(createPollApi, values);
    yield put(hideLoading());
    yield put(pollCreateSuccess(response));
  } catch (error) {
    yield put(hideLoading());
    yield put(pollCreateError(error));
  }
}

function* createPollWatcher() {
  yield takeEvery(POLL_CREATING, createPollFlow);
}

export default createPollWatcher;
