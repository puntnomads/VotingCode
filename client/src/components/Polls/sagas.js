import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  POLL_CREATING,
  POLL_CREATE_SUCCESS,
  POLL_CREATE_ERROR
} from "./constants";

const createPollUrl = "http://localhost:3001/api/auth/register";

function createPollApi (name, email, password) {
    return axios.post(signupUrl, { name, email, password })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw error;
    });
}

function* createPollFlow (action) {
  try {
    const { name, email, password } = action;
    const response = yield call(createPollApi, name, email, password);
    yield put({ type: POLL_CREATE_SUCCESS, response });
  } catch (error) {
    yield put({ type: POLL_CREATE_ERROR, error });
  }
}

function* createPollWatcher () {
  yield takeLatest(POLL_CREATING, createPollFlow);
}

export default createPollWatcher;
