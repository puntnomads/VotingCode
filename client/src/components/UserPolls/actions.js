import {
  USER_POLLS_GETTING,
  USER_POLLS_GETTING_SUCCESS,
  USER_POLLS_GETTING_ERROR
} from "./constants";

export const userPollsGet = function userPollsGet (name) {
  return {
    type: USER_POLLS_GETTING,
    name
  }
}

export const userPollsGetSuccess = function userPollsGetSuccess (userpolls) {
  return {
    type: USER_POLLS_GETTING_SUCCESS,
    userpolls,
  }
}

export const userPollsGetError = function userPollsGetError (error) {
  return {
    type: USER_POLLS_GETTING_ERROR,
    error,
  }
}
