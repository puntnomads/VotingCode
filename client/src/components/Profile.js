import React, { Component } from "react";
import { Grid, Row, Col, Panel } from "react-bootstrap";
import styled from "styled-components";
import ErrorBoundary from "./Lib/ErrorBoundary";

const Container = styled.div`
  margin-top: 100px;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 72px;
  margin-bottom: 40px;
`;
const PanelContainer = styled.div`
  margin-bottom: 40px;
`;

class Profile extends Component {
  user = JSON.parse(localStorage.getItem("user"));
  render() {
    return (
      <ErrorBoundary>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
              <div>
                <Container>
                  <Title>Profile</Title>
                  <PanelContainer>
                    <Panel bsStyle="primary" header="Name">
                      {this.user.name}
                    </Panel>
                    <PanelContainer />
                    <Panel bsStyle="info" header="Email">
                      {this.user.email}
                    </Panel>
                  </PanelContainer>
                </Container>
              </div>
            </Col>
          </Row>
        </Grid>
      </ErrorBoundary>
    );
  }
}

export default Profile;
