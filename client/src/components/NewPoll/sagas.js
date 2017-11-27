import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  POLL_CREATING
} from "./constants";

import { pollCreateSuccess, pollCreateError } from "./actions";

const createPollUrl = "http://localhost:3001/api/polls";

function createPollApi (name, options, tags, title, token) {
  console.log(token);
    return axios.post(createPollUrl,{ name, options, tags, title },{headers:{Authorization: token }})
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw error;
    });
}

function* createPollFlow (action) {
  try {
    const { name, options, tags, title, token } = action;
    const response = yield call(createPollApi, name, options, tags, title, token);
    yield put(pollCreateSuccess(response.data));
  } catch (error) {
    yield put(pollCreateError(error));
  }
}

function* createPollWatcher () {
  yield takeLatest(POLL_CREATING, createPollFlow);
}

export default createPollWatcher;
