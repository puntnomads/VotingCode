import { REGISTER_REQUESTING } from './constants';

const registerRequest = function registerRequest ({ name, email, password }) {
  return {
    type: REGISTER_REQUESTING,
    name,
    email,
    password,
  }
}

export default registerRequest;
