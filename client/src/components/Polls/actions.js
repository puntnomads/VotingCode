import {
  POLLS_GETTING,
  POLLS_GETTING_SUCCESS,
  POLLS_GETTING_ERROR
} from "./constants";

export const pollsGet = function pollsGet () {
  return {
    type: POLLS_GETTING,
  }
}

export const pollsGetSuccess = function pollsGetSuccess (polls) {
  return {
    type: POLLS_GETTING_SUCCESS,
    polls,
  }
}

export const pollsGetError = function pollsGetError (error) {
  return {
    type: POLLS_GETTING_ERROR,
    error,
  }
}
