import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import forgotPasswordRequest from "./actions";
import Input from "../Lib/Input";
import ErrorBoundary from "../Lib/ErrorBoundary";

const emailRequired = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const Title = styled.h3`
  margin-top: 70px;
`;

class ForgotPassword extends Component {
  toastId = null;
  recaptcha = "";
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !this.props.forgotPassword.requesting &&
      !!this.props.forgotPassword.errors.length
    ) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Failed to request forgot password.", {
          autoClose: 5000
        });
      }
    }
  }
  submit = values => {
    const { reset } = this.props;
    values["email"] = values["forgot_password_email"];
    delete values.forgot_password_email;
    if (this.recaptcha) {
      values["g-recaptcha-response"] = this.recaptcha;
      this.props.forgotPasswordRequest(values);
      reset();
    } else {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Please complete the reCAPTCHA.", {
          autoClose: 5000
        });
      }
    }
  };
  getRecaptchaValue = value => {
    this.recaptcha = value;
  };
  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <ErrorBoundary>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
              <div>
                <Title>Forgot Password</Title>
                <form onSubmit={handleSubmit(this.submit)}>
                  <Field
                    name="forgot_password_email"
                    label="Email"
                    controlId="forgot_password_email"
                    bsSize="large"
                    type="email"
                    validate={emailRequired}
                    component={Input}
                  />
                  <ReCAPTCHA
                    ref="recaptcha"
                    sitekey="6Lev4FgUAAAAAGVKXzP0eK7MfB5JYEBzu67_Z3Rv"
                    onChange={this.getRecaptchaValue}
                  />
                  <Button
                    block
                    bsSize="large"
                    disabled={invalid}
                    type="submit"
                    style={{ marginTop: "15px" }}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  forgotPassword: state.forgotPassword
});

const connected = connect(mapStateToProps, { forgotPasswordRequest })(
  ForgotPassword
);

const formed = reduxForm({
  form: "forgotPassword"
})(connected);

export default formed;
