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
      <Navbar collapseOnSelect expand="lg" sticky="top" className="navbar-dark bg-primary">
        <Navbar.Brand href="/">PrimeDome</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Link to={'/profile'}>
              <Button 
                className="profile-button" 
                variant="primary"
              >
                Profile
              </Button>
            </Link>
          </Nav>
          <Nav>
            <Link to={'/'}>
              <Button 
                className="logout-button" 
                variant="outline-danger" 
                onClick={this.loggedOut}
              >
                Log Out
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}