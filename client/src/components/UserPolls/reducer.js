import {
  USER_POLLS_GETTING,
  USER_POLLS_GETTING_SUCCESS,
  USER_POLLS_GETTING_ERROR,
  USER_POLL_DELETING,
  USER_POLL_DELETING_SUCCESS,
  USER_POLL_DELETING_ERROR
} from "./constants";

const initialState = {
  userPolls: [],
  deletedPoll: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function userPollsReducer(state = initialState, action) {
  switch (action.type) {
    case USER_POLLS_GETTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: `User polls are being retrieved from the backend.`,
            time: new Date()
          }
        ],
        errors: []
      };

    case USER_POLLS_GETTING_SUCCESS:
      return {
        ...state,
        userPolls: action.userPolls,
        requesting: false,
        successful: true,
        messages: [
          {
            body: `User polls have successfully being retrieved from the backend.`,
            time: new Date()
          }
        ],
        errors: []
      };

    case USER_POLLS_GETTING_ERROR:
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

      case USER_POLL_DELETING:
        return {
          ...state,
          requesting: true,
          successful: false,
          messages: [
            {
              body: `User poll is being deleted from the backend.`,
              time: new Date()
            }
          ],
          errors: []
        };

      case USER_POLL_DELETING_SUCCESS:
        return {
          ...state,
          deletedPoll: action.deletedPoll,
          requesting: false,
          successful: true,
          messages: [
            {
              body: `User poll has successfully being deleted from the backend.`,
              time: new Date()
            }
          ],
          errors: []
        };

      case USER_POLL_DELETING_ERROR:
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
