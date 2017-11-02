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
            const { history, user } = params;
            if (user !== null && user.token !== null) {
              history.replace({ pathname: '/polls' });
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
