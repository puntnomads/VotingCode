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
import { LinkContainer } from "react-router-bootstrap";
import { Chart } from "react-google-charts";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Story 1:Adding Headers",
      options: {
        title: "",
        pieHole: 0.4,
        is3D: true
      },
      data: [
        ["Title", "Option"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7]
      ],
      tags: ["React", "Redux", "Webpack", "NodeJS", "Express", "MongoDB"],
      selected: []
    };
  }

  handleTagsChange = event => {
    if (event[0] !== undefined) {
      const selected = this.state.selected.concat(event[0]);
      console.log(selected);
      this.setState({
        selected: selected
      });
      this.refs.typeahead.getInstance().clear();
    }
  };

  handleChanged = event => {
    if (this.state.tags.indexOf(event.target.value) > -1) {
      const selected = this.state.selected.concat(event.target.value);
      event.target.value = "";
      this.setState({
        selected: selected
      });
    }
  };

  render() {
    const title = this.state.title;
    const tags = this.state.tags;
    return (
      <div className="form">
        <h1>
          {title}
        </h1>
        <form onSubmit={this.handleSubmit}>
          <Grid>
            <Row className="home">
              <Col xs={12} sm={2}>
                <FormControl
                  componentClass="select"
                  placeholder="please select"
                >
                  <option value="select">10</option>
                  <option value="other">20</option>
                </FormControl>
              </Col>
              <Col xs={12} sm={2}>
                <p>or vote with</p>
              </Col>
              <Col xs={12} sm={2}>
                <FormControl
                  type="password"
                  value={this.state.password}
                  onBlur={this.handleBlurred}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </Grid>
          {this.state.selected.map((tag, i) =>
            <a className="tag" key={i}>
              {tag} <Glyphicon glyph="remove" />
            </a>
          )}
          <input
            type="text"
            list="data"
            onChange={this.handleChanged}
            placeholder="Add a tag"
          />
          <datalist id="data">
            {this.state.tags.map((item, i) =>
              <option key={i} value={item}>
                {item}
              </option>
            )}
          </datalist>
          <Button block bsSize="large" type="submit">
            Vote
          </Button>
        </form>
        <Chart
          chartTitle="DonutChart"
          chartType="PieChart"
          width="50%"
          data={this.state.data}
          options={this.state.options}
        />
      </div>
    );
  }
}
