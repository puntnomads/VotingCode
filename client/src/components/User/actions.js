import { USER_SET, USER_UNSET } from './constants';

export function setUser ({ token, ttl, created, name }) {
  return {
    type: USER_SET,
    token,
    ttl,
    created,
    name
  }
}

export function unsetUser () {
  return {
    type: USER_UNSET,
  }
}
