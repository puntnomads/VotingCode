import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
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
      return response;
    })
    .catch(function(error) {
      throw error;
    });
}

function updatePollApi(token, options, id) {
  return axios
    .put(`${PollUrl}/${id}`, { options }, { headers: { Authorization: token } })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getPollFlow(action) {
  try {
    const { id } = action;
    const response = yield call(getPollApi, id);
    yield put(pollGetSuccess(response.data[0]));
  } catch (error) {
    yield put(pollGetError(error));
  }
}

function* updatePollFlow(action) {
  try {
    const { token, options, id } = action;
    const response = yield call(updatePollApi, token, options, id);
    yield put(pollUpdateSuccess(response.data));
  } catch (error) {
    yield put(pollUpdateError(error));
  }
}

function* getPollWatcher() {
  yield [
    takeLatest(POLL_GETTING, getPollFlow),
    takeLatest(POLL_UPDATING, updatePollFlow)
  ];
}

export default getPollWatcher;
