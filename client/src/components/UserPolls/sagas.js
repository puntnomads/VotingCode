import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { USER_POLLS_GETTING, USER_POLL_DELETING } from "./constants";

import {
  userPollsGetSuccess,
  userPollsGetError,
  userPollDeleteSuccess,
  userPollDeleteError
} from "./actions";

const userPollsUrl = "/api/userpolls";
const deleteUserPollsUrl = "/api/polls";

function getUserPollsApi(name, token) {
  return axios
    .get(`${userPollsUrl}/${name}`, { headers: { Authorization: token } })
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

function deleteUserPollApi(pollID, token) {
  return axios
    .delete(`${deleteUserPollsUrl}/${pollID}`, {
      headers: { Authorization: token }
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getUserPollsFlow(action) {
  try {
    const { name, token } = action;
    const response = yield call(getUserPollsApi, name, token);
    yield put(userPollsGetSuccess(response));
  } catch (error) {
    yield put(userPollsGetError(error));
  }
}

function* deleteUserPollFlow(action) {
  try {
    const { pollID, token } = action;
    const response = yield call(deleteUserPollApi, pollID, token);
    yield put(userPollDeleteSuccess(response));
  } catch (error) {
    yield put(userPollDeleteError(error));
  }
}

function* getUserPollsWatcher() {
  yield [
    takeLatest(USER_POLLS_GETTING, getUserPollsFlow),
    takeLatest(USER_POLL_DELETING, deleteUserPollFlow)
  ];
}

export default getUserPollsWatcher;
