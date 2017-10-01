import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './components/User/reducer';
import register from './components/Register/reducer';
import login from './components/Login/reducer';

const IndexReducer = combineReducers({
  register,
  user,
  login,
  form,
});

export default IndexReducer;
