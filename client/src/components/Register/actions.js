import { REGISTER_REQUESTING } from "./constants";

const registerRequest = function registerRequest(values) {
  return {
    type: REGISTER_REQUESTING,
    values
  };
};

export default registerRequest;
