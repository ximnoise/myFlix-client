import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import './director-view.scss';


export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <br />
        <div className="director-bio">
          <span className="label">Description: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <br />
        <div className="director-birth">
          <span className="label">Birth: </span>
          <span className="value">{director.Birth}</span>
        </div>
        <br />
        <div className="director-death">
          <span className="label">Death: </span>
          <span className="value">{director.Death}</span>
        </div>
        <br />
        <div className="director-movies">
          <span className="label">Movies: </span>
          {movies.map((m) => (
            <div className="movie" key={m._id}>{m.Title}</div>
          ))}
        </div>
        <Link to={'/'}>
          <Button variant="outline-danger">Back</Button>
        </Link>
      </div>
    );
  }
}