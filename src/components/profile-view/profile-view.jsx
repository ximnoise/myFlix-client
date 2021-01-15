import React, { useState } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import { ProfileEditView } from '../profile-edit-view/profile-edit-view';

import { Button, Modal, Col, Row } from 'react-bootstrap';

import { setUser, setFavoriteMovies } from '../../actions/actions';

import './profile-view.scss';


export function ProfileView(props) {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState(new Date());
  const [ edit, setEdit ] = useState(false);
  const [ show, setShow ] = useState(false);

  if (username === '') {
    axios.get(`https://primedome.herokuapp.com/users/${props.user}`, {
      headers: { Authorization: `Bearer ${props.userToken}` }
    })
    .then((response) => {
      let userData = response.data;
      setUsername(userData.Username);
      setUser(userData.Username);
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

  let favorites = props.movies.filter((m) => props.favoriteMovies && props.favoriteMovies.includes(m._id));

  const updateFavorites = (movies) => {
    setFavoriteMovies(
      props.favoriteMovies.filter((favMovies) => {
        return favMovies !== movies;
      })
    );
  };

  const editUser = () => {
    setEdit(!edit);
  }

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
        <span className="value">{birthday.toDateString()}</span>
      </div>
      <Button 
        className="edit-button" 
        variant="primary" 
        onClick={editUser}
      >
        Edit
      </Button>
      <Button 
        className="deregister-button" 
        variant="danger" 
        onClick={handleShow}
      >
        Delete account
      </Button>
      {edit && <ProfileEditView user={props.user} userToken={props.userToken} />}
      <div className="favorite-movies-container">
        <span className="label">Favorite Movies:</span>
        <Row className="justify-content-md-center">
          {favorites.map((m) => (
            <Col xs="auto" key={m._id}>
              <MovieCard
                user={props.user}
                userToken={props.userToken}
                key={m._id}
                movies={m}
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

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
    userToken: state.userToken,
    favoriteMovies: state.favoriteMovies
  }
}

export default connect(mapStateToProps, { setUser, setFavoriteMovies })(ProfileView);