import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { checkUser } from "./Lib/checkUser";

const AuthorizationHOC = WrappedComponent => {
  class Authorized extends Component {
    componentWillMount() {
      this.checkAuthorization(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthorization(nextProps);
      }
    }

    checkAuthorization(params) {
      const { history } = params;
      const user = JSON.parse(localStorage.getItem("user"));
      if (checkUser(user)) {
        return null;
      } else {
        history.replace({ pathname: "/logout" });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(Authorized);
};

export default AuthorizationHOC;
