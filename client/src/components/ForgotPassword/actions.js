import { FORGOT_PASSWORD_REQUESTING } from "./constants";

const forgotPasswordRequest = function forgotPasswordRequest(values) {
  return {
    type: FORGOT_PASSWORD_REQUESTING,
    values
  };
};

export default forgotPasswordRequest;
