import React from "react";
import { withRouter } from 'react-router-dom';
import { checkUser } from './Lib/CheckAuth';
import { connect } from "react-redux";

const AuthenticationHOC = (WrappedComponent) => {
    class Authenticated extends React.Component {
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
            if (checkUser(params.user)) {
              history.replace({ pathname: '/poll' })
            } else {
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

    const connected = connect(mapStateToProps)(Authenticated);

    return withRouter(connected);
}

export default AuthenticationHOC;
