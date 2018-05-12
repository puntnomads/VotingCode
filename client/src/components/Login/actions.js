import { LOGIN_REQUESTING } from "./constants";

const loginRequest = function loginRequest(values) {
  return {
    type: LOGIN_REQUESTING,
    values
  };
};

export default loginRequest;
