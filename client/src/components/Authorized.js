import React from "react";
import { withRouter } from "react-router-dom";
import { checkUser } from "./Lib/checkAuth";
import { connect } from "react-redux";

const AuthorizationHOC = WrappedComponent => {
  class Authorized extends React.Component {
    componentWillMount() {
      this.checkAuthorization(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthorization(nextProps);
      }
    }

    checkAuthorization(params) {
      const { history, user } = params;
      if (checkUser(user)) {
        return null;
      } else {
        history.replace({ pathname: "/login" });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: state.user
  });

  const connected = connect(mapStateToProps)(Authorized);

  return withRouter(connected);
};

export default AuthorizationHOC;
