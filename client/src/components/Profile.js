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

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: "",
      newpassword: "",
      name: "Zak",
      email: "zak@email.com"
    };
  }

  validateForm = () => {
    return (
      this.state.oldpassword.length > 0 && this.state.newpassword.length > 0
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
            <div>
              <div className="page">
                <h1>Profile</h1>
                <form>
                  <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                      type="text"
                      className="profile"
                      disabled
                      value={this.state.name}
                    />
                  </FormGroup>
                  <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      type="text"
                      className="profile"
                      disabled
                      value={this.state.email}
                    />
                  </FormGroup>
                </form>
              </div>
              <div className="page">
                <h1>Change Password</h1>
                <form onSubmit={this.handleSubmit}>
                  <FormGroup
                    controlId="oldpassword"
                    bsSize="large"
                    validationState={this.validateState("oldpassword")}
                  >
                    <ControlLabel>Old password</ControlLabel>
                    <FormControl
                      type="password"
                      value={this.state.oldpassword}
                      onBlur={this.handleBlurred}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="newpassword"
                    bsSize="large"
                    validationState={this.validateState("newpassword")}
                  >
                    <ControlLabel>New password</ControlLabel>
                    <FormControl
                      type="password"
                      value={this.state.newpassword}
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
                    Change password
                  </Button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
