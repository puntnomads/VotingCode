import { USER_SET, USER_UNSET } from './constants'

export function setUser ({ token, ttl, created, id }) {
  return {
    type: USER_SET,
    token,
    ttl,
    created,
    id
  }
}

export function unsetUser () {
  return {
    type: USER_UNSET,
  }
}
