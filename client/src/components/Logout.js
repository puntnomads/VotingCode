import React, { Component } from "react";
import history from "../history";

class Logout extends Component {
  componentWillMount() {
    localStorage.removeItem("user");
    history.push("/login");
  }
  render() {
    return <h1>Logging out...</h1>;
  }
}

export default Logout;
