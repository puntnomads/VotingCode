import React from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Glyphicon
} from "react-bootstrap";

export default class NewPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      option1: "",
      option2: "",
      number: 2,
      alltags: ["React", "Redux", "NodeJS", "Express", "MongoDB"],
      tags: []
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
    const boolean = value + "Empty";
    if (
      this.state[value] !== undefined &&
      this.state[value].length === 0 &&
      this.state[boolean] === true
    ) {
      return "error";
    }
  };

  handleChanged = event => {
    if (this.state.alltags.indexOf(event.target.value) > -1) {
      const tags = this.state.tags.concat(event.target.value);
      event.target.value = "";
      this.setState({
        tags: tags
      });
    }
  };

  render() {
    const number = this.state.number;
    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
            <div className="page">
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
                <div className="displaytags">
                {this.state.tags.map((tag, i) =>
                  <a className="tag" key={i}>
                    {tag} <Glyphicon glyph="remove" />
                  </a>
                )}
                </div>
                <div className="taginput">
                <input
                  type="text"
                  list="data"
                  onChange={this.handleChanged}
                  placeholder="Add a tag"
                />
                </div>
                <datalist id="data">
                  <select>
                  {this.state.alltags.map((item, i) =>
                    <option key={i} value={item}>
                      {item}
                    </option>
                  )}
                </select>
                </datalist>
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
          </Col>
        </Row>
      </Grid>
    );
  }
}
