import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './components/User/reducer';
import register from './components/Register/reducer';
import login from './components/Login/reducer';
import polls from './components/Polls/reducer';

const IndexReducer = combineReducers({
  register,
  user,
  login,
  polls,
  form,
});

export default IndexReducer;
