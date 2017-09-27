import React from "react";
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

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  validateForm = () => {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  };

  handleChange = event => {
    const boolean = event.target.id + "Empty";
    if (event.target.value.length > 0) {
      this.setState({
        [event.target.id]: event.target.value,
        [boolean]: false
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value,
        [boolean]: true
      });
    }
  };

  handleBlurred = event => {
    const boolean = event.target.id + "Empty";
    this.setState({
      [event.target.id]: event.target.value,
      [boolean]: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  validateState = value => {
    const boolean = value + "Empty";
    if (
      this.state[value] !== undefined &&
      this.state[value].length === 0 &&
      this.state[boolean] === true
    ) {
      return "error";
    }
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
            <div className="page">
              <h1>Register</h1>
              <form onSubmit={this.handleSubmit}>
                <FormGroup
                  controlId="name"
                  bsSize="large"
                  validationState={this.validateState("name")}
                >
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.name}
                    onBlur={this.handleBlurred}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup
                  controlId="email"
                  bsSize="large"
                  validationState={this.validateState("email")}
                >
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    type="email"
                    value={this.state.email}
                    onBlur={this.handleBlurred}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup
                  controlId="password"
                  bsSize="large"
                  validationState={this.validateState("password")}
                >
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    type="password"
                    value={this.state.password}
                    onBlur={this.handleBlurred}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="submit"
                >
                  Register
                </Button>
                <LinkContainer to="/login">
                  <Button block bsSize="large" bsStyle="link" type="button">
                    Login
                  </Button>
                </LinkContainer>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
