import { USER_SET, USER_UNSET } from "./constants";

export const setUser = function setUser({ token, ttl, created, name }) {
  return {
    type: USER_SET,
    token,
    ttl,
    created,
    name
  };
};

export const unsetUser = function unsetUser() {
  return {
    type: USER_UNSET
  };
};
