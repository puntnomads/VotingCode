import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { POLL_GETTING, POLL_UPDATING } from "./constants";

import {
  pollGetSuccess,
  pollGetError,
  pollUpdateSuccess,
  pollUpdateError
} from "./actions";

const PollUrl = "/api/polls";

function getPollApi(id) {
  return axios
    .get(`${PollUrl}/${id}`)
    .then(function(response) {
      return response.data.poll;
    })
    .catch(function(error) {
      throw error;
    });
}

function updatePollApi(options, id) {
  return axios
    .put(`${PollUrl}/${id}`, { options })
    .then(function(response) {
      return response.data.poll;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getPollFlow(action) {
  try {
    const { id } = action;
    yield put(showLoading());
    const response = yield call(getPollApi, id);
    yield put(hideLoading());
    yield put(pollGetSuccess(response));
  } catch (error) {
    yield put(hideLoading());
    yield put(pollGetError(error));
  }
}

function* updatePollFlow(action) {
  try {
    const { options, id } = action;
    yield put(showLoading());
    const response = yield call(updatePollApi, options, id);
    yield put(hideLoading());
    yield put(pollUpdateSuccess(response));
  } catch (error) {
    yield put(hideLoading());
    yield put(pollUpdateError(error));
  }
}

function* getPollWatcher() {
  yield [
    takeEvery(POLL_GETTING, getPollFlow),
    takeEvery(POLL_UPDATING, updatePollFlow)
  ];
}

export default getPollWatcher;
