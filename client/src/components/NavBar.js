import React, { Component } from "react";
import { connect } from "react-redux";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    const isLoggedIn = user.token ? true : false;
    if (isLoggedIn) {
      return (
        <Navbar inverse collapseOnSelect className="navbar">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home">VotingCode</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/polls">
                <NavItem eventKey={1}>Polls</NavItem>
              </LinkContainer>
              <LinkContainer to="/newpoll">
                <NavItem eventKey={2}>New Poll</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={3} title="..." id="basic-nav-dropdown">
                <LinkContainer to="/polls">
                  <MenuItem eventKey={3.1}>My Polls</MenuItem>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <MenuItem eventKey={3.2}>Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <MenuItem eventKey={3.3}>Log out</MenuItem>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    return (
      <Navbar inverse collapseOnSelect className="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">VotingCode</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/polls">
              <NavItem eventKey={2} href="#">
                Polls
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/login">
              <NavItem eventKey={1} href="#">
                Login
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/register">
              <NavItem eventKey={2} href="#">
                Register
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const connected = connect(mapStateToProps, {})(NavBar);

export default connected;
