import React from 'react';

import { Link } from 'react-router-dom';

import { Navbar, Nav, Button } from 'react-bootstrap';

import './nav-view.scss';


export class NavView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  loggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    const { user } = this.props;

    if (!user) return null;

    return( 
      <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
        <Navbar.Brand href="/">PrimeDome</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Features</Nav.Link>
          </Nav>
          <Nav>
            <Link to={'/profile'}>
              <Button variant="primary">Profile</Button>
            </Link>
          </Nav>
          <Nav>
            <Button 
              className="logout-button" 
              variant="outline-danger" 
              onClick={this.loggedOut}
            >
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}