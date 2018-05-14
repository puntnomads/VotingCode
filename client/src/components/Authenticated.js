import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const AuthenticationHOC = WrappedComponent => {
  class Authenticated extends Component {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }
    checkAuthentication(params) {
      const { history } = params;
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        history.replace({ pathname: "/polls" });
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return withRouter(Authenticated);
};

export default AuthenticationHOC;
