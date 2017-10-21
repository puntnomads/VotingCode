import { USER_SET, USER_UNSET } from './constants';

const initialSate = {
  token: null,
  ttl: null,
  created: null,
  id: null
}

const reducer = function userReducer (state = initialSate, action) {
  switch (action.type) {
    case USER_SET:
      return {
        token: action.token,
        ttl: action.ttl,
        created: action.created,
        id: action.id
      }

    case USER_UNSET:
      return {
        token: null,
        ttl: null,
        created: null,
        id: null
      }

    default:
      return state;
  }
}

export default reducer;
