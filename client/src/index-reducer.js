import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './components/User/reducer';
import register from './components/Register/reducer';
import login from './components/Login/reducer';
import newpoll from './components/NewPoll/reducer';
import poll from './components/Poll/reducer';
import polls from './components/Polls/reducer';

const IndexReducer = combineReducers({
  register,
  user,
  login,
  newpoll,
  poll,
  form,
  polls
});

export default IndexReducer;
