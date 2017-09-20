import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  validateForm = () => {
    return this.state.email.length > 0
      && this.state.password.length > 0;
  }

  handleChange = (event) => {
    const boolean = event.target.id + 'Empty';
    if(event.target.value.length > 0){
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
  }

  handleBlurred = (event) => {
    const boolean = event.target.id + 'Empty';
      this.setState({
        [event.target.id]: event.target.value,
        [boolean]: true
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  validateState = value => {
    const boolean = value + 'Empty';
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
      <div className="form">
      <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large"
            validationState={this.validateState("email")}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onBlur={this.handleBlurred}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large"
            validationState={this.validateState("password")}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onBlur={this.handleBlurred}
              onChange={this.handleChange} />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={ ! this.validateForm() }
            type="submit">
            Login
          </Button>
          <LinkContainer to="/register">
          <Button
            block
            bsSize="large"
            bsStyle="link"
            type="button">
            Register
          </Button>
          </LinkContainer>
        </form>
      </div>
    );
  }
}
