import {
  POLL_CREATING,
  POLL_CREATE_SUCCESS,
  POLL_CREATE_ERROR
} from "./constants";

const initialState = {
  list: [], // where we'll store polls
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function pollReducer(state = initialState, action) {
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

    // On success include the new poll into our list
    // We'll render this list later.
    case POLL_CREATE_SUCCESS:
      return {
        list: state.list.concat([action.poll]),
        requesting: false,
        successful: true,
        messages: [
          {
            body: `Poll: ${action.poll.name} awesomely created!`,
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

    default:
      return state;
  }
};

export default reducer;
