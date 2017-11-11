import {
  POLL_CREATING,
  POLL_CREATE_SUCCESS,
  POLL_CREATE_ERROR
} from "./constants";

// Create requires that we pass it our current logged in user AND poll params
// which you can view at http://widgetizer.jcolemorrison.com/explorer OR at
// localhost:3002/explorer if you're using the local API version.
export const pollCreate = function pollCreate (user, poll) {
  return {
    type: POLL_CREATING,
    user,
    poll,
  }
}

export const pollCreateSuccess = function pollCreateSuccess (poll) {
  return {
    type: POLL_CREATE_SUCCESS,
    poll,
  }
}

export const pollCreateError = function pollCreateError (error) {
  return {
    type: POLL_CREATE_ERROR,
    error,
  }
}
