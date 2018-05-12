import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import resetPasswordRequest from "./actions";
import Input from "../Lib/Input";
import ErrorBoundary from "../Lib/ErrorBoundary";

const passwordRequired = value =>
  value ? undefined : "Please enter a new password";
const confirmPasswordRequired = value =>
  value ? undefined : "Please confirm new password";

class ResetPassword extends Component {
  toastId = null;
  submit = values => {
    const { reset } = this.props;
    if (values.password !== values.confirmPassword) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Passwords must match.", {
          autoClose: 5000
        });
      }
    } else {
      values["token"] = this.props.match.params.token;
      this.props.resetPasswordRequest(values);
      reset();
    }
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
                  <h1>Reset Password</h1>
                  <form onSubmit={handleSubmit(this.submit)}>
                    <Field
                      name="password"
                      label="Password"
                      controlId="password"
                      bsSize="large"
                      type="password"
                      validate={passwordRequired}
                      component={Input}
                    />
                    <Field
                      name="confirmPassword"
                      label="Confirm Password"
                      controlId="confirmPassword"
                      bsSize="large"
                      type="password"
                      validate={confirmPasswordRequired}
                      component={Input}
                    />
                    <Button
                      block
                      bsSize="large"
                      disabled={invalid}
                      type="submit"
                    >
                      Change Password
                    </Button>
                  </form>
                </div>
              </Col>
            </Row>
          </Grid>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resetPassword: state.resetPassword
});

const connected = connect(mapStateToProps, { resetPasswordRequest })(
  ResetPassword
);

const formed = reduxForm({
  form: "resetPassword"
})(connected);

export default formed;
