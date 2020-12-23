import React from 'react';

import { Button } from 'react-bootstrap';

import './movie-view.scss';


export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, goBack } = this.props;

    if (!movie) return null;

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
          <Button variant="link">{movie.Genre.Name}</Button>
        </div>
        <div className="movie-director">
          <span className="label">Director:</span>
          <Button variant="link">{movie.Director.Name}</Button>
        </div>
        <Button onClick={() => goBack()} variant="outline-danger">
          Back
        </Button>
        <Button variant="primary" type="submit">
          Add to Favorites!
        </Button>
      </div>
    );
  }
}