import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import registerRequest from "./actions";
import Input from "../Lib/Input";
import ErrorBoundary from "../Lib/ErrorBoundary";

const nameRequired = value => (value ? undefined : "Name Required");
const emailRequired = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const passwordRequired = value => (value ? undefined : "Password Required");

class Register extends Component {
  toastId = null;
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !this.props.register.requesting &&
      !this.props.register.successful &&
      this.props.register.errors.length > 0
    ) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Failed to resigter.", { autoClose: 5000 });
      }
    }
  }
  submit = values => {
    const { reset } = this.props;
    this.props.registerRequest(values);
    reset();
  };
  render() {
    const {
      handleSubmit,
      invalid,
      register: { requesting, successful }
    } = this.props;

    return (
      <ErrorBoundary>
        <div>
          {!successful && (
            <Grid>
              <Row>
                <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
                  <div className="page">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit(this.submit)}>
                      <Field
                        name="name"
                        label="Name"
                        controlId="name"
                        bsSize="large"
                        type="text"
                        validate={nameRequired}
                        component={Input}
                      />
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
                        Register
                      </Button>
                    </form>
                  </div>
                </Col>
              </Row>
            </Grid>
          )}
          {!requesting && successful && <Redirect to="/login" />}
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  register: state.register
});

const connected = connect(mapStateToProps, { registerRequest })(Register);

const formed = reduxForm({
  form: "register"
})(connected);

export default formed;
