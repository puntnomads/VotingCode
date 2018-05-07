import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import registerRequest from "./actions";
import Input from "../Lib/Input";

const nameRequired = value => (value ? undefined : "Name Required");
const emailRequired = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const passwordRequired = value => (value ? undefined : "Password Required");

class Register extends Component {
  submit = values => {
    const { reset } = this.props;
    this.props.registerRequest(values);
    reset();
  };
  render() {
    const { handleSubmit, invalid } = this.props;

    return (
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
                <Button block bsSize="large" disabled={invalid} type="submit">
                  Register
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
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
