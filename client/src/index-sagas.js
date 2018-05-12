import { all } from "redux-saga/effects";
import RegisterSaga from "./components/Register/sagas";
import LoginSaga from "./components/Login/sagas";
import ForgotPasswordSaga from "./components/ForgotPassword/sagas";
import ResetPasswordSaga from "./components/ResetPassword/sagas";
import NewPollSaga from "./components/NewPoll/sagas";
import PollSaga from "./components/Poll/sagas";
import PollsSaga from "./components/Polls/sagas";
import UserPollsSaga from "./components/UserPolls/sagas";

export default function* IndexSaga() {
  yield all([
    RegisterSaga(),
    LoginSaga(),
    ForgotPasswordSaga(),
    ResetPasswordSaga(),
    NewPollSaga(),
    PollSaga(),
    PollsSaga(),
    UserPollsSaga()
  ]);
}
