import React, { Component } from "react";
import { connect } from "react-redux";
import { unsetUser } from "./User/actions";
import history from "../history";

class Logout extends Component {
  componentWillMount() {
    this.props.unsetUser();
    history.push("/login");
  }
  render() {
    return <h1>Logging out...</h1>;
  }
}

const mapStateToProps = state => ({});

const connected = connect(mapStateToProps, { unsetUser })(Logout);

export default connected;
