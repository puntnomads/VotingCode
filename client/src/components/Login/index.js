import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import loginRequest from "./actions";
import Input from "../Lib/Input";
import ErrorBoundary from "../Lib/ErrorBoundary";
import ForgotPassword from "../ForgotPassword";

const emailRequired = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const passwordRequired = value => (value ? undefined : "Password Required");

class Login extends Component {
  toastId = null;
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.login.requesting && !!this.props.login.errors.length) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          "Failed to login in. Please insure that you are registered and your details are correct.",
          { autoClose: 5000 }
        );
      }
    }
  }
  submit = values => {
    const { reset } = this.props;
    this.props.loginRequest(values);
    reset();
  };
  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <div>
        <ErrorBoundary>
          <Grid>
            <Row>
              <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
                <div className="page">
                  <h1>Login</h1>
                  <form onSubmit={handleSubmit(this.submit)}>
                    <Field
                      name="email"
                      label="Email"
                      controlId="email"
                      bsSize="large"
                      type="email"
                      validate={emailRequired}
                      component={Input}
                    />
                    <Field
                      name="password"
                      label="Password"
                      controlId="password"
                      bsSize="large"
                      type="password"
                      validate={passwordRequired}
                      component={Input}
                    />
                    <Button
                      block
                      bsSize="large"
                      disabled={invalid}
                      type="submit"
                    >
                      Login
                    </Button>
                  </form>
                </div>
              </Col>
            </Row>
          </Grid>
        </ErrorBoundary>
        <ForgotPassword />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const connected = connect(mapStateToProps, { loginRequest })(Login);

const formed = reduxForm({
  form: "login"
})(connected);

export default formed;
