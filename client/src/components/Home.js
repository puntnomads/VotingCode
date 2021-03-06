import React, { Component } from "react";
import { Grid, Row, Col, Button, Jumbotron, Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ErrorBoundary from "./Lib/ErrorBoundary";

class Home extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div>
          <Jumbotron className="jumbotron">
            <h1>VotingCode</h1>
            <h3>Create and take polls about code</h3>
            <p>
              <LinkContainer to="/polls">
                <Button bsStyle="primary">View Polls</Button>
              </LinkContainer>
            </p>
            <p>
              Or{" "}
              <LinkContainer to="/login">
                <a>log in</a>
              </LinkContainer>{" "}
              to create your own poll
            </p>
          </Jumbotron>
          <Grid>
            <Row className="home">
              <Col xs={12} sm={4}>
                <Glyphicon glyph="ok" />
                <h3>Take polls</h3>
                <p>You can take polls created by other users</p>
              </Col>
              <Col xs={12} sm={4}>
                <Glyphicon glyph="plus-sign" />
                <h3>Create polls</h3>
                <p>You can create polls that other users can vote on</p>
              </Col>
              <Col xs={12} sm={4}>
                <Glyphicon glyph="stats" />
                <h3>Statistics</h3>
                <p>You can view polls created by other users</p>
              </Col>
            </Row>
          </Grid>
        </div>
      </ErrorBoundary>
    );
  }
}

export default Home;
