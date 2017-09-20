import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class NewPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      option1: "",
      option2: "",
      number: 2
    };
  }

  validateForm = () => {
    return (
      this.state.title.length > 0 &&
      this.state.option1.length > 0 &&
      this.state.option2.length > 0
    );
  };

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
    const boolean = `option${this.state.number}Empty`;
    this.setState({
      number: number,
      [boolean]: false
    });
  };

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
    const number = this.state.number;
    return (
      <div className="form">
        <h1>New Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="title"
            bsSize="large"
            validationState={this.validateState("title")}
          >
            <ControlLabel>Title</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.title}
              onBlur={this.handleBlurred}
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
                  validationState={this.validateState(`option${i + 1}`)}
                >
                  <ControlLabel>
                    Option {i + 1}
                  </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.option}
                    onBlur={this.handleBlurred}
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
                  validationState={this.validateState(`option${i + 1}`)}
                >
                  <ControlLabel>
                    Option {i + 1}
                  </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.option}
                    onBlur={this.handleBlurred}
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
