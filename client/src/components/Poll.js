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
      selected: [],
      authenticated: true
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
    console.log(this.state.data);
    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
      <div className="page">
        <h1>
          {title}
        </h1>
        <form onSubmit={this.handleSubmit}>
            <Row className="home">
              <Col xs={12} md={5}>
                <FormControl
                  componentClass="select"
                  placeholder="please select"
                >
                  {this.state.data.map((item, i) => {
                if(i > 0){
                    return <option key={i} value={item[0]}>{item[0]}</option>
                }
                else {
                    return null
                }
              }
                  )}
                </FormControl>
              </Col>
              <Col xs={12} md={2}>
                <p>or vote with</p>
              </Col>
              <Col xs={12} md={5}>
                <FormControl
                  type="text"
                  value={this.state.password}
                  onBlur={this.handleBlurred}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          {this.state.selected.map((tag, i) =>
            <a className="tag" key={i}>
              {tag} <Glyphicon glyph="remove" />
            </a>
          )}
          <input
            className="taginput"
            type="text"
            list="data"
            onChange={this.handleChanged}
            placeholder="Add a tag"
          />
          <datalist id="data">
            <select>
            {this.state.tags.map((item, i) =>
              <option key={i} value={item}>
                {item}
              </option>
            )}
          </select>
          </datalist>
          <Button block bsSize="large" type="submit">
            Vote
          </Button>
          <Chart
            chartType="PieChart"
            width="100%"
            data={this.state.data}
            options={this.state.options}
          />
        </form>
      </div>
    </Col>
  </Row>
</Grid>
    );
  }
}
