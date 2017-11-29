import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  USER_POLLS_GETTING
} from "./constants";

import { userPollsGetSuccess, userPollsGetError } from "./actions";

const userpollsUrl = "http://localhost:3001/api/polls";

function getUserPollsApi (name) {
    return axios.get(`${userpollsUrl}/${name}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

function* getUserPollsFlow (action) {
  try {
    const { name } = action;
    const response = yield call(getUserPollsApi, name);
    yield put(userPollsGetSuccess(response));
  } catch (error) {
    yield put(userPollsGetError(error));
  }
}

function* getUserPollsWatcher () {
  yield takeLatest(USER_POLLS_GETTING, getUserPollsFlow);
}

export default getUserPollsWatcher;
