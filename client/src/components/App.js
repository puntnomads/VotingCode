import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import Main from "./Main";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Main />
        </div>
      </Router>
    );
  }
}
