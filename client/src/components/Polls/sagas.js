import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { POLLS_GETTING } from "./constants";

import { pollsGetSuccess, pollsGetError } from "./actions";

const pollsUrl = "/api/polls";

function getPollsApi() {
  return axios
    .get(pollsUrl)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getPollsFlow() {
  try {
    yield put(showLoading());
    const response = yield call(getPollsApi);
    yield put(hideLoading());
    yield put(pollsGetSuccess(response));
  } catch (error) {
    yield put(hideLoading());
    yield put(pollsGetError(error));
  }
}

function* getPollsWatcher() {
  yield takeEvery(POLLS_GETTING, getPollsFlow);
}

export default getPollsWatcher;
