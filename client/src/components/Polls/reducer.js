import {
  POLLS_GETTING,
  POLLS_GETTING_SUCCESS,
  POLLS_GETTING_ERROR
} from "./constants";

const initialState = {
  polls: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function pollReducer(state = initialState, action) {
  switch (action.type) {
    case POLLS_GETTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: `Polls are being retrieved from the backend.`,
            time: new Date()
          }
        ],
        errors: []
      };

    case POLLS_GETTING_SUCCESS:
      return {
        polls: action.polls,
        requesting: false,
        successful: true,
        messages: [
          {
            body: `Polls have successfully being retrieved from the backend.`,
            time: new Date()
          }
        ],
        errors: []
      };

    case POLLS_GETTING_ERROR:
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
