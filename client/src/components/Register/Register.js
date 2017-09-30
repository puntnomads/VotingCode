import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Messages from "../Notifications/Messages";
import Errors from "../Notifications/Errors";
import registerRequest from "./actions";

const nameRequired = value => (value ? undefined : "Name Required");
const emailRequired = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const passwordRequired = value => (value ? undefined : "Password Required");

class Input extends React.Component {
  render() {
    const {
      input,
      label,
      controlId,
      bsSize,
      type,
      meta: { touched },
      ...props
    } = this.props;

    const validationState =
      (touched && (input.value.length === 0 && "error")) || null;
    return (
      <FormGroup
        controlId={controlId}
        bsSize={bsSize}
        validationState={validationState}
      >
        <ControlLabel>
          {label}
        </ControlLabel>
        <FormControl {...input} type={type} {...props} />
      </FormGroup>
    );
  }
}

class Register extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    registerRequest: PropTypes.func.isRequired,
    register: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array
    }).isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
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
      register: { requesting, successful, messages, errors }
    } = this.props;
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
              <div className="auth-messages">
                {!requesting &&
                  !!errors.length &&
                  <Errors
                    message="Failure to signup due to:"
                    errors={errors}
                  />}
                {!requesting &&
                  !!messages.length &&
                  <Messages messages={messages} />}
                {!requesting &&
                  successful &&
                  <div>
                    Registration Successful!{" "}
                    <LinkContainer to="/login"><a>Click here to Login »</a></LinkContainer>
                  </div>}
                {!requesting &&
                  !successful &&
                  <LinkContainer to="/login"><a>Already a Member? Login Here »</a></LinkContainer>}
              </div>
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
