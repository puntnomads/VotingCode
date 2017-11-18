import {
  POLL_GETTING,
  POLL_GETTING_SUCCESS,
  POLL_GETTING_ERROR,
  POLL_UPDATING,
  POLL_UPDATING_SUCCESS,
  POLL_UPDATING_ERROR
} from "./constants";

const initialState = {
  poll: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function pollReducer(state = initialState, action) {
  switch (action.type) {
    case POLL_GETTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: `Poll: ${action.title} is being get...`,
            time: new Date()
          }
        ],
        errors: []
      };

    case POLL_GETTING_SUCCESS:
      return {
        poll: action.poll,
        requesting: false,
        successful: true,
        messages: [
          {
            body: `Poll: ${action.poll.title} was gotten!`,
            time: new Date()
          }
        ],
        errors: []
      };

    case POLL_GETTING_ERROR:
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

    case POLL_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: `Poll: ${action.title} is being updated...`,
            time: new Date()
          }
        ],
        errors: []
      };

    case POLL_UPDATING_SUCCESS:
      return {
        poll: action.poll,
        requesting: false,
        successful: true,
        messages: [
          {
            body: `Poll: ${action.poll.title} was updated!`,
            time: new Date()
          }
        ],
        errors: []
      };

    case POLL_UPDATING_ERROR:
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

    default:
      return state;
  }
};

export default reducer;
