import {
  USER_POLLS_GETTING,
  USER_POLLS_GETTING_SUCCESS,
  USER_POLLS_GETTING_ERROR,
  USER_POLL_DELETING,
  USER_POLL_DELETING_SUCCESS,
  USER_POLL_DELETING_ERROR
} from "./constants";

export const userPollsGet = function userPollsGet (name, token) {
  return {
    type: USER_POLLS_GETTING,
    name,
    token
  }
}

export const userPollsGetSuccess = function userPollsGetSuccess (userPolls) {
  return {
    type: USER_POLLS_GETTING_SUCCESS,
    userPolls,
  }
}

export const userPollsGetError = function userPollsGetError (error) {
  return {
    type: USER_POLLS_GETTING_ERROR,
    error,
  }
}

export const userPollDelete = function userPollDelete (pollID, token) {
  return {
    type: USER_POLL_DELETING,
    pollID,
    token
  }
}

export const userPollDeleteSuccess = function userPollDeleteSuccess (deletedPoll) {
  return {
    type: USER_POLL_DELETING_SUCCESS,
    deletedPoll,
  }
}

export const userPollDeleteError = function userPollDeleteError (error) {
  return {
    type: USER_POLL_DELETING_ERROR,
    error,
  }
}
