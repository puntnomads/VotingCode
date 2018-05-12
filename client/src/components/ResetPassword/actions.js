import { RESET_PASSWORD_REQUESTING } from "./constants";

const resetPasswordRequest = function resetPasswordRequest(values) {
  return {
    type: RESET_PASSWORD_REQUESTING,
    values
  };
};

export default resetPasswordRequest;
