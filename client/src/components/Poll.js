import React from "react";
import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Chart } from 'react-google-charts';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Story 1:Adding Headers',
      options: {
        "title":"",
        "pieHole":0.4,
        "is3D":true},
      data: [
        ["Title","Option"],
        ["Work",11],
        ["Eat",2],
        ["Commute",2],
        ["Watch TV",2],
        ["Sleep",7]
      ],
    };
  }

  render() {
    const title = this.state.title;
    return (
      <div className="form">
      <h1>{title}</h1>
        <form onSubmit={this.handleSubmit}>
      <Grid>
      <Row className="home">
        <Col xs={12} sm={2}>
          <FormControl componentClass="select" placeholder="please select">
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
            onChange={this.handleChange} />
        </Col>
      </Row>
    </Grid>
          <Button
            block
            bsSize="large"
            type="submit">
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
