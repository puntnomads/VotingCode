import { USER_SET, USER_UNSET } from "./constants";

export const setUser = function setUser({ token, ttl, created, name, email }) {
  return {
    type: USER_SET,
    token,
    ttl,
    created,
    name,
    email
  };
};

export const unsetUser = function unsetUser() {
  return {
    type: USER_UNSET
  };
};
