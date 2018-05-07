import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
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
    const response = yield call(getPollsApi);
    yield put(pollsGetSuccess(response));
  } catch (error) {
    yield put(pollsGetError(error));
  }
}

function* getPollsWatcher() {
  yield takeLatest(POLLS_GETTING, getPollsFlow);
}

export default getPollsWatcher;
