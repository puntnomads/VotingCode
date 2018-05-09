import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { POLL_CREATING } from "./constants";

import { pollCreateSuccess, pollCreateError } from "./actions";

const createPollUrl = "/api/polls";

function createPollApi(name, options, tags, title) {
  return axios
    .post(createPollUrl, { name, options, tags, title })
    .then(function(response) {
      return response.data.poll;
    })
    .catch(function(error) {
      throw error;
    });
}

function* createPollFlow(action) {
  try {
    const { name, options, tags, title, token } = action;
    yield put(showLoading());
    const response = yield call(
      createPollApi,
      name,
      options,
      tags,
      title,
      token
    );
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
