import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Button, Modal } from 'react-bootstrap';

import './profile-view.scss';


export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState(new Date());

  const [show, setShow] = useState(false);

  if (username === '') {
    axios.get(`https://primedome.herokuapp.com/users/${props.user}`, {
      headers: { Authorization: `Bearer ${props.userToken}` }
    })
    .then((response) => {
      let userData = response.data;
      setUsername(userData.Username);
      setEmail(userData.Email);
      setBirthday(new Date(userData.Birthday));
      console.log(userData);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if (!username) return null;

  function deregister() {
    axios.delete(`https://primedome.herokuapp.com/users/${props.user}`, {
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
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="profile-view">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Accept Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deregister}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="username">
        <span className="label">Username: </span>
        <span className="value">{username}</span>
      </div>
      <div className="email">
        <span className="label">Email: </span>
        <span className="value">{email}</span>
      </div>
      <div className="birthday">
        <span className="label">Birthday: </span>
        <span className="value">
          {birthday.getDate() + '/' +
            birthday.getMonth() + '/' +
            birthday.getFullYear()}
          </span>
      </div>
      <Button className="deregister-button" variant="outline-danger" onClick={handleShow}>
        Delete account
      </Button>
    </div>
  );
}