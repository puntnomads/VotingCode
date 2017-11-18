import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './components/User/reducer';
import register from './components/Register/reducer';
import login from './components/Login/reducer';
import newpoll from './components/NewPoll/reducer';
import poll from './components/Poll/reducer';

const IndexReducer = combineReducers({
  register,
  user,
  login,
  newpoll,
  poll,
  form,
});

export default IndexReducer;
