import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Form, Button, Container}  from 'react-bootstrap';

import './login-view.scss';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ login, setLogin ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios.post('https://primedome.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  const loginUser = () => {
    setLogin(!login);
  }

  return (
    <Container>
      <div className="welcome-area">
        <h2>Welcome to PrimeDome</h2>
        <Button className="login-toggle" variant="primary" onClick={loginUser}>
          Login
        </Button>
        <Link to={'/register'}>
          <Button className="register-link" variant="secondary">
            Register
          </Button>
        </Link>
      </div>
      {login && 
      <Form className="login-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="login-button" variant="primary" type="submit" onClick={handleSubmit}>
          Login
        </Button>
      </Form>}
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};