import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import './genre-view.scss';


export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <br />
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
        <br />
        <div className="genre-movies">
          <span className="label">Movies: </span>
          {movies.map((m) => (
            <div className="movie" key={m._id}>{m.Title}</div>
          ))}
        </div>
        <Link to={'/'}>
          <Button variant="danger">Back</Button>
        </Link>
      </div>
    );
  }
}