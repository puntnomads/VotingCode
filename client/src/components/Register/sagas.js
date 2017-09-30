import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  REGISTER_REQUESTING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './constants';

// http://localhost:3001/register
const signupUrl = "http://localhost:3001/api/auth/register";

function signupApi (name, email, password) {
    return axios.post(signupUrl, { name, email, password })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

function* registerFlow (action) {
  try {
    const { name, email, password } = action;
    const response = yield call(signupApi, name, email, password);
    console.log(response);
    yield put({ type: REGISTER_SUCCESS, response });
  } catch (error) {
    yield put({ type: REGISTER_ERROR, error });
  }
}

function* registerWatcher () {
  yield takeLatest(REGISTER_REQUESTING, registerFlow)
}

export default registerWatcher;
