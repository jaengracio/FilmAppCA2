import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class MyNavbar extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: localStorage.getItem('jwtToken') !== null
    };
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    this.props.onLogout();
  }

  render() {
    const loggedIn = this.props.loggedIn;

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={ Link } to="/"><img src='/mylogo.png' alt='logo' height='70' width='120' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={ Link } to="/films">Films</Nav.Link>
            <Nav.Link as={ Link } to="/characters">Characters</Nav.Link>
            <Nav.Link as={ Link } to="/groups">Groups</Nav.Link>
          </Nav>
          <Nav>
          { (loggedIn) ? (
            <Nav.Link onClick={ this.logout }>Logout</Nav.Link>
          ) : (
            <>
            <Nav.Link as={ Link } to='/register'>Register</Nav.Link>
            <Nav.Link as={ Link } to='/login'>Login</Nav.Link>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
