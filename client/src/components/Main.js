import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Polls from "./Polls";
import Login from "./Login";
import Register from "./Register";
import NewPoll from "./NewPoll";

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/polls' component={Polls}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/newpoll' component={NewPoll}/>
          <Route render={function () { return <p>Not Found</p> }} />
        </Switch>
      </div>
    )
  }
}
