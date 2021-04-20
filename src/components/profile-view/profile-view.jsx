import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

import { Button, Col, Row } from 'react-bootstrap';

import { setUser, setUserToken, setFavoriteMovies } from '../../actions/actions';

import './profile-view.scss';


export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      birthday: null,
      email: null
    };
  }

  componentDidMount() {
    const accessToken  = localStorage.getItem('token');
    this.getUserData(accessToken);
  }

  getUserData(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://primedome.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      let userData = response.data;
      this.setState({
        birthday: userData.Birthday,
        email: userData.Email
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deregisterUser() {
    const username = localStorage.getItem('user');
    const accessToken  = localStorage.getItem('token');
    if (confirm('Please confirm that you want to delete your profile.')) {
      return (
        axios.delete(`https://primedome.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          console.log(response);
          alert('You have been deleted from the registry.');
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch((error) => {
          console.log(error);
        })
      );
    }
  }

  deleteFavoriteMovies(movie) {
    const username = localStorage.getItem('user');
    const accessToken  = localStorage.getItem('token');
    axios.delete(`https://primedome.herokuapp.com/users/${username}/Movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => {
      console.log(response);
      alert('The movie has been removed from your Favorites.');
      this.componentDidMount();
      window.open('/profile', '_self');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { user, movies, favoriteMovies } = this.props;
    const FaveMovies = movies.filter(movie => favoriteMovies.includes(movie._id));

    return(
      <div className="profile-view">
        <div className="username">
          <span className="label">Username: </span>
          <span className="value">{this.props.user}</span>
        </div>
        <div className="email">
          <span className="label">Email: </span>
          <span className="value">{this.state.email}</span>
        </div>
        <div className="birthday">
          <span className="label">Birthday: </span>
          <span className="value">{this.state.birthday}</span>
        </div>
        <Link to={`/users/${user}`}>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button 
          className="deregister-button" 
          variant="danger" 
          onClick={() => this.deregisterUser()}
        >
          Delete profile
        </Button>
        <div className="favorite-movies-container">
          <span className="label">Favorite Movies:</span>
          <Row className="justify-content-md-center fav-movies">
            {FaveMovies.map((m) => (
              <Col xs="auto" key={m._id}>
                <MovieCard movies={m} />
                <Button variant="danger" onClick={() => this.deleteFavoriteMovies(m)}>Remove favorite</Button>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return { 
    user: state.user,
    userToken: state.userToken,
    favoriteMovies: state.favoriteMovies
   }
}

export default connect(mapStateToProps, { setUser, setUserToken, setFavoriteMovies })(ProfileView);