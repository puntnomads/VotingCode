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
      tags: ["React", "Redux", "NodeJS", "Express", "MongoDB"],
      authenticated: true
    };
  }

  addOption = event => {
    const value = event.target.value;
    console.log(value);
  }

  render() {
    const title = this.state.title;
    const alltags = this.state.alltags;
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
                  onChange={this.addOption}
                >
                  <option key={0}>Choose an option</option>
                  {this.state.data.map((item, i) => {
                if(i > 0){
                    return <option key={i+1} value={item[0]}>{item[0]}</option>
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
                  placeholder="your own version"
                  onChange={this.addOption}
                />
              </Col>
            </Row>
          <Button block bsSize="large" type="submit" className="vote">
            Vote
          </Button>
          <div className="displaytags">
        {this.state.tags.map((tag, i) =>
          <a className="tag" key={i}>
            {tag} <Glyphicon glyph="remove" />
          </a>
        )}
        </div>
          <div>
          <Chart
            chartType="PieChart"
            width="100%"
            data={this.state.data}
            options={this.state.options}
          />
          </div>
        </form>
      </div>
    </Col>
  </Row>
</Grid>
    );
  }
}
