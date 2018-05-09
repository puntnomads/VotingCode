import {
  POLL_CREATING,
  POLL_CREATE_SUCCESS,
  POLL_CREATE_ERROR,
  POLL_CREATE_RESET
} from "./constants";

export const pollCreate = function pollCreate({ name, options, tags, title }) {
  return {
    type: POLL_CREATING,
    name,
    options,
    tags,
    title
  };
};

export const pollCreateSuccess = function pollCreateSuccess(poll) {
  return {
    type: POLL_CREATE_SUCCESS,
    poll
  };
};

export const pollCreateError = function pollCreateError(error) {
  return {
    type: POLL_CREATE_ERROR,
    error
  };
};

export const pollCreateReset = function pollCreateReset() {
  return {
    type: POLL_CREATE_RESET
  };
};
