import { USER_SET, USER_UNSET } from './constants'

export function setUser ({ token, ttl, created, email }) {
  return {
    type: USER_SET,
    token,
    ttl,
    created,
    email
  }
}

export function unsetUser () {
  return {
    type: USER_UNSET,
  }
}
