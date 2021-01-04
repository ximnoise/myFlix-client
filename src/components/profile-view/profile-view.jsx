import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

import { Button, Modal, Col, Row } from 'react-bootstrap';

import './profile-view.scss';


export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [favoriteMovies, setFavoriteMovies] = useState([]);

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
      setFavoriteMovies(userData.FavoriteMovies);
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

  let favorites = props.movies.filter((m) => favoriteMovies.includes(m._id));

  const updateFavorites = (movies) => {
    setFavoriteMovies(
      favoriteMovies.filter((favMovies) => {
        return favMovies !== movies;
      })
    );
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
      <div className="favorite-movies-container">
        <span className="label">Favorite Movies:</span>
        <Row className="favorite-movies">
          {favorites.map((m) => (
            <Col xs="auto" key={m._id}>
              <MovieCard
                user={props.user}
                userToken={props.userToken}
                key={m._id}
                movie={m}
                removeFavorite={true}
                updateFavorites={updateFavorites}
              />
             </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}