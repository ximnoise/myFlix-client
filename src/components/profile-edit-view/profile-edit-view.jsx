import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Container } from 'react-bootstrap';

import './profile-edit-view.scss';


export function ProfileEditView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://primedome.herokuapp.com/users/${props.user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    },
    {
      headers: { Authorization: `Bearer ${props.userToken}` }
    })
    .then((response) => {
      console.log(response);
      localStorage.clear();
      window.open('/', '_self');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <Container>
      <h3>Please enter your new profile information's:</h3>
      <Form className="profile-edit-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>New Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>New Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            placeholder="MM/DD/YYYY"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit"
          className="apply-button" 
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </Form>
    </Container>
  );
}