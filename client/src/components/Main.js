import React from "react";
import { Route, Switch } from "react-router-dom";
import Authenticated from "./Authenticated";
import Authorized from "./Authorized";
import Home from "./Home";
import Polls from "./Polls";
import UserPolls from "./UserPolls";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import NewPoll from "./NewPoll";
import Profile from "./Profile";
import Poll from "./Poll";

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/userpolls" component={UserPolls} />
          <Route exact path="/polls" component={Polls} />
          <Route exact path="/login" component={Authenticated(Login)} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Authenticated(Register)} />
          <Route exact path="/newpoll" component={Authorized(NewPoll)} />
          <Route exact path="/profile" component={Authorized(Profile)} />
          <Route exact path="/poll/:poll_id" component={Poll} />
          <Route exact path="/" component={Authenticated(Home)} />
          <Route
            render={function() {
              return <p>Not Found</p>;
            }}
          />
        </Switch>
      </div>
    );
  }
}
