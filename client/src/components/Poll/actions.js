import {
  POLL_GETTING,
  POLL_GETTING_SUCCESS,
  POLL_GETTING_ERROR,
  POLL_UPDATING,
  POLL_UPDATING_SUCCESS,
  POLL_UPDATING_ERROR
} from "./constants";

export const pollGet = function pollGet(id) {
  return {
    type: POLL_GETTING,
    id
  };
};

export const pollGetSuccess = function pollGetSuccess(poll) {
  return {
    type: POLL_GETTING_SUCCESS,
    poll
  };
};

export const pollGetError = function pollGetError(error) {
  return {
    type: POLL_GETTING_ERROR,
    error
  };
};

export const pollUpdate = function pollUpdate(values) {
  return {
    type: POLL_UPDATING,
    ...values
  };
};

export const pollUpdateSuccess = function pollUpdateSuccess(poll) {
  return {
    type: POLL_UPDATING_SUCCESS,
    poll
  };
};

export const pollUpdateError = function pollUpdateError(error) {
  return {
    type: POLL_UPDATING_ERROR,
    error
  };
};
