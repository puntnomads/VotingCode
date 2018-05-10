import React, { Component } from "react";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavBar extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = user && user.token ? true : false;
    if (isLoggedIn) {
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
                <NavItem eventKey={1}>Polls</NavItem>
              </LinkContainer>
              <LinkContainer to="/newpoll">
                <NavItem eventKey={2}>New Poll</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={3}>{`Hello ${user.name}`}</NavItem>
              <NavDropdown eventKey={4} title="..." id="basic-nav-dropdown">
                <LinkContainer to="/userpolls">
                  <MenuItem eventKey={4.1}>My Polls</MenuItem>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <MenuItem eventKey={4.2}>Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <MenuItem eventKey={4.3}>Log out</MenuItem>
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

export default NavBar;
