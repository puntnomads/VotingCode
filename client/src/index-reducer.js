import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './components/User/reducer';
import register from './components/Register/reducer';

const IndexReducer = combineReducers({
  register,
  user,
  form,
});

export default IndexReducer;
