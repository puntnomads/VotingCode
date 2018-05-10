import { USER_SET, USER_UNSET } from "./constants";

export const setUser = function setUser(values) {
  return {
    type: USER_SET,
    ...values
  };
};

export const unsetUser = function unsetUser() {
  return {
    type: USER_UNSET
  };
};
