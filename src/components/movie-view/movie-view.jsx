import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super()
  }

  addFavoriteMovies(movie) {
    const username = localStorage.getItem('user');
    const accessToken  = localStorage.getItem('token');
    if (confirm('Add to list of Favorites?')) {
      return (
        axios({
          method: 'post',
          url: `https://primedome.herokuapp.com/users/${username}/Movies/${movie._id}`,
          headers: { Authorization: `Bearer ${accessToken}` },
          data: {},
        })
        .then((response) => {
          console.log(response);
          alert('You have added this movie to our list of Favorites.');
        })
        .catch((error) => {
          console.log(error);
        })
      );
    }
  }

  render() {
    const { movie } = this.props;

    if(!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <br />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <br />
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <br />
        <div className="movie-genre">
          <span className="label">Genre:</span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director:</span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </div>
        <Link to={'/'}>
          <Button variant="danger">Back</Button>
        </Link>
        <Button 
          variant="secondary" 
          type="submit" 
          onClick={() => this.addFavoriteMovies(movie)}
        >
          Add Favorite
        </Button>
      </div>
    );
  }
}