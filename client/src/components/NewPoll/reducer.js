import {
  POLL_CREATING,
  POLL_CREATE_SUCCESS,
  POLL_CREATE_ERROR,
  POLL_CREATE_RESET
} from "./constants";

const initialState = {
  newPoll: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function newPollReducer(state = initialState, action) {
  switch (action.type) {
    case POLL_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: `Poll: ${action.title} being created...`,
            time: new Date()
          }
        ],
        errors: []
      };

    case POLL_CREATE_SUCCESS:
      return {
        ...state,
        newPoll: action.poll,
        requesting: false,
        successful: true,
        messages: [
          {
            body: `Poll: ${action.poll.title} created!`,
            time: new Date()
          }
        ],
        errors: []
      };

    case POLL_CREATE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date()
          }
        ])
      };

    case POLL_CREATE_RESET:
      return {
        ...state,
        newPoll: {},
        requesting: false,
        successful: false,
        messages: [],
        errors: []
      };

    default:
      return state;
  }
};

export default reducer;
