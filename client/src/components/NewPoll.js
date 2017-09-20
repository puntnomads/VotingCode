import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class NewPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      option1: "",
      option2: "",
      number: 2,
      current: ""
    };
  }

  validateForm = () => {
    return (
      this.state.title.length > 0 &&
      this.state.option1.length > 0 &&
      this.state.option2.length > 0
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      current: event.target.id
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  addOption = () => {
    const number = this.state.number + 1;
    this.setState({
      number: number
    });
  };

  deleteOption = () => {
    const number = this.state.number - 1;
    this.setState({
      number: number
    });
  };

  validateState = (ref, value) => {
    if(this.state[value] === undefined){
      this.setState({
        [value]: ''
      });
    }
    const current = this.state.current;
    if (
      this.refs[ref] !== undefined &&
      this.state[value].length === 0 &&
      current === value
    ) {
      return "error";
    }
  };

  render() {
    const number = this.state.number;
    const option = `option${number}`;
    return (
      <div className="login">
        <h1>New Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="title"
            bsSize="large"
            ref={"title"}
            validationState={this.validateState("title", "title")}
          >
            <ControlLabel>Title</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormGroup>
          {[...Array(number)].map((x, i) => {
            if (i < 2) {
              return (
                <FormGroup
                  key={i + 1}
                  controlId={`option${i + 1}`}
                  bsSize="large"
                  ref={`option${i + 1}`}
                  validationState={this.validateState(
                    `option${i + 1}`,
                    `option${i + 1}`
                  )}
                >
                  <ControlLabel>
                    Option {i + 1}
                  </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.option}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              );
            } else {
              return (
                <FormGroup
                  key={i + 1}
                  controlId={`option${i + 1}`}
                  bsSize="large"
                  ref={`option${i + 1}`}
                  validationState={this.validateState(
                    `option${i + 1}`,
                    `option${i + 1}`
                  )}
                >
                  <ControlLabel>
                    Option {i + 1}
                  </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.option}
                    onChange={this.handleChange}
                  />
                  <div className="text-center">
                    <Button
                      className="delete"
                      bsSize="xsmall"
                      bsStyle="danger"
                      onClick={this.deleteOption}
                      type="button"
                    >
                      Delete
                    </Button>
                  </div>
                </FormGroup>
              );
            }
          })}
          <div className="text-center">
            <Button
              className="add"
              bsSize="large"
              bsStyle="link"
              onClick={this.addOption}
              type="button"
            >
              Add Option
            </Button>
          </div>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
