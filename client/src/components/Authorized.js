import React from "react";
import { withRouter } from 'react-router-dom';
import { checkUser } from './Lib/CheckAuth';
import { connect } from "react-redux";

const AuthorizationHOC = (WrappedComponent) => {
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
            if (user !== null) {
              return null;
            }
            else if (checkUser(user)) {
              return null;
            }
            else {
              history.replace({ pathname: '/login' })
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
}

export default AuthorizationHOC;

// https://codeburst.io/react-router-v4-unofficial-migration-guide-5a370b8905a
