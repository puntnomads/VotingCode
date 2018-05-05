import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Messages from "../Notifications/Messages";
import Errors from "../Notifications/Errors";
import loginRequest from "./actions";
import Input from "../Lib/Input";

const emailRequired = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const passwordRequired = value => (value ? undefined : "Password Required");

class Login extends Component {
  submit = values => {
    const { reset } = this.props;
    this.props.loginRequest(values);
    reset();
  };

  render() {
    const {
      handleSubmit,
      invalid,
      login: { requesting, successful, messages, errors }
    } = this.props;

    return (
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
                <Button block bsSize="large" disabled={invalid} type="submit">
                  Login
                </Button>
              </form>
              <div className="auth-messages">
                {!requesting &&
                  !!errors.length && (
                    <Errors
                      message="Failure to login due to:"
                      errors={errors}
                    />
                  )}
                {!requesting &&
                  !!messages.length && <Messages messages={messages} />}
                {requesting && <div>Logging in...</div>}
                {!requesting &&
                  !successful && (
                    <LinkContainer to="/register">
                      <a>Need to register? Click Here »</a>
                    </LinkContainer>
                  )}
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
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
